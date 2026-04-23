# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites

- Node.js v16+
- PostgreSQL (or Supabase)
- Two terminal windows

---

## Backend Setup

### 1. Create Database (if using local PostgreSQL)

```bash
psql -U postgres
CREATE DATABASE task_management;
```

### 2. Setup Backend

```bash
cd backend
npm install
```

### 3. Configure .env

```bash
cp .env.example .env
```

Edit `backend/.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_management
DB_USER=postgres
DB_PASSWORD=your_db_password
JWT_SECRET=your_super_secret_key
```

**For Supabase:** Use your Supabase connection string details

### 4. Start Backend Server

```bash
npm run dev
```

✓ Server running on http://localhost:5000

---

## Frontend Setup

### 1. Setup Frontend

```bash
cd frontend
npm install
```

### 2. Configure .env

```bash
cp .env.example .env
```

The default `.env` already points to `http://localhost:5000/api` which is correct.

### 3. Start Frontend Server

```bash
npm run dev
```

✓ App running on http://localhost:3000

---

## Test It Out

### 1. Open Browser

Navigate to: http://localhost:3000

### 2. Sign Up

- Click "Sign up here"
- Enter name, email, password
- Click "Sign Up"

### 3. Create Tasks

- Click "+ New Task"
- Enter task title and description
- Click "Create Task"

### 4. Manage Tasks

- ✓ Click checkbox to mark complete
- Edit button to modify task
- Delete button to remove task

---

## Common Issues

| Issue                        | Solution                                            |
| ---------------------------- | --------------------------------------------------- |
| "Database connection failed" | Check PostgreSQL is running & credentials in `.env` |
| "Port 5000 already in use"   | Change PORT in `.env`                               |
| "Port 3000 already in use"   | Vite will prompt to use another port                |
| "CORS error"                 | Ensure backend is running on port 5000              |
| "Login fails"                | Check JWT_SECRET is set in `.env`                   |

---

## Project Structure

```
task-management/
├── backend/          (Node.js + Express + PostgreSQL)
│   ├── models/       (User, Task)
│   ├── routes/       (/api/auth, /api/tasks)
│   ├── controllers/  (Business logic)
│   └── server.js     (Entry point)
├── frontend/         (React + Tailwind + Vite)
│   ├── pages/        (Login, Signup, Dashboard)
│   ├── components/   (TaskForm, TaskList, TaskItem)
│   └── App.jsx       (Routes & Auth)
└── README.md         (Full documentation)
```

---

## Next Steps

1. **Customize**: Update app name, colors, or features
2. **Deploy**: Check README.md for production build instructions
3. **Database**: Add seed data or migrations as needed
4. **Features**: Add more features like categories, priorities, due dates

---

## API Endpoints

| Method | Endpoint           | Auth | Purpose       |
| ------ | ------------------ | ---- | ------------- |
| POST   | `/api/auth/signup` | ❌   | Register user |
| POST   | `/api/auth/login`  | ❌   | Login user    |
| GET    | `/api/tasks`       | ✅   | Get all tasks |
| POST   | `/api/tasks`       | ✅   | Create task   |
| PUT    | `/api/tasks/:id`   | ✅   | Update task   |
| DELETE | `/api/tasks/:id`   | ✅   | Delete task   |

---

## Full Documentation

See `README.md` for:

- Detailed setup instructions
- Database schema
- Environment variables reference
- Production deployment guide
- Troubleshooting tips

---

**Happy coding! 🎉**
