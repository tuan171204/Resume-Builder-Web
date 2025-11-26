package com.example.resume_service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;


@Configuration
public class RestTemplateConfig {

    private static final int TIMEOUT_SECONDS = 600;

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate(clientHttpRequestFactory());
    }

    private ClientHttpRequestFactory clientHttpRequestFactory() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();

        factory.setConnectTimeout(TIMEOUT_SECONDS * 1000);

        // Cấu hình thời gian chờ đọc (chờ phản hồi sau khi kết nối được thiết lập)
        factory.setReadTimeout(TIMEOUT_SECONDS * 1000);

        return factory;
    }
}
