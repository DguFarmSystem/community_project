package com.example.community_project.global;

import com.example.community_project.domain.auth.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.UUID;

@RequiredArgsConstructor //final 필드를 초기화하는 생성자 자동 생성.
public class CustomUserDetails implements UserDetails {

    private final User user;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();  //따로 어드민과 유저를 구분하여 권한 부여하지 않으므로 empty list
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


    public Long getUserId() {  // JWT에 담거나 조회용으로 사용 가능
        return user.getUserId();
    }

    public User getUser() { // 전체 유저 객체 접근 필요 시
        return user;
    }
}
