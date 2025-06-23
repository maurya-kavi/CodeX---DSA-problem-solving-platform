 LeetLab – A LeetCode Clone with AI Integration
LeetLab is a full-stack coding platform inspired by LeetCode. It allows users to solve algorithm problems, run and submit code in multiple languages, track submissions, and integrate an AI assistant using Gemini for code help and explanations.

📦 Tech Stack Overview
🚀 Frontend
React.js – JavaScript library for building user interfaces.

Vite – Fast development server and build tool.

Tailwind CSS – Utility-first CSS framework.

DaisyUI – Tailwind-based component library for rapid UI development.

React Router – Handles frontend routing.

Zustand – Lightweight state management.

Zod – Type-safe validation for forms.

React Hook Form – Form management and validation.

Lucide React – Icon library.

@monaco-editor/react – Integrates VS Code-like code editor.

🌐 Backend
Node.js – Runtime for executing JavaScript server-side.

Express.js – Web framework for building REST APIs.

Prisma ORM – Database ORM for PostgreSQL.

PostgreSQL – Relational database for storing users, problems, submissions.

JWT (jsonwebtoken) – For user authentication.

Bcrypt – Password hashing.

Judge0 API – Code execution engine to run user submissions.

CORS, Helmet, Morgan – Middleware for security and logging.

📁 Folder Structure
bash
Copy
Edit
leetlab/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── index.js
│   └── prisma/
│       ├── schema.prisma
│       └── seed.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── layout/
│   │   ├── lib/
│   │   ├── page/
│   │   ├── store/
│   │   ├── App.jsx
│   │   └── main.jsx
🔧 Features
🧩 Problem Listing, Solving & Code Execution (Judge0 API)

📝 User Submissions & History Tracking

🎛️ Admin Panel to Add Problems

📁 Playlist Creation (group problems into sets)

💬 Tabs: Description, Submissions, Hints, Discussion

🤖 Gemini AI Assistant (chat + solution explainer – optional)

🧠 Zustand Stores (State Management)
useAuthStore – Handles authentication.

useProblemStore – Fetches problems.

useSubmissionStore – Tracks and fetches submissions.

useExecutionStore – Handles code execution.

usePlaylistStore – Manages playlists (create, delete, edit).

🧪 Testing
Use Postman for:

✅ Creating problems (POST /problem)

✅ Fetching problems (GET /problem)

✅ Creating playlists (POST /playlist)

✅ Running code (POST /execute)

✅ Submitting code (POST /submission)

