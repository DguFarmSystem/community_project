package com.example.community_project.domain.comment.controller;

import com.example.community_project.domain.auth.entity.User;
import com.example.community_project.domain.auth.repository.UserRepository;
import com.example.community_project.domain.comment.dto.request.CommentCreateRequestDto;
import com.example.community_project.domain.comment.dto.response.CommentResponseDto;
import com.example.community_project.domain.comment.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;
    private final UserRepository userRepository;

    /* username -> userId (필수/선택) */
    private Long requireUserId(String username) {
        if (username == null) throw new UnauthorizedException();
        return userRepository.findByUsernameAndDeletedFalse(username)
                .map(User::getUserId)
                .orElseThrow(UnauthorizedException::new);
    }
    private Long optionalUserId(String username) {
        if (username == null) return null;
        return userRepository.findByUsernameAndDeletedFalse(username)
                .map(User::getUserId).orElse(null);
    }

    /* 1) 댓글 생성 (로그인 필요) */
    @PostMapping("/posts/{postId}/comments")
    public ResponseEntity<Long> createComment(
            @PathVariable Long postId,
            @AuthenticationPrincipal(expression = "username") String username,
            @Valid @RequestBody CommentCreateRequestDto dto
    ) {
        Long userId = requireUserId(username);
        Long commentId = commentService.createComment(postId, userId, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(commentId);
    }

    /* 2) 댓글 목록 (비로그인 가능) */
    @GetMapping("/posts/{postId}/comments")
    public ResponseEntity<List<CommentResponseDto>> getComments(
            @PathVariable Long postId,
            @AuthenticationPrincipal(expression = "username") String username
    ) {
        Long currentUserId = optionalUserId(username);
        return ResponseEntity.ok(commentService.getCommentsByPost(postId, currentUserId));
    }

    /* 3) 댓글 삭제 (작성자만) */
    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable Long commentId,
            @AuthenticationPrincipal(expression = "username") String username
    ) {
        Long userId = requireUserId(username);
        commentService.deleteComment(commentId, userId);
        return ResponseEntity.noContent().build();
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    static class UnauthorizedException extends RuntimeException {}
}
