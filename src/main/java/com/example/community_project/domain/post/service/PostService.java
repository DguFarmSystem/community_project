package com.example.community_project.domain.post.service;

import com.example.community_project.domain.auth.entity.User;
import com.example.community_project.domain.auth.repository.UserRepository;
import com.example.community_project.domain.post.dto.request.PostCreateRequestDto;
import com.example.community_project.domain.post.dto.response.PostResponseDto;
import com.example.community_project.domain.post.entity.Post;
import com.example.community_project.domain.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    /* ===== CREATE ===== */
    @Transactional
    public Long createPost(Long userId, PostCreateRequestDto dto) {
        User author = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "사용자 없음"));

        Post post = Post.builder()
                .author(author)
                .title(dto.getTitle())
                .content(dto.getContent())
                .build();

        postRepository.save(post);
        return post.getPostId();
    }

    /* ===== READ: LIST (작성일 내림차순) ===== */
    public List<PostResponseDto> getAllPosts(Long currentUserIdOrNull) {
        // 레포에 전용 메서드가 있으면: postRepository.findAllByOrderByCreatedAtDesc()
        List<Post> posts = postRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
        return posts.stream()
                .map(p -> toDto(p, currentUserIdOrNull))
                .toList();
    }

    /* ===== READ: DETAIL ===== */
    public PostResponseDto getPost(Long postId, Long currentUserIdOrNull) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "게시글 없음"));
        return toDto(post, currentUserIdOrNull);
    }

    /* ===== UPDATE (작성자만) ===== */
    @Transactional
    public Long updatePost(Long postId, PostCreateRequestDto dto, Long requesterId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "게시글 없음"));

        if (!post.getAuthor().getUserId().equals(requesterId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "작성자만 수정 가능");
        }

        post.setTitle(dto.getTitle());
        post.setContent(dto.getContent());
        // @PreUpdate 로 updatedAt 자동 반영
        return post.getPostId();
    }

    /* ===== DELETE (작성자만) ===== */
    @Transactional
    public void deletePost(Long postId, Long requesterId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "게시글 없음"));

        if (!post.getAuthor().getUserId().equals(requesterId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "작성자만 삭제 가능");
        }

        postRepository.delete(post);
    }

    /* ===== Mapper: Entity -> Response DTO ===== */
    private PostResponseDto toDto(Post post, Long currentUserIdOrNull) {
        User author = post.getAuthor();
        boolean mine = (currentUserIdOrNull != null && author.getUserId().equals(currentUserIdOrNull));

        return PostResponseDto.builder()
                .postId(post.getPostId())
                .authorId(author.getUserId())
                .authorName(author.getName() != null ? author.getName() : author.getUsername())
                .title(post.getTitle())
                .content(post.getContent())
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .canEdit(mine)
                .canDelete(mine)
                .build();
    }
}
