package com.example.community_project.domain.auth.dto.response;

public record SignInResponseDTO(
        String accessToken,
        String refreshToken
) {
}
