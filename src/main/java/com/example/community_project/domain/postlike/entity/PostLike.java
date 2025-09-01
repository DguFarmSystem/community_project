package com.example.community_project.domain.postlike.entity;

import com.example.community_project.domain.auth.entity.User;
import com.example.community_project.domain.post.entity.Post;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name="post_likes", uniqueConstraints = {
        @UniqueConstraint(
                name = "uk_post_likes",
                columnNames = {"user_id", "post_id"}
        )
})
public class PostLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id", nullable = false)
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="post_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public PostLike(User user, Post post) {
        this.user = user;
        this.post = post;
        this.createdAt = LocalDateTime.now();
    }

    public void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
