# Project: URL Generator (Full-Stack)

## Overview
This project is a URL Shortener with a Spring Boot (Java 17) backend and a Next.js (TypeScript) frontend. It has been containerized for deployment on Render using Docker Hub.

## Infrastructure & Docker
- **Docker Hub Username:** `surendradonga`
- **Backend Image:** `surendradonga/url-generator-backend`
- **Frontend Image:** `surendradonga/url-generator-frontend`

### Dockerfiles
- **Backend:** Multi-stage build (Maven + Temurin JRE 17).
- **Frontend:** Multi-stage build (Node.js 20-alpine) using Next.js `standalone` output for optimization.

### Local Orchestration
A `docker-compose.yml` is provided in the root to run the Frontend, Backend, and a MySQL 8.0 database locally.
- **Stop local testing:** `docker-compose down`

## Configuration (Environment Variables)

### Backend (`/Backend`)
- `DB_HOST`: Database hostname (default: `localhost`)
- `DB_PORT`: Database port (default: `3306`)
- `DB_NAME`: Database name (default: `url_shortener`)
- `DB_USER`: Database username (default: `root`)
- `DB_PASSWORD`: Database password
- `PORT`: Server port (default: `8080`)

### Frontend (`/frontend`)
- `BACKEND_URL`: The URL of the deployed backend API (e.g., `https://your-backend.onrender.com`)
- `PORT`: Server port (default: `3000`)

## Deployment Strategy (Render)
1. **Database:** Use a MySQL provider (TiDB Cloud, PlanetScale, or Aiven).
2. **Backend:** Deploy as a "Web Service" from the Docker Hub image.
   - Inject `DB_*` environment variables.
3. **Frontend:** Deploy as a "Web Service" from the Docker Hub image.
   - Inject `BACKEND_URL`.

## Recent Changes
- Updated Spring Boot `application.properties` to use dynamic environment variables.
- Updated Next.js API routes to use `process.env.BACKEND_URL`.
- Configured Next.js for `standalone` output.
- Added Dockerfiles and Docker Compose configuration.
