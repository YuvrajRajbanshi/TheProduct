# Mini SaaS Task Management Application

A production-ready full-stack task management application built with Node.js, Express, React, and PostgreSQL.

## Features

- **User Authentication**: Secure JWT-based authentication with bcrypt password hashing
- **Task Management**: Create, read, update, and delete tasks
- **Status Tracking**: Track task status (Pending/Completed)
- **User-Specific Tasks**: Each user can only see and manage their own tasks
- **Responsive UI**: Mobile-friendly design with Tailwind CSS
- **Protected Routes**: Secure frontend routing for authenticated users

## Tech Stack

### Backend

- **Node.js** & **Express.js** - Server framework
- **PostgreSQL** - Database (via Sequelize ORM)
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Cors** - Cross-origin resource sharing

### Frontend

- **React 18** - UI framework
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Vite** - Build tool

## Project Structure

```
task-management/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── env.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   └── validation.js
│   ├── utils/
│   │   ├── jwt.js
│   │   └── validators.js
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── TaskItem.jsx
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   └── DashboardPage.jsx
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   └── storage.js
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── ...
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
└── README.md
```

## Prerequisites

- **Node.js** v16+ and npm v8+
- **PostgreSQL** v12+ (or Supabase for managed PostgreSQL)
- **Git**

## Installation & Setup

### 1. Clone or Download the Project

```bash
cd task-management
```

### 2. Backend Setup

#### Step 1: Install Dependencies

```bash
cd backend
npm install
```

#### Step 2: Configure Environment Variables

Create a `.env` file in the `backend` directory by copying `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` and configure the database connection:

```env
# Application
APP_NAME=Task Management API
NODE_ENV=development
PORT=5000

# Database (Update with your actual PostgreSQL or Supabase credentials)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_management
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# Bcrypt
BCRYPT_ROUNDS=10
```

**For Supabase:**

- Use your Supabase project URL in `DB_HOST`
- Use your database password from Supabase
- Set `DB_USER=postgres`
- Set `DB_NAME=postgres` (default)
- Set `DB_PORT=5432`

#### Step 3: Start the Backend Server

```bash
npm run dev
```

You should see:

```
✓ Database connection established
✓ Models synchronized
✓ Server running on port 5000
```

### 3. Frontend Setup

#### Step 1: Install Dependencies

```bash
cd frontend
npm install
```

#### Step 2: Configure Environment Variables

Create a `.env` file in the `frontend` directory:

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

#### Step 3: Start the Frontend Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication

- **POST** `/api/auth/signup` - Register a new user

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **POST** `/api/auth/login` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Tasks (Protected - Requires JWT Token)

- **GET** `/api/tasks` - Get all tasks for the authenticated user
- **POST** `/api/tasks` - Create a new task

  ```json
  {
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "status": "Pending"
  }
  ```

- **PUT** `/api/tasks/:id` - Update a task

  ```json
  {
    "title": "Updated title",
    "description": "Updated description",
    "status": "Completed"
  }
  ```

- **DELETE** `/api/tasks/:id` - Delete a task

## Usage

### 1. Sign Up

- Navigate to `http://localhost:3000/signup`
- Enter your name, email, and password
- Click "Sign Up"
- You'll be redirected to the dashboard

### 2. Login

- Navigate to `http://localhost:3000/login`
- Enter your email and password
- Click "Login"
- You'll be redirected to the dashboard

### 3. Create a Task

- On the dashboard, click "+ New Task"
- Enter task title and optional description
- Click "Create Task"

### 4. Manage Tasks

- **Toggle Status**: Click the checkbox to mark a task as completed
- **Edit Task**: Click "Edit" button to modify task details
- **Delete Task**: Click "Delete" button to remove a task

### 5. Logout

- Click the "Logout" button in the header to exit

## Database Schema

### Users Table

```sql
CREATE TABLE "Users" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

### Tasks Table

```sql
CREATE TABLE "Tasks" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('Pending', 'Completed') DEFAULT 'Pending',
  userId UUID NOT NULL REFERENCES "Users"(id) ON DELETE CASCADE,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

## Security Features

- **Password Hashing**: Passwords are hashed using bcryptjs with 10 rounds
- **JWT Authentication**: Stateless authentication using signed JWT tokens
- **Protected Routes**: Backend endpoints are protected with authentication middleware
- **Input Validation**: All inputs are validated on the backend
- **CORS**: Cross-origin requests are properly configured
- **User Isolation**: Users can only access their own tasks

## Environment Variables

### Backend (.env)

| Variable         | Description           | Default             |
| ---------------- | --------------------- | ------------------- |
| `APP_NAME`       | Application name      | Task Management API |
| `NODE_ENV`       | Node environment      | development         |
| `PORT`           | Server port           | 5000                |
| `DB_HOST`        | Database host         | localhost           |
| `DB_PORT`        | Database port         | 5432                |
| `DB_NAME`        | Database name         | task_management     |
| `DB_USER`        | Database user         | postgres            |
| `DB_PASSWORD`    | Database password     | password            |
| `JWT_SECRET`     | JWT secret key        | your_jwt_secret_key |
| `JWT_EXPIRES_IN` | JWT expiration time   | 7d                  |
| `BCRYPT_ROUNDS`  | Bcrypt hashing rounds | 10                  |

### Frontend (.env)

| Variable       | Description     | Default                   |
| -------------- | --------------- | ------------------------- |
| `VITE_API_URL` | Backend API URL | http://localhost:5000/api |

## Running Both Servers

### Option 1: Two Terminal Windows

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

### Option 2: Using Concurrently (Optional)

Install concurrently in the root:

```bash
npm install -D concurrently
```

Create a root `package.json`:

```json
{
  "scripts": {
    "dev": "concurrently \"cd backend && npm run dev\" \"cd frontend && npm run dev\""
  }
}
```

Run:

```bash
npm run dev
```

## Production Build

### Backend

No build needed - just ensure `.env` is configured for production.

### Frontend

```bash
cd frontend
npm run build
npm run preview
```

The built files will be in the `frontend/dist` directory.

## Troubleshooting

### Database Connection Error

- Ensure PostgreSQL is running
- Check database credentials in `.env`
- Verify database exists or allow Sequelize to create it

### Port Already in Use

- Backend: Change `PORT` in `.env`
- Frontend: The dev server will prompt you to use another port

### Token Expired Error

- Tokens expire after 7 days (configurable via `JWT_EXPIRES_IN`)
- Simply log in again to get a new token

### CORS Issues

- Ensure backend is running on port 5000
- Check `VITE_API_URL` in frontend `.env`

## Performance Considerations

- Database queries are optimized with proper indexing
- JWT tokens reduce database queries
- Sequelize connection pooling is configured
- Vite provides fast development and optimized builds

## Future Enhancements

- Task categories/labels
- Task due dates and reminders
- Collaborative tasks
- Task search and filtering
- Email notifications
- Task priority levels
- Recurring tasks
- User profiles and settings

## License

MIT

## Support

For issues or questions, please create an issue in the repository or contact the development team.

---

**Happy Task Managing! 🚀**
