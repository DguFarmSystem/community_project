package com.example.community_project.domain.mypage.service;

import com.example.community_project.domain.auth.entity.User;
import com.example.community_project.domain.auth.repository.UserRepository;
import com.example.community_project.domain.mypage.dto.request.MypageDataChangeRequestDto;
import com.example.community_project.domain.mypage.dto.request.PasswordChangeRequestDto;
import com.example.community_project.domain.mypage.dto.response.MypageResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MypageService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public MypageResponseDto.MypageData getMypageData(Long userId) {
        // 유저 객체 찾기
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("회원이 존재하지 않습니다."));

        // 유저 객체의 내용을 기반으로 data 객체 빌드
        MypageResponseDto.MypageData data = MypageResponseDto.MypageData.builder()
                .loginId(user.getUsername())
                .name(user.getName())
                .build();

        return data;
    }

    public MypageResponseDto.MypageData changeMypageData(Long userId, MypageDataChangeRequestDto mypageDataChangeRequestDto) {
        // 유저 객체 찾기
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("회원이 존재하지 않습니다."));

        // 유저 객체의 정보 변경
        user.changeData(mypageDataChangeRequestDto.getName());

        // 바꾼 정보 기반으로 data 객체 빌드
        MypageResponseDto.MypageData data = MypageResponseDto.MypageData.builder()
                .loginId(user.getUsername())
                .name(user.getName())
                .build();

        return data;
    }

    public boolean changePassword(Long userId, PasswordChangeRequestDto passwordChangeRequestDto) {
        // 유저 객체 찾기
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("회원이 존재하지 않습니다."));

        // 기존 비밀번호 일치 확인
        if (!passwordEncoder.matches(passwordChangeRequestDto.getCurrentPassword(), user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        // 비밀번호 변경
        try {
            user.changePassword(passwordEncoder.encode(passwordChangeRequestDto.getCurrentPassword()));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
