package com.example.community_project.domain.mypage.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL) // data 부분이 null일 때 data 부분 제외하고 JSON으로 변환
public class MypageResponseDto {

    private int status;
    private boolean success;
    private String message;
    private MypageData mypageData;

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MypageData {
        private String loginId;
        private String name;
//        private LocalDateTime createdAt;
    }
}
