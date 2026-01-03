# Backend - Resume Analyzer API

Node.js/Express backend for the Resume Analyzer application. Handles authentication, file uploads, resume analysis, and database operations.

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Controllers](#controllers)
- [Models](#models)
- [Middlewares](#middlewares)
- [Error Handling](#error-handling)
- [Development](#development)

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Create .env file with required variables
# Edit .env with your MongoDB and OpenAI credentials

# Start the server
npm start

# Server will run at http://localhost:5000
```

---

## 📦 Installation

### Prerequisites
- Node.js v14+
- npm v7+
- MongoDB (local or Atlas)
- OpenAI API key

### Install Dependencies

```bash
npm install
```

### Dependencies Overview

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^5.2.1 | Web framework |
| mongoose | ^9.0.2 | MongoDB ODM |
| bcrypt | ^6.0.0 | Password hashing |
| jsonwebtoken | ^9.0.3 | JWT authentication |
| multer | ^2.0.2 | File upload |
| openai | ^6.15.0 | AI analysis |
| pdf-parse | ^2.4.5 | PDF processing |
| cors | ^2.8.5 | CORS support |
| dotenv | ^17.2.3 | Environment variables |
| nodemon | ^3.1.11 | Development auto-reload |

---

## ⚙️ Configuration

### Environment Variables (.env)

Create a `.env` file in the backend directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URL=mongodb://localhost:27017/resume-analyzer

# Authentication
JWT_SECRET=your_super_secret_key_min_32_characters_long

# OpenAI
OPENAI_API_KEY=sk-your-api-key-here
```

### Environment Variable Details

**PORT**
- Default: `5000`
- Used by Express to listen for requests

**MONGO_URL**
- Local: `mongodb://localhost:27017/resume-analyzer`
- Atlas: `mongodb+srv://user:pass@cluster.mongodb.net/resume-analyzer`

**JWT_SECRET**
- Used to sign and verify JWT tokens
- Must be at least 32 characters long
- Keep it secret and unique
- Change for production

**OPENAI_API_KEY**
- Get from [OpenAI Platform](https://platform.openai.com/api-keys)
- Used for resume analysis
- Keep it secret

---

## 🏃 Running the Server

### Development Mode (with auto-reload)

```bash
npm start
```

Nodemon will watch for file changes and auto-restart the server.

### Production Mode

```bash
NODE_ENV=production node server.js
```

---

## 📁 Project Structure

```
backend/
├── controllers/
│   ├── auth.controller.js          # Authentication logic
│   └── resume.controller.js        # Resume analysis logic
├── models/
│   └── user.model.js               # User schema
├── routes/
│   └── auth.routes.js              # API routes
├── middlewares/
│   ├── auth.middleware.js          # JWT verification
│   └── multer.middleware.js        # File upload config
├── server.js                       # Express server setup
├── .env                            # Environment variables
├── package.json                    # Dependencies
├── package-lock.json               # Dependency lock
└── README.md                       # This file
```

---

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### 1. Register User

**Endpoint:** `POST /register`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@gmail.com",
  "password": "SecurePass123"
}
```

**Response (201 Created):**
```json
{
  "message": "Account Created Successful!!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Validation Rules:**
- `username` - Required, string
- `email` - Required, must end with `@gmail.com`
- `password` - Required, minimum 8 characters

**Error Responses:**
```json
// Missing fields
{ "message": "Missing Required Fields" } // 400

// Invalid email
{ "message": "Email is Invalid" } // 422

// Password too short
{ "message": "Password is atleast 8 Character." } // 422

// Email already exists
{ "message": "Email is Already Exist!!" } // 409

// Server error
{ "message": "Internal server error" } // 500
```

---

#### 2. Login User

**Endpoint:** `POST /login`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john@gmail.com",
  "password": "SecurePass123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login Successful!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user_id": "507f1f77bcf86cd799439011"
}
```

**Error Responses:**
```json
// Missing fields
{ "message": "Missing Required Fields" } // 400

// Invalid credentials
{ "message": "invalid credentials" } // 401

// Server error
{ "message": "Internal server error" } // 500
```

---

### Protected Endpoints

#### 3. Analyze Resume

**Endpoint:** `POST /analyze`

**Headers:**
```
Content-Type: multipart/form-data
Authorization: Bearer <JWT_TOKEN>
```

**Request Body (Form Data):**
- `resume` - PDF file

**Response (200 OK):**
```json
{
  "suggestions": [
    "Add more quantifiable achievements",
    "Use action verbs to start bullet points",
    "Include relevant keywords for your target role"
  ]
}
```

**File Validation:**
- Must be a PDF file
- Size limit depends on your server config

---

#### 4. Update User Profile

**Endpoint:** `PUT /update`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>
```

**Request Body (at least one field):**
```json
{
  "username": "new_username",
  "email": "newemail@gmail.com",
  "password": "newpassword123"
}
```

**Response (200 OK):**
```json
{
  "message": "User updated successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "new_username",
    "email": "newemail@gmail.com"
  }
}
```

**Validation Rules:**
- At least one field must be provided
- Email must end with `@gmail.com`
- Password must be at least 8 characters

---

#### 5. Delete User Account

**Endpoint:** `DELETE /delete`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Response (200 OK):**
```json
{
  "message": "User deleted successfully"
}
```

---

## 🎮 Controllers

### auth.controller.js

Handles all authentication-related operations.

**Functions:**

1. **registerUser(req, res)**
   - Creates new user account
   - Hashes password with bcrypt
   - Returns JWT token
   - Validates email format and password length

2. **loginUser(req, res)**
   - Authenticates user credentials
   - Returns JWT token and user ID
   - Verifies password with bcrypt

3. **updateUser(req, res)**
   - Updates user profile (username, email, password)
   - Requires JWT authentication
   - Validates new email and password

4. **deleteUser(req, res)**
   - Deletes user account
   - Requires JWT authentication
   - Removes all user data

### resume.controller.js

Handles resume analysis operations.

**Functions:**

1. **getResponse(req, res)**
   - Receives PDF file upload
   - Extracts text from PDF
   - Sends to OpenAI for analysis
   - Returns suggestions

---

## 📊 Models

### User Model (user.model.js)

```javascript
{
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

**Methods:**

1. **generateToken()**
   - Creates JWT token with user ID
   - Token expires in 7 days
   - Returns signed token string

2. **comparePassword(password)**
   - Compares provided password with hashed password
   - Uses bcrypt compare
   - Returns boolean

**Pre-save Middleware:**
- Hashes password before saving if modified
- Uses bcrypt with salt rounds: 10

---

## 🔐 Middlewares

### auth.middleware.js

**Purpose:** Verify JWT tokens for protected routes

**Function:** verifyJWT(req, res, next)

**How it works:**
1. Extracts token from Authorization header
2. Verifies token signature
3. Extracts user ID from token
4. Attaches user object to request
5. Calls next middleware/route handler

**Header Format:**
```
Authorization: Bearer <token>
```

**Errors:**
- No token: Returns 401 "No token provided"
- Invalid token: Returns 401 "Invalid token"

**Usage:**
```javascript
Router.post("/analyze", verifyJWT, getResponse);
```

### multer.middleware.js

**Purpose:** Handle file uploads (PDF files)

**Configuration:**
- Storage: Memory storage (file stays in RAM)
- File filter: Only `.pdf` files
- Size limit: 10MB (configurable)

**Usage:**
```javascript
Router.post("/analyze", uploadPdf.single("resume"), getResponse);
```

**File object properties:**
- `filename` - Original filename
- `mimetype` - File MIME type
- `buffer` - File contents
- `size` - File size in bytes

---

## 🚨 Error Handling

### HTTP Status Codes

| Status | Meaning | Examples |
|--------|---------|----------|
| 200 | OK | Login success, update success |
| 201 | Created | User registered |
| 400 | Bad Request | Missing fields |
| 401 | Unauthorized | Invalid credentials, no token |
| 409 | Conflict | Email already exists |
| 422 | Unprocessable | Invalid email format, weak password |
| 500 | Server Error | Database error, API error |

### Error Response Format

```json
{
  "message": "Description of the error"
}
```

### Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| `Invalid email` | Email doesn't end with @gmail.com | Use Gmail address |
| `Password too short` | Password < 8 chars | Use 8+ character password |
| `Email already exists` | Email registered | Use different email or login |
| `Database Connection Failed` | MongoDB unreachable | Start MongoDB, check URL |
| `Invalid token` | Token expired or tampered | Re-login |
| `No token provided` | Missing Authorization header | Include token in header |

---

## 🛠 Development

### Code Structure Guidelines

**Controllers:**
- One controller file per feature
- Each function handles one operation
- Always send appropriate HTTP status codes
- Validate input before processing

**Models:**
- Define schema clearly
- Add validation in schema
- Include pre/post hooks for data processing
- Add helper methods for common operations

**Routes:**
- Group related routes together
- Use appropriate HTTP methods
- Apply middleware for protected routes
- Use descriptive route names

**Middlewares:**
- Keep middlewares focused
- Log important events
- Handle errors gracefully
- Pass control to next middleware

### Testing Routes Locally

**Using cURL:**

```bash
# Register
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"testuser\",\"email\":\"test@gmail.com\",\"password\":\"testpass123\"}"

# Login
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@gmail.com\",\"password\":\"testpass123\"}"

# Protected endpoint (replace TOKEN with actual token)
curl -X GET http://localhost:5000/api/dashboard \
  -H "Authorization: Bearer TOKEN"
```

**Using Postman:**
1. Import endpoints into Postman
2. Set up collection variables for `baseURL` and `token`
3. Execute requests in order
4. Save responses for reference

### Adding New Endpoints

1. Create route in `routes/auth.routes.js`:
```javascript
Router.post("/newroute", verifyJWT, newController);
```

2. Create controller function in `controllers/`:
```javascript
export async function newController(req, res) {
  try {
    // Logic here
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
}
```

3. Add validation and error handling

---

## 📚 Useful Resources

- [Express.js Guide](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Introduction](https://jwt.io/introduction)
- [OpenAI API Docs](https://platform.openai.com/docs/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

## 🔧 Troubleshooting

### Server won't start
```
Error: Port 5000 is already in use
```
Solution:
```bash
# Change port in .env or use different port
PORT=5001 npm start
```

### Database connection failed
```
Error: DataBase Connection is Failed
```

Solutions:
- Ensure MongoDB is running: `mongod`
- Check `MONGO_URL` in `.env`
- For Atlas: Add your IP to whitelist
- Verify connection string syntax

### JWT errors
```
Error: Invalid token
```

Solutions:
- Token might be expired (7 days)
- Re-login to get new token
- Ensure token is in Authorization header
- Check JWT_SECRET matches in code

### File upload fails
```
Error: File upload failed
```

Solutions:
- Ensure file is PDF format
- Check file size < 10MB
- Verify `multer.middleware.js` configuration

---

## 📝 Notes

- Always use HTTPS in production
- Rotate JWT_SECRET regularly
- Keep OpenAI API key safe
- Monitor MongoDB connection
- Use environment-specific configs
- Add logging for debugging
- Implement rate limiting for production

---

**Backend Version:** 1.0.0
**Last Updated:** December 2025

For issues or questions, check console logs and error messages for detailed information.
