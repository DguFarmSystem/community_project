package com.example.community_project.domain.auth.service;

import com.example.community_project.domain.auth.dto.request.ReissueRequestDTO;
import com.example.community_project.domain.auth.dto.request.SignInRequestDTO;
import com.example.community_project.domain.auth.dto.request.SignUpRequestDTO;
import com.example.community_project.domain.auth.dto.response.SignInResponseDTO;
import com.example.community_project.domain.auth.dto.response.TestDTO;

import com.example.community_project.domain.auth.entity.User;
import com.example.community_project.domain.auth.repository.UserRepository;
import com.example.community_project.global.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.concurrent.TimeUnit;


@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    private final StringRedisTemplate redisTemplate;

    @Value("${jwt.refresh-token-expire-time}")
    private long refreshTokenExpireTime;


    @Transactional
    public void signUp(SignUpRequestDTO requestDTO) {
        if (!requestDTO.password().equals(requestDTO.passwordConfirm())) {
            throw new IllegalArgumentException("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        }
        if (userRepository.findByUsernameAndDeletedFalse(requestDTO.username()).isPresent()) {
            throw new IllegalArgumentException("이미 사용 중인 아이디입니다.");
        }

        String encodedPassword = passwordEncoder.encode(requestDTO.password());
        User user = User.createUser(requestDTO.name(), requestDTO.username(), encodedPassword);
        userRepository.save(user);
    }

    public SignInResponseDTO signIn(SignInRequestDTO requestDTO) {
        User user = userRepository.findByUsernameAndDeletedFalse(requestDTO.username())
                .orElseThrow(() -> new IllegalArgumentException("아이디 또는 비밀번호가 올바르지 않습니다."));

        if (!passwordEncoder.matches(requestDTO.password(), user.getPassword())) {
            throw new IllegalArgumentException("아이디 또는 비밀번호가 올바르지 않습니다.");
        }

        String access = jwtProvider.generateAccessToken(user.getUserId());
        String refresh = jwtProvider.generateRefreshToken(user.getUserId());


        //Redis에 저장
        String redisKey = "refresh:" + user.getUserId();
        redisTemplate.opsForValue().set(
                redisKey,
                refresh,
                refreshTokenExpireTime,
                TimeUnit.MILLISECONDS
        );

        return new SignInResponseDTO(access, refresh);
    }

    public SignInResponseDTO reissue(ReissueRequestDTO requestDTO) {
        String refreshToken = requestDTO.refreshToken();

        //토큰 유효성 검증
        if (!jwtProvider.validateToken(refreshToken)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "리프레시 토큰이 유효하지 않습니다.");
        }

        Long userId = jwtProvider.getUserIdFromToken(refreshToken);

        //Redis에서 리프레쉬 토큰 조회
        String redisKey = "refresh:" + userId;
        String storedToken = redisTemplate.opsForValue().get(redisKey);

        if (storedToken == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "리프레시 토큰이 만료되었습니다. 다시 로그인 해주세요.");
        }

        if (!storedToken.equals(refreshToken)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "리프레시 토큰이 일치하지 않습니다.");
        }

        // 새로운 액세스 토큰 발급
        String newAccessToken = jwtProvider.generateAccessToken(userId);

        return new SignInResponseDTO(newAccessToken, refreshToken);
    }

    public void logout(Long userId) {
        String redisKey = "refresh:" + userId;
        redisTemplate.delete(redisKey);
    }

    @Transactional
    public void softDeleteUser(Long userId) {
        User user = userRepository.findByUserIdAndDeletedFalse(userId)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "사용자를 찾을 수 없습니다.")
                );

        user.delete(); //soft delete
    }

}
