package com.example.community_project.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfig = new CorsConfiguration();

        corsConfig.setAllowCredentials(false);

        List<String> allowedOrigins = Arrays.asList(
                "http://localhost:5173",
                "http://localhost:3000"

        );
        corsConfig.setAllowedOrigins(allowedOrigins);

        corsConfig.setAllowedMethods(Arrays.asList("GET","POST","PUT","PATCH","DELETE","OPTIONS","HEAD"));
        corsConfig.setAllowedHeaders(Arrays.asList("Authorization","Content-Type","X-Requested-With"));
        corsConfig.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);
        return source;
    }
}
