package com.example.community_project.domain.auth.dto.request;

public record SignInRequestDTO(
        String username,
        String password
) {
}
