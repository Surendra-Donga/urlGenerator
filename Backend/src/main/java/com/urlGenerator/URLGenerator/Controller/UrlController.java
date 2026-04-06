package com.urlGenerator.URLGenerator.controller;

import com.urlGenerator.URLGenerator.dto.UrlResponse;
import com.urlGenerator.URLGenerator.entity.Url;
import com.urlGenerator.URLGenerator.service.UrlService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/urls")
@RequiredArgsConstructor
@Tag(name = "URL Shortener API", description = "Endpoints for shortening and managing URLs")
public class UrlController {

    private final UrlService urlService;

    @PostMapping("/shorten")
    @Operation(
        summary = "Shorten a long URL", 
        description = "Generates a unique short code for the provided long URL",
        security = @SecurityRequirement(name = "basicAuth")
    )
    public ResponseEntity<?> shortenUrl(@RequestBody Map<String, String> request, Authentication authentication) {
        String longUrl = request.get("url");
        if (longUrl == null || longUrl.isEmpty()) {
            return ResponseEntity.badRequest().body("URL cannot be empty");
        }
        Url url = urlService.shortenUrl(longUrl, authentication.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(mapToResponse(url));
    }

    @GetMapping("/my-urls")
    @Operation(summary = "Get current user's URLs", security = @SecurityRequirement(name = "basicAuth"))
    public List<UrlResponse> getMyUrls(Authentication authentication) {
        return urlService.getMyUrls(authentication.getName()).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @GetMapping("/{shortCode}")
    @Operation(summary = "Redirect to original URL", description = "Retrieves the original long URL from a short code and redirects")
    public RedirectView redirectToOriginal(@PathVariable String shortCode) {
        Url url = urlService.getOriginalUrl(shortCode);
        return new RedirectView(url.getOriginalUrl());
    }

    private UrlResponse mapToResponse(Url url) {
        return new UrlResponse(url.getId(), url.getOriginalUrl(), url.getShortCode(), url.getCreatedAt());
    }
}
