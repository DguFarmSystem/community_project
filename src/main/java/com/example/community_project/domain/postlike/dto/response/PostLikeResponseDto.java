package com.example.community_project.domain.postlike.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Getter
@NoArgsConstructor
public class PostLikeResponseDto {

    @Getter
    @NoArgsConstructor
    public static class Data {
        private boolean liked;
        private long likeCount;

        @Builder
        public Data(boolean liked, long likeCount) {
            this.liked = liked;
            this.likeCount = likeCount;
        }
    }

    private int status;
    private boolean success;
    private String message;
    private Data data;

    @Builder
    public PostLikeResponseDto(int status, boolean success, String message, Data data) {
        this.status = status;
        this.success = success;
        this.message = message;
        this.data = data;
    }
}
