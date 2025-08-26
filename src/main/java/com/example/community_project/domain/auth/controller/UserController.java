package com.example.community_project.domain.auth.controller;

import com.example.community_project.domain.auth.dto.request.SignInRequestDTO;
import com.example.community_project.domain.auth.dto.request.SignUpRequestDTO;
import com.example.community_project.domain.auth.dto.response.SignInResponseDTO;
import com.example.community_project.domain.auth.service.UserService;
import com.example.community_project.global.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
