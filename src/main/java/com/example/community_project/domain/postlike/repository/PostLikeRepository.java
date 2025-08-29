package com.example.community_project.domain.postlike.repository;

import com.example.community_project.domain.auth.entity.User;
import com.example.community_project.domain.post.entity.Post;
import com.example.community_project.domain.postlike.entity.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
    long countByPost(Post post);
    boolean existsByPostAndUser(Post post, User user);
    List<PostLike> findByPostAndUser(Post post, User user);
}
