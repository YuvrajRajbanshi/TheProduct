# API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected endpoints require an `Authorization` header:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## Endpoints

### Authentication Endpoints

#### 1. Sign Up

Create a new user account

- **URL**: `/auth/signup`
- **Method**: `POST`
- **Auth Required**: ❌ No
- **Headers**: `Content-Type: application/json`

**Request Body**:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Success Response (201)**:

```json
{
  "message": "User created successfully",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (400)**:

```json
{
  "error": "Valid email is required"
}
```

**Error Response (409)**:

```json
{
  "error": "Email already registered"
}
```

---

#### 2. Login

Authenticate user and get JWT token

- **URL**: `/auth/login`
- **Method**: `POST`
- **Auth Required**: ❌ No
- **Headers**: `Content-Type: application/json`

**Request Body**:

```json
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Success Response (200)**:

```json
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (401)**:

```json
{
  "error": "Invalid email or password"
}
```

---

### Task Endpoints

#### 3. Get All Tasks

Retrieve all tasks for the authenticated user

- **URL**: `/tasks`
- **Method**: `GET`
- **Auth Required**: ✅ Yes
- **Query Parameters**: None

**Success Response (200)**:

```json
{
  "message": "Tasks retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "title": "Buy groceries",
      "description": "Milk, eggs, bread",
      "status": "Pending",
      "userId": "uuid",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    },
    {
      "id": "uuid",
      "title": "Complete project",
      "description": "Finish backend API",
      "status": "Completed",
      "userId": "uuid",
      "createdAt": "2024-01-14T14:20:00Z",
      "updatedAt": "2024-01-15T08:15:00Z"
    }
  ]
}
```

**Error Response (401)**:

```json
{
  "error": "Authorization token missing"
}
```

---

#### 4. Create Task

Create a new task for the authenticated user

- **URL**: `/tasks`
- **Method**: `POST`
- **Auth Required**: ✅ Yes
- **Headers**: `Content-Type: application/json`

**Request Body**:

```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "status": "Pending"
}
```

_Note: `description` and `status` are optional. `status` defaults to "Pending"_

**Success Response (201)**:

```json
{
  "message": "Task created successfully",
  "data": {
    "id": "uuid",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "status": "Pending",
    "userId": "uuid",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Error Response (400)**:

```json
{
  "error": "Valid title is required"
}
```

**Error Response (401)**:

```json
{
  "error": "Invalid or expired token"
}
```

---

#### 5. Update Task

Update an existing task

- **URL**: `/tasks/:id`
- **Method**: `PUT`
- **Auth Required**: ✅ Yes
- **URL Parameters**:
  - `id` (string, UUID) - Task ID

**Request Body** (all fields optional):

```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "Completed"
}
```

**Success Response (200)**:

```json
{
  "message": "Task updated successfully",
  "data": {
    "id": "uuid",
    "title": "Updated title",
    "description": "Updated description",
    "status": "Completed",
    "userId": "uuid",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T11:45:00Z"
  }
}
```

**Error Response (404)**:

```json
{
  "error": "Task not found"
}
```

**Error Response (403)**:

```json
{
  "error": "Unauthorized to update this task"
}
```

---

#### 6. Delete Task

Delete a task

- **URL**: `/tasks/:id`
- **Method**: `DELETE`
- **Auth Required**: ✅ Yes
- **URL Parameters**:
  - `id` (string, UUID) - Task ID

**Success Response (200)**:

```json
{
  "message": "Task deleted successfully"
}
```

**Error Response (404)**:

```json
{
  "error": "Task not found"
}
```

**Error Response (403)**:

```json
{
  "error": "Unauthorized to delete this task"
}
```

---

## Status Codes

| Code | Meaning                                      |
| ---- | -------------------------------------------- |
| 200  | OK - Request succeeded                       |
| 201  | Created - Resource created successfully      |
| 400  | Bad Request - Invalid request data           |
| 401  | Unauthorized - Auth token missing or invalid |
| 403  | Forbidden - User lacks permission            |
| 404  | Not Found - Resource not found               |
| 409  | Conflict - Email already exists              |
| 500  | Server Error - Internal server error         |

---

## Field Validation

### User Signup/Login

- **name**: Required (min 1 char), max 255 chars
- **email**: Required, must be valid email format
- **password**: Required (min 6 chars)

### Task Creation/Update

- **title**: Required (min 1 char), max 255 chars
- **description**: Optional, max 255 chars
- **status**: Only "Pending" or "Completed"

---

## Authentication Flow

1. **Sign Up / Login** → Get JWT token
2. **Store token** in localStorage or sessionStorage
3. **Include token** in Authorization header for protected requests
4. **Token expires** after 7 days (configurable)
5. **Re-login** when token expires

---

## Example with Curl

### Sign Up

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePassword123"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePassword123"
  }'
```

### Get Tasks (with JWT token)

```bash
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Create Task

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Buy groceries",
    "description": "Milk, eggs, bread"
  }'
```

---

## Rate Limiting

Currently no rate limiting is implemented. Production deployment should include:

- IP-based rate limiting
- User-based rate limiting
- Endpoint-specific limits

---

## CORS

Frontend can make requests from:

- `http://localhost:3000` (development)

For production, update CORS settings in `backend/server.js`

---

## Security Headers

- Authorization token required for protected endpoints
- Passwords are hashed using bcryptjs (10 rounds)
- JWT tokens expire after 7 days
- Email must be unique per user
- Users can only access their own tasks

---

## Errors

All error responses follow this format:

```json
{
  "error": "Error message describing what went wrong"
}
```

Common error messages:

- "Authorization token missing"
- "Invalid or expired token"
- "Email already registered"
- "Invalid email or password"
- "Valid title is required"
- "Task not found"
- "Unauthorized to update/delete this task"

---

**For more details, see the main README.md file**
