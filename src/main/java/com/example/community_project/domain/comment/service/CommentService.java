package com.example.community_project.domain.comment.service;

import com.example.community_project.domain.auth.entity.User;
import com.example.community_project.domain.auth.repository.UserRepository;
import com.example.community_project.domain.comment.dto.request.CommentCreateRequestDto;
import com.example.community_project.domain.comment.dto.response.CommentResponseDto;
import com.example.community_project.domain.comment.entity.Comment;
import com.example.community_project.domain.comment.repository.CommentRepository;
import com.example.community_project.domain.post.entity.Post;
import com.example.community_project.domain.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    /* 댓글 생성 */
    @Transactional
    public Long createComment(Long postId, Long userId, CommentCreateRequestDto dto) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "게시글 없음"));
        User author = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "사용자 없음"));

        Comment comment = Comment.builder()
                .post(post)
                .author(author)
                .content(dto.getContent())
                .build();

        commentRepository.save(comment);
        return comment.getCommentId();
    }

    /* 게시글의 댓글 목록 */
    public List<CommentResponseDto> getCommentsByPost(Long postId, Long currentUserIdOrNull) {
        if (!postRepository.existsById(postId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "게시글 없음");
        }

        return commentRepository.findByPost_PostIdOrderByCreatedAtAsc(postId).stream()
                .map(c -> {
                    var author = c.getAuthor();
                    boolean mine = currentUserIdOrNull != null && author.getUserId().equals(currentUserIdOrNull);
                    return CommentResponseDto.builder()
                            .commentId(c.getCommentId())
                            .authorId(author.getUserId())
                            .authorName(author.getName() != null ? author.getName() : author.getUsername())
                            .content(c.getContent())
                            .createdAt(c.getCreatedAt())
                            .canDelete(mine)
                            .build();
                })
                .toList();
    }

    /* 댓글 삭제(작성자만) */
    @Transactional
    public void deleteComment(Long commentId, Long requesterId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "댓글 없음"));

        if (!comment.getAuthor().getUserId().equals(requesterId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "작성자만 삭제 가능");
        }

        commentRepository.delete(comment);
    }
}
