package com.example.community_project.domain.postlike.controller;

import com.example.community_project.domain.postlike.dto.response.PostLikeResponseDto;
import com.example.community_project.domain.postlike.service.PostLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostLikeController {

    private final PostLikeService postLikeService;

    //
    @GetMapping("/{postId}/like")
    public ResponseEntity<PostLikeResponseDto> checkLikeStatus(
            @PathVariable Long postId,
            @AuthenticationPrincipal(expression = "userId") Long userId
    ) {
        // "좋아요" 여부와 게시글으 "좋아요" 개수를 data 객체로 받아옴.
        PostLikeResponseDto.Data data = postLikeService.checkLikeStatus(postId, userId);

        // Data 객체를 포함한 DTO를 생성
        PostLikeResponseDto responseDto = PostLikeResponseDto.builder()
                .status(HttpStatus.OK.value())
                .success(true)
                .message("성공")
                .data(data)
                .build();

        // DTO 리턴
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/{postId}/like")
    public ResponseEntity<PostLikeResponseDto> toggleLike(
            @PathVariable long postId,
            @AuthenticationPrincipal(expression = "userId") Long userId
    ){
        // 토글 후 결과를 data 객체로 가져오기
        PostLikeResponseDto.Data data = postLikeService.toggleLike(postId, userId);

        // Data 객체를 포함한 DTO를 생성
        PostLikeResponseDto responseDto = PostLikeResponseDto.builder()
                .status(HttpStatus.OK.value())
                .success(true)
                .message("성공")
                .data(data)
                .build();

        // DTO 리턴
        return ResponseEntity.ok(responseDto);
    }
}
