package com.example.community_project.domain.postlike.service;

import com.example.community_project.domain.auth.entity.User;
import com.example.community_project.domain.auth.repository.UserRepository;
import com.example.community_project.domain.post.entity.Post;
import com.example.community_project.domain.post.repository.PostRepository;
import com.example.community_project.domain.postlike.dto.response.PostLikeResponseDto;
import com.example.community_project.domain.postlike.entity.PostLike;
import com.example.community_project.domain.postlike.repository.PostLikeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostLikeService {
    private final PostLikeRepository postLikeRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public PostLikeService(PostLikeRepository postLikeRepository, PostRepository postRepository, UserRepository userRepository) {
        this.postLikeRepository = postLikeRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public PostLikeResponseDto.Data toggleLike(Long postId, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("사용자가 존재하지 않습니다."));
        Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));

        List<PostLike> existsLike = postLikeRepository.findByPostAndUser(post, user);
        boolean isLiked = !existsLike.isEmpty();

        if (isLiked) { // 사용자가 게시글에 좋아요를 눌러뒀을 때 -> 좋아요 삭제
            postLikeRepository.delete(existsLike.get(0));
        } else { // 사용자가 게시글에 좋아요를 누르지 않았을 때 -> 좋아요 추가
            postLikeRepository.save(new PostLike(user, post));
        }

        return checkLikeStatus(postId, userId);
    }

    public PostLikeResponseDto.Data checkLikeStatus(Long postId, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("사용자가 존재하지 않습니다."));
        Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));

        boolean isLiked = postLikeRepository.existsByPostAndUser(post, user);
        long likeCount = postLikeRepository.countByPost(post);

        PostLikeResponseDto.Data data = PostLikeResponseDto.Data.builder()
                .liked(isLiked)
                .likeCount(likeCount)
                .build();

        return data;
    }
}
