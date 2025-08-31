package com.example.community_project.domain.post.repository;

import com.example.community_project.domain.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

    /* 목록: 작성일 내림차순 */
    List<Post> findAllByOrderByCreatedAtDesc();
    Page<Post> findAllByOrderByCreatedAtDesc(Pageable pageable);

    /* 권한 체크/조회에 유용 */
    boolean existsByPostIdAndAuthor_UserId(Long postId, Long userId);
    Optional<Post> findByPostIdAndAuthor_UserId(Long postId, Long userId);
}
