# Taskflow — Mini-SaaS Task Manager

Taskflow is a production-ready, full-stack task management system built with the PERN stack. It focuses on productivity, focus, and data integrity with a premium user experience.

## 🚀 Key Features

### 🔐 Security & Auth
- **JWT Authentication**: Secure signup and login with hashed passwords using `bcryptjs`.
- **Protected Scoping**: Tasks are strictly isolated per user at the database level.

### 📋 Smart Task Management
- **Duplicate Prevention**: System-level and DB-level checks to prevent creating identical tasks.
- **Priority System**: Dynamic color-coded cards for Low, Medium, and High priorities.
- **Complexity Scoring**: Automatic weight badges (1–10) calculated based on task details.
- **Completion Workflow**: A mandatory 3-point checklist (Quality, Results, Cleanup) ensures tasks are actually finished before being marked done.

### ⚡ Productivity Tools
- **Focus Stream**: A dedicated distraction-free mode for your highest priority task.
- **Pomodoro Timer**: Integrated 25-minute timer to maintain deep work.
- **Productivity Stats**: Real-time progress tracking and pending task counters in the sidebar.
- **Instant Search**: Global search bar to find tasks by title or description in real-time.

### 🛠 Tech Stack
- **Frontend**: React 19 (Vite), Tailwind CSS v4, Lucide Icons.
- **Backend**: Node.js, Express.js.
- **Database**: PostgreSQL with Sequelize ORM.
- **State Management**: React Hooks & Context API.

## 📦 Setup & Installation

### 1. Prerequisites
- Node.js (v18+)
- PostgreSQL Database

### 2. Backend Setup
```bash
cd server
npm install
# Configure your .env file with DATABASE_URL and JWT_SECRET
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

## 🛣 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT |
| `GET` | `/api/tasks` | Fetch all user tasks |
| `POST` | `/api/tasks` | Create a new unique task |
| `PUT` | `/api/tasks/:id` | Update task details or status |
| `DELETE` | `/api/tasks/:id` | Securely delete a task |

---
*Built with ❤️ for peak productivity.*
