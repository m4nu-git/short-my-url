# 🔗 URL Shortener Service

A production-ready **URL Shortener** built with **Node.js, Express, TypeScript, MongoDB, Redis, and tRPC**, featuring **structured logging**, **correlation IDs**, and **caching** for high performance.

---

## 🚀 Features

- Shorten any long URL into a unique short URL
- Retrieve and redirect to the original URL
- URL click tracking (analytics-ready)
- Redis caching for faster lookups
- MongoDB persistence
- tRPC-based API (type-safe communication)
- Correlation IDs for distributed tracing
- Structured logging with Winston

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express, tRPC  
- **Database:** MongoDB (Mongoose ORM)  
- **Cache:** Redis (ioredis)  
- **Logging:** Winston with correlation IDs  
- **Validation:** Zod  
- **Language:** TypeScript  

---

## 📂 Project Structure

```

src/
├── config/          # DB, Redis, Logger configurations
├── controllers/     # Request handlers
├── repositories/    # Data access (MongoDB + Redis)
├── services/        # Business logic
├── routers/         # tRPC routers
├── middlewares/     # Correlation ID, error handlers
├── utils/           # Helpers (base62 encoder, errors)
└── models/          # Mongoose schemas

````

---

## ⚡ Setup & Installation

### 1️⃣ Clone the repo
```bash
git clone https://github.com/m4nu-git/short-my-url.git
cd short-my-url
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

Create a `.env` file in the root directory:

```env
PORT=8080
MONGO_URI=mongodb://localhost:27017/urlshortener
REDIS_URL=redis://localhost:6379
BASE_URL=http://localhost:4000
```

### 4️⃣ Start MongoDB & Redis

Make sure MongoDB and Redis are running locally or in Docker.

```bash
# Run MongoDB (Docker)
docker run -d -p 27017:27017 mongo

# Run Redis (Docker)
docker run -d -p 6379:6379 redis
```

### 5️⃣ Run the server

```bash
npm run dev
```

The server will be available at:
👉 `http://localhost:3001`

---

## 📬 API Endpoints

### 1. Create a Short URL

**POST** `/trpc/url.create`

Request:

```json
{
  "originalUrl": "https://www.google.com"
}
```

Response:

```json
{
   "id": "68a1548259e73b1ffcc4bf9b",
   "shortUrl": "6",
   "originalUrl": "https://www.google.com",
   "fullUrl": "http://localhost:8080/6",
   "createAt": ".......",
   "updatedAt": "......."
}
```

### 2. Redirect to Original URL

**GET** `/:shortUrl`

---

## 📊 Logging

* **Request Correlation ID**: Every request has a unique ID for tracing logs across services.
* **Winston structured logs**: Includes metadata (timestamp, level, correlation ID).

Example log:

```json
{
  "level": "info",
  "message": "Short URL created successfully",
  "correlationId": "6f9d0b3e-1e34-4c9d-a29b",
  "shortUrl": "aZ3kP"
}
```
