# Project Evaluation: URL Generator & Shortener

This document provides a detailed breakdown of the project's conceptual and technical implementation for evaluation purposes.

## 1. Problem Understanding
The primary challenge addressed by this project is the management and sharing of long, complex URLs. 
- **User Experience:** Long URLs are difficult to share in limited-space environments (social media, SMS) and are visually unappealing.
- **Security & Privacy:** Many shorteners are public-only; there is a need for a private service where users can track their own shortened links.
- **Data Persistence:** Users need a way to keep a history of their shortened links rather than generating them anonymously and losing track of them.

## 2. Design Documentation
### System Architecture
The project follows a modern **Decoupled Client-Server Architecture**:
- **Frontend (Presentation Layer):** Next.js (React) handles the user interface and provides a "Proxy Redirection" mechanism to keep users on a consistent domain.
- **Backend (Business Logic Layer):** Spring Boot handles authentication, URL generation algorithms, and business rules.
- **Database (Data Layer):** MySQL persists user accounts and URL mappings with relational integrity.

### Data Model
- **User:** Stores hashed credentials (`id`, `username`, `password`).
- **Url:** Stores link mappings (`id`, `original_url`, `short_code`, `user_id`, `created_at`).

## 3. Idea and Innovation
- **Frontend Proxy Redirection:** Unlike many shorteners that redirect directly to the backend, this project uses Next.js dynamic routes (`/[code]`) to intercept the request. This allows for future client-side analytics or interstitial pages without exposing the backend API directly to the end user.
- **Seamless Auth Integration:** By combining Spring Security's Basic Auth with a Next.js Proxy, we've created a secure flow where the frontend handles the "handshake" and user session without storing plain-text passwords.
- **Developer-Centric Design:** The inclusion of **Swagger/OpenAPI** ensures that the backend remains a standalone, documentable service that could support mobile apps or CLI tools in the future.

## 4. Functionality
- **User Authentication:** 
  - Password hashing using **BCrypt**.
  - Persistent user sessions via Context API.
- **Link Shortening:**
  - High-entropy 7-character short codes (millions of combinations).
  - Collision-detection algorithm in the `UrlService`.
- **User Dashboard:**
  - Real-time history fetching.
  - One-click "Copy to Clipboard" functionality.
- **Dynamic Redirection:**
  - Global redirection handler for any short code.
  - Automatic 307 (Temporary Redirect) status codes to preserve SEO.

## 5. Project Explanation
This project demonstrates a full-stack engineering lifecycle. It begins with a **Spring Boot** backend that leverages **Spring Data JPA** for effortless database communication. The security layer ensures that while redirections are public (for the links to work), the creation and history of links are strictly private to the user. On the frontend, **Next.js** provides a high-performance environment with **Server-Side Rendering (SSR)** capabilities for the redirection logic, ensuring that the user experience is fast and responsive.

## 6. Readme.md
*(Refer to the root README.md for installation and usage instructions)*
