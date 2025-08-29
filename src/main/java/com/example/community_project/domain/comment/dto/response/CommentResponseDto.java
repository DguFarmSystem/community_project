package com.example.community_project.domain.comment.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponseDto {

    private Long commentId;

    private Long authorId;
    private String authorName;

    private String content;
    private LocalDateTime createdAt;

    private boolean canDelete; // 현재 사용자 == 작성자 여부
}
