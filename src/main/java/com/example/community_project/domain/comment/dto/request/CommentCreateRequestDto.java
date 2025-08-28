package com.example.community_project.domain.comment.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
public class CommentCreateRequestDto {

    @NotBlank(message = "댓글 내용은 필수입니다.")
    private String content;
}
