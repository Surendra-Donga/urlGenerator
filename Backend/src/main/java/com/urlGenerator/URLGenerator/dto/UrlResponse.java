package com.urlGenerator.URLGenerator.dto;

import java.time.LocalDateTime;

public record UrlResponse(Long id, String originalUrl, String shortCode, LocalDateTime createdAt) {}
