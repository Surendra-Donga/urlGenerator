# URL Generator & Shortener

A full-stack URL shortening service built with **Spring Boot** and **Next.js**.

## 🚀 Features
- **User Authentication:** Secure registration and login using Spring Security and BCrypt.
- **Link Shortening:** Generate unique, short aliases for long URLs.
- **Personalized History:** Users can view and manage their own shortened links.
- **Automatic Redirection:** Seamlessly redirects from the short link to the original destination.
- **Modern UI:** Responsive and clean interface built with Next.js and Vanilla CSS.
- **API Documentation:** Interactive Swagger UI for backend exploration.

## 🛠️ Tech Stack
### Backend
- **Java 17+**
- **Spring Boot 3**
- **Spring Data JPA** (MySQL)
- **Spring Security** (Basic Auth)
- **SpringDoc OpenAPI** (Swagger)
- **Lombok**

### Frontend
- **Next.js 15+** (App Router)
- **TypeScript**
- **Vanilla CSS Modules**
- **React Context API**

## 🏁 Getting Started

### Prerequisites
- **MySQL Server** installed and running.
- **Node.js** (v18+) installed.
- **Java JDK 17+** installed.

### 1. Database Setup
1. Open MySQL Workbench or any SQL client.
2. Create a database named `url_shortener`.
3. Update `Backend/src/main/resources/application.properties` with your MySQL username and password.

### 2. Run the Backend
```bash
cd Backend
./mvnw spring-boot:run
```
- API will be available at: `http://localhost:8080`
- Swagger UI: `http://localhost:8080/swagger-ui.html`

### 3. Run the Frontend
```bash
cd frontend
npm install
npm run dev
```
- Open `http://localhost:3000` in your browser.

## 🔑 Default User
Once you run the app, you can **Register** a new account directly from the frontend UI.
- **Registration Endpoint:** `POST /api/v1/auth/register`
- **Shorten Endpoint:** `POST /api/v1/urls/shorten` (Requires Auth)

## 📄 License
MIT License
