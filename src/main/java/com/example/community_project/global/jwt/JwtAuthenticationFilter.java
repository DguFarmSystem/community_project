package com.example.community_project.global.jwt;

import com.example.community_project.domain.auth.entity.User;
import com.example.community_project.domain.auth.repository.UserRepository;
import com.example.community_project.global.CustomUserDetails;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // 1. 요청 헤더에서 Authorization 추출
        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);

            try {
                // 2. 토큰 유효성 검사
                if (jwtProvider.validateToken(token)) {
                    // 3. 토큰에서 사용자 ID 추출
                    Long userId = jwtProvider.getUserIdFromToken(token);

                    // 4. DB에서 사용자 조회
                    User user = userRepository.findByUserIdAndDeletedFalse(userId)
                            .orElseThrow(() -> new RuntimeException("유저 없음"));

                    // 5. UserDetails 생성
                    CustomUserDetails userDetails = new CustomUserDetails(user);

                    // 6. 인증 객체 생성
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails, null, userDetails.getAuthorities());

                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    // 7. SecurityContext에 인증 정보 저장
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            } catch (JwtException e) {
                // 토큰 유효하지 않음 - 무시하고 다음 필터 진행
            }
        }

        // 8. 다음 필터 진행
        filterChain.doFilter(request, response);
    }

}
