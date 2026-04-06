"use client";

import { useAuth } from "@/context/AuthContext";
import LoginForm from "@/components/LoginForm";
import UrlShortenerForm from "@/components/UrlShortenerForm";
import styles from "./page.module.css";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>URL Shortener</h1>
        <p className={styles.subtitle}>
          Fast, simple, and secure link shortening service.
        </p>

        {isAuthenticated ? (
          <UrlShortenerForm />
        ) : (
          <LoginForm />
        )}
      </div>
    </main>
  );
}
