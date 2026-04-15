package com.urlGenerator.URLGenerator.service;

import com.urlGenerator.URLGenerator.entity.Url;
import com.urlGenerator.URLGenerator.entity.User;
import com.urlGenerator.URLGenerator.repository.UrlRepository;
import com.urlGenerator.URLGenerator.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class UrlService {

    private final UrlRepository urlRepository;
    private final UserRepository userRepository;
    private static final String CHARACTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int CODE_LENGTH = 7;
    private final Random random = new Random();

    public Url shortenUrl(String originalUrl, String username) {
        User user = null;
        if (username != null && !username.equals("anonymousUser")) {
            user = userRepository.findByUsername(username).orElse(null);
        }

        String shortCode = generateUniqueShortCode();
        Url url = Url.builder()
                .originalUrl(originalUrl)
                .shortCode(shortCode)
                .user(user)
                .build();
        return urlRepository.save(url);
    }

    public List<Url> getMyUrls(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return urlRepository.findByUserOrderByCreatedAtDesc(user);
    }

    public Url getOriginalUrl(String shortCode) {
        return urlRepository.findByShortCode(shortCode)
                .orElseThrow(() -> new RuntimeException("URL not found for code: " + shortCode));
    }

    private String generateUniqueShortCode() {
        String code;
        do {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < CODE_LENGTH; i++) {
                sb.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
            }
            code = sb.toString();
        } while (urlRepository.findByShortCode(code).isPresent());
        return code;
    }
}
