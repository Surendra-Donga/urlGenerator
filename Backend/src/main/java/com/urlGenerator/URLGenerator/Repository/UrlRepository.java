package com.urlGenerator.URLGenerator.repository;

import com.urlGenerator.URLGenerator.entity.Url;
import com.urlGenerator.URLGenerator.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UrlRepository extends JpaRepository<Url, Long> {
    Optional<Url> findByShortCode(String shortCode);
    List<Url> findByUserOrderByCreatedAtDesc(User user);
}
