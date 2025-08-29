package com.example.community_project.domain.comment.repository;

import com.example.community_project.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByPost_PostIdOrderByCreatedAtAsc(Long postId);
}
