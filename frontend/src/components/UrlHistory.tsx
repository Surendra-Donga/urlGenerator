"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import styles from "./UrlHistory.module.css";

interface UrlData {
  id: number;
  originalUrl: String;
  shortCode: string;
  createdAt: string;
}

export default function UrlHistory({ refreshTrigger }: { refreshTrigger: number }) {
  const { auth } = useAuth();
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUrls = useCallback(async () => {
    try {
      const res = await fetch("/api/my-urls", {
        headers: { "Authorization": `Basic ${auth}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUrls(data);
      }
    } catch (err) {
      console.error("Failed to fetch history", err);
    } finally {
      setLoading(false);
    }
  }, [auth]);

  useEffect(() => {
    fetchUrls();
  }, [fetchUrls, refreshTrigger]);

  if (loading) return <div className={styles.loading}>Loading history...</div>;
  if (urls.length === 0) return null;

  return (
    <div className={styles.container}>
      <h2>Your Shortened URLs</h2>
      <div className={styles.list}>
        {urls.map((url) => (
          <div key={url.id} className={styles.item}>
            <div className={styles.info}>
              <p className={styles.original}>{url.originalUrl}</p>
              <a 
                href={`${window.location.origin}/${url.shortCode}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.short}
              >
                {window.location.origin}/{url.shortCode}
              </a>
            </div>
            <span className={styles.date}>
              {new Date(url.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
