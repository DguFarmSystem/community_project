package com.example.community_project.domain.auth.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String name;

    @Column(nullable = false, unique = true)
    private String username; //아이디

    private String password;

    @Column(nullable = false)
    private boolean deleted = false;


    public void delete() {
        this.deleted = true;
    }

    public static User createUser(String name, String username, String encodedPassword) {
        User user = new User();
        user.name = name;
        user.username = username;
        user.password = encodedPassword;
        return user;
    }

    public void changeData(String username) {
        this.username = username;
    }

    public void changePassword(String encodedPassword) {
        this.password = encodedPassword;
    }
}
