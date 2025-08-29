package com.example.community_project.global.common;

public record CommonResponse<T>(
        int status,
        String message,
        T data
) {
    public static <T> CommonResponse<T> success(T data) {
        return new CommonResponse<>(200, "success", data);
    }

    public static <T> CommonResponse<T> success(String message, T data) {
        return new CommonResponse<>(200, message, data);
    }

    public static <T> CommonResponse<T> fail(int status, String message) {
        return new CommonResponse<>(status, message, null);
    }
}