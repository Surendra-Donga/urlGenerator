"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import UrlHistory from "./UrlHistory";
import styles from "./UrlShortenerForm.module.css";

export default function UrlShortenerForm() {
  const { auth, logout, username } = useAuth();
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refreshHistory, setRefreshHistory] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShortUrl("");

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: longUrl, auth }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to shorten URL");
      }

      const frontendShortUrl = `${window.location.origin}/${data.shortCode}`;
      setShortUrl(frontendShortUrl);
      setRefreshHistory(prev => prev + 1); // Trigger history refresh
      setLongUrl("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Copied to clipboard!");
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span>Logged in as <strong>{username}</strong></span>
          <button onClick={logout} className={styles.logoutBtn}>Logout</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Shorten a URL</h2>
          <div className={styles.inputGroup}>
            <input
              type="url"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="Paste your long URL here"
              required
            />
            <button type="submit" disabled={loading} className={styles.shortenBtn}>
              {loading ? "..." : "Shorten"}
            </button>
          </div>
        </form>

        {error && <p className={styles.error}>{error}</p>}

        {shortUrl && (
          <div className={styles.result}>
            <h3>Your Short URL:</h3>
            <div className={styles.resultLink}>
              <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
              <button onClick={copyToClipboard} className={styles.copyBtn}>Copy</button>
            </div>
          </div>
        )}
      </div>

      <UrlHistory refreshTrigger={refreshHistory} />
    </div>
  );
}
