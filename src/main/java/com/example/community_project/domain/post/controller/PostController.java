package com.example.community_project.domain.post.controller;

import com.example.community_project.domain.auth.entity.User;
import com.example.community_project.domain.auth.repository.UserRepository;
import com.example.community_project.domain.post.dto.request.PostCreateRequestDto;
import com.example.community_project.domain.post.dto.response.PostResponseDto;
import com.example.community_project.domain.post.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final UserRepository userRepository;

    /* === username → userId (필수) === */
    private Long requireUserId(String username) {
        if (username == null) throw new UnauthorizedException();
        return userRepository.findByUsernameAndDeletedFalse(username)
                .map(User::getUserId)
                .orElseThrow(UnauthorizedException::new);
    }

    /* === username → userId (선택, 비로그인 허용) === */
    private Long optionalUserId(String username) {
        if (username == null) return null;
        return userRepository.findByUsernameAndDeletedFalse(username)
                .map(User::getUserId)
                .orElse(null);
    }

    /* 1) 게시글 생성 (로그인 필요) */
    @PostMapping
    public ResponseEntity<Long> createPost(
            @AuthenticationPrincipal(expression = "username") String username,
            @Valid @RequestBody PostCreateRequestDto dto
    ) {
        Long userId = requireUserId(username);
        Long postId = postService.createPost(userId, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(postId);
    }

    /* 2) 게시글 목록 (비로그인도 가능, 작성일 내림차순) */
    @GetMapping
    public ResponseEntity<List<PostResponseDto>> getAllPosts(
            @AuthenticationPrincipal(expression = "username") String username
    ) {
        Long currentUserId = optionalUserId(username);
        return ResponseEntity.ok(postService.getAllPosts(currentUserId));
    }

    /* 3) 게시글 단건 (비로그인도 가능) */
    @GetMapping("/{postId}")
    public ResponseEntity<PostResponseDto> getPost(
            @PathVariable Long postId,
            @AuthenticationPrincipal(expression = "username") String username
    ) {
        Long currentUserId = optionalUserId(username);
        return ResponseEntity.ok(postService.getPost(postId, currentUserId));
    }

    /* 4) 게시글 수정 (PUT, 로그인 필요, 작성자만) */
    @PutMapping("/{postId}")
    public ResponseEntity<Long> updatePost(
            @PathVariable Long postId,
            @AuthenticationPrincipal(expression = "username") String username,
            @Valid @RequestBody PostCreateRequestDto dto
    ) {
        Long userId = requireUserId(username);
        Long updatedId = postService.updatePost(postId, dto, userId);
        return ResponseEntity.ok(updatedId);
    }

    /* 5) 게시글 삭제 (로그인 필요, 작성자만) */
    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> deletePost(
            @PathVariable Long postId,
            @AuthenticationPrincipal(expression = "username") String username
    ) {
        Long userId = requireUserId(username);
        postService.deletePost(postId, userId);
        return ResponseEntity.noContent().build();
    }

    /* 401 전용 예외 */
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    static class UnauthorizedException extends RuntimeException {}
}