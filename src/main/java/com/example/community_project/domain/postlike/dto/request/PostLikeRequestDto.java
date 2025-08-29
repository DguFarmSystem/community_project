package com.example.community_project.domain.postlike.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Getter
@NoArgsConstructor
public class PostLikeRequestDto {

    @NotBlank(message = "게시글 ID 값이 비어있습니다.")
    private Long postId;


}
