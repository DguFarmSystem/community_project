package com.example.community_project.domain.auth.service;

import com.example.community_project.domain.auth.dto.request.SignInRequestDTO;
import com.example.community_project.domain.auth.dto.request.SignUpRequestDTO;
import com.example.community_project.domain.auth.dto.response.SignInResponseDTO;
import com.example.community_project.domain.auth.entity.User;
import com.example.community_project.domain.auth.repository.UserRepository;
import com.example.community_project.global.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

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

        return new SignInResponseDTO(access, refresh);
    }
}
