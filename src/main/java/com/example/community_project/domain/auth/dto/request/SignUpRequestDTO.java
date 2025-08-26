package com.example.community_project.domain.auth.dto.request;

public record SignUpRequestDTO(
        String name,
        String username,
        String password,
        String passwordConfirm
) {
}
