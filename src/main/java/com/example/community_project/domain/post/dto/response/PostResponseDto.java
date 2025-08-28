package com.example.community_project.domain.post.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostResponseDto {

    private Long postId;

    private Long authorId;
    private String authorName;   // author.name 없으면 username을 서비스에서 대체

    private String title;
    private String content;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private boolean canEdit;     // 현재 사용자 == 작성자
    private boolean canDelete;   // 현재 사용자 == 작성자
}
