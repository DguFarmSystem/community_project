package com.example.community_project.domain.mypage.controller;

import com.example.community_project.domain.mypage.dto.request.MypageDataChangeRequestDto;
import com.example.community_project.domain.mypage.dto.request.PasswordChangeRequestDto;
import com.example.community_project.domain.mypage.dto.response.MypageResponseDto;
import com.example.community_project.domain.mypage.service.MypageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/me")
@RequiredArgsConstructor
public class MypageController {

    private final MypageService mypageService;

    // GET /api/me
    // 마이페이지 조회
    @GetMapping
    public ResponseEntity<MypageResponseDto> getMypageData(
            @AuthenticationPrincipal long userId
    ) {
        MypageResponseDto mypageResponseDto = MypageResponseDto.builder()
                .status(HttpStatus.OK.value())
                .success(true)
                .message("마이페이지 조회 성공")
                .mypageData(mypageService.getMypageData(userId))
                .build();

        return ResponseEntity.ok(mypageResponseDto);
    }

    @PatchMapping
    public ResponseEntity<MypageResponseDto> updateMypageData(
            @RequestBody MypageDataChangeRequestDto mypageDataChangeRequestDto,
            @AuthenticationPrincipal long userId
    ) {
        MypageResponseDto.MypageData mypageData = mypageService.changeMypageData(userId, mypageDataChangeRequestDto);

        MypageResponseDto mypageResponseDto = MypageResponseDto.builder()
                .status(HttpStatus.OK.value())
                .success(true)
                .message("정보 변경 성공")
                .mypageData(mypageData)
                .build();

        return ResponseEntity.ok(mypageResponseDto);
    }

    @PatchMapping("/password")
    public ResponseEntity<MypageResponseDto> changePassword(
            @RequestBody PasswordChangeRequestDto passwordChangeRequestDto,
            @AuthenticationPrincipal long userId
    ) {
        boolean result = mypageService.changePassword(userId, passwordChangeRequestDto);

        if (result) {
            MypageResponseDto mypageResponseDto = MypageResponseDto.builder()
                    .status(HttpStatus.OK.value())
                    .success(true)
                    .message("비밀번호 변경 성공")
                    .build();

            return ResponseEntity.ok(mypageResponseDto);
        } else {
            MypageResponseDto mypageResponseDto = MypageResponseDto.builder()
                    .status(HttpStatus.BAD_REQUEST.value())
                    .success(false)
                    .message("비밀번호 변경에 실패했습니다.")
                    .build();

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mypageResponseDto);
        }
    }

}
