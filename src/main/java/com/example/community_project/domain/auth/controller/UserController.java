package com.example.community_project.domain.auth.controller;

import com.example.community_project.domain.auth.dto.request.ReissueRequestDTO;
import com.example.community_project.domain.auth.dto.request.SignInRequestDTO;
import com.example.community_project.domain.auth.dto.request.SignUpRequestDTO;
import com.example.community_project.domain.auth.dto.response.SignInResponseDTO;
import com.example.community_project.domain.auth.dto.response.TestDTO;
import com.example.community_project.domain.auth.service.UserService;
import com.example.community_project.global.CustomUserDetails;
import com.example.community_project.global.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<CommonResponse<?>> signUp(@RequestBody SignUpRequestDTO requestDTO) {
        userService.signUp(requestDTO);
        return ResponseEntity.ok(CommonResponse.success("회원가입이 완료되었습니다.", null));

    }

    @PostMapping("/signin")
    public ResponseEntity<CommonResponse<?>> signIn(@RequestBody SignInRequestDTO requestDTO) {
        SignInResponseDTO response = userService.signIn(requestDTO);
        return ResponseEntity.ok(CommonResponse.success(response));
    }

    @PostMapping("/reissue")
    public ResponseEntity<CommonResponse<?>> reissue(@RequestBody ReissueRequestDTO requestDTO) {
        SignInResponseDTO response = userService.reissue(requestDTO);
        return ResponseEntity.ok(CommonResponse.success(response));
    }


    @PostMapping("/logout")
    public ResponseEntity<CommonResponse<?>> logout(@AuthenticationPrincipal CustomUserDetails userDetails) {
        userService.logout(userDetails.getUserId());
        return ResponseEntity.ok(CommonResponse.success("로그아웃 되었습니다.", null));
    }

    @DeleteMapping
    public ResponseEntity<CommonResponse<Void>> softDeleteUser(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = userDetails.getUserId();
        userService.softDeleteUser(userId);

        return ResponseEntity.ok(
                CommonResponse.success("회원 탈퇴가 완료되었습니다.", null)
        );
    }



}
