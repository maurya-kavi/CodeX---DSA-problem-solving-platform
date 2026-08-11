# 🚀 CodeX – DSA Problem Solving Platform

CodeX is a full-stack coding platform inspired by LeetCode. It allows users to solve algorithmic problems, compile and run code in multiple languages, track their submissions, and create custom playlist, Admin can create or add new problem and manages all the problem on the platform.

## 🌟 Project Overview

This platform was built to practice algorithmic problem. It features a scalable Node.js/Express backend paired with a highly responsive React frontend. Code execution is securely handled via the Judge0 API, while user data and problem sets are managed using PostgreSQL and Prisma ORM.

## 🛠️ Tech Stack

### Frontend
* **Framework:** React.js, Vite
* **Styling & UI:** Tailwind CSS, DaisyUI, Lucide React
* **State Management:** Zustand
* **Routing & Forms:** React Router, React Hook Form, Zod
* **Code Editor:** `@monaco-editor/react` (VS Code-like experience)

### Backend & Database
* **Runtime & Framework:** Node.js, Express.js
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Authentication & Security:** JWT, Bcrypt, CORS, Helmet, Morgan

### External APIs
* **Code Execution:** [Judge0 API](https://judge0.com/)

## ✨ Key Features

* **Live Code Execution:** Securely compile and run user submissions using the Judge0 engine.
* **AI-Assisted Learning:** Integrated Gemini AI chatbot to explain solutions and provide intelligent hints without giving away the answer.
* **Comprehensive Problem Dashboard:** Browse problems, view test cases, check hints, and participate in discussions.
* **Custom Playlists:** Group specific problems into curated sets for targeted practice.
* **Admin Controls:** Dedicated admin panel for creating and managing problem statements and test cases.

## 📁 Folder Structure

```text
CodeX/
├── backend/                  # Express server & API routes
│   ├── src/
│   │   ├── controllers/      # Route logic
│   │   ├── middleware/       # Auth & error handling
│   │   ├── routes/           # API endpoints
│   │   └── index.js          # Server entry point
│   └── prisma/               # Database schema & seeding
│
├── frontend/                 # React client application
│   ├── src/
│   │   ├── components/       # Reusable UI elements
│   │   ├── page/             # Main application views
│   │   ├── store/            # Zustand state slices
│   │   └── App.jsx


## 💻 Local Setup & Installation

Follow the steps below to run **CodeX** locally.

### 📌 Prerequisites

Ensure you have the following installed before getting started:

* Node.js (v16 or later)
* PostgreSQL
* Git
* Judge0 API credentials
* Google Gemini API key

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/maurya-kavi/CodeX---DSA-problem-solving-platform.git
cd CodeX---DSA-problem-solving-platform
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory and configure the required environment variables:

```env
DATABASE_URL=your_postgresql_database_url
JWT_SECRET=your_jwt_secret
JUDGE0_API_URL=your_judge0_api_url
JUDGE0_API_KEY=your_judge0_api_key
GEMINI_API_KEY=your_google_gemini_api_key
```

Run the database migrations:

```bash
npx prisma migrate dev
```

Start the backend server:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

Open a new terminal and run:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000
```

Start the React development server:

```bash
npm run dev
```

The frontend will typically be available at:

```text
http://localhost:5173
```

---

## 🧪 API Testing

The backend exposes RESTful APIs that can be tested using **Postman**, **Insomnia**, or any API client.

| Method | Endpoint         | Description                              |
| ------ | ---------------- | ---------------------------------------- |
| POST   | `/problem`       | Create a new coding problem (Admin only) |
| GET    | `/problem`       | Fetch all available problems             |
| GET    | `/problem/:id`   | Retrieve a specific problem              |
| POST   | `/execute`       | Execute code against custom input        |
| POST   | `/submission`    | Submit a solution for evaluation         |
| POST   | `/auth/login`    | User authentication                      |
| POST   | `/auth/register` | Register a new user                      |

> **Note:** Some endpoints require authentication using a valid JWT token.
