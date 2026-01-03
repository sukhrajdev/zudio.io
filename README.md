# Resume Analyzer - Full Stack Application

A modern full-stack web application that helps users analyze and improve their resumes using AI-powered suggestions. Built with Node.js/Express backend and React frontend.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Frontend Components](#frontend-components)
- [Troubleshooting](#troubleshooting)
- [Deployment](#deployment)

---

## 🎯 Project Overview

Resume Analyzer is a comprehensive tool that:
- Allows users to create accounts and manage their profiles
- Enables users to upload PDF resumes
- Analyzes resumes using AI (OpenAI API)
- Provides intelligent suggestions for resume improvement
- Stores user data securely with JWT authentication

---

## ✨ Features

### Backend Features
- ✅ User Registration & Login (JWT-based authentication)
- ✅ Password Encryption with bcrypt
- ✅ PDF Resume Upload (Multer)
- ✅ AI-Powered Resume Analysis (OpenAI)
- ✅ User Profile Management (Update/Delete)
- ✅ MongoDB Database Integration
- ✅ CORS Support for Frontend Integration
- ✅ Error Handling & Validation

### Frontend Features
- ✅ Modern React UI with Routing
- ✅ User Authentication (Login/Register)
- ✅ Protected Routes
- ✅ Resume Upload Interface
- ✅ Analysis Results Display
- ✅ Responsive Design (Mobile-Friendly)
- ✅ Loading States & Error Handling
- ✅ Smooth Animations

---

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js v5.2.1
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **File Upload**: Multer
- **AI Integration**: OpenAI API
- **PDF Processing**: pdf-parse
- **Development**: Nodemon

### Frontend
- **UI Framework**: React 18.2.0
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Styling**: CSS3 (Flexbox, Grid, Animations)
- **Build Tool**: React Scripts

---

## 📁 Project Structure

```
Project 37/
│
├── backend/                          # Backend Node.js Application
│   ├── controllers/
│   │   ├── auth.controller.js       # Authentication logic
│   │   └── resume.controller.js     # Resume analysis logic
│   ├── models/
│   │   └── user.model.js            # User schema & methods
│   ├── routes/
│   │   └── auth.routes.js           # API routes
│   ├── middlewares/
│   │   ├── auth.middleware.js       # JWT verification
│   │   └── multer.middleware.js     # File upload config
│   ├── server.js                    # Express app setup
│   ├── .env                         # Environment variables
│   ├── package.json                 # Backend dependencies
│   └── package-lock.json
│
├── frontend/                         # React Frontend Application
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js            # Login page
│   │   │   ├── Register.js         # Registration page
│   │   │   ├── Dashboard.js        # Main dashboard
│   │   │   ├── Auth.css            # Auth pages styling
│   │   │   └── Dashboard.css       # Dashboard styling
│   │   ├── components/
│   │   │   └── ProtectedRoute.js   # Route protection
│   │   ├── App.js                  # Main app component
│   │   ├── App.css                 # App styling
│   │   ├── index.js                # React entry point
│   │   └── index.css               # Global styles
│   ├── public/
│   │   └── index.html              # HTML template
│   ├── package.json                # Frontend dependencies
│   └── README.md                   # Frontend documentation
│
├── node_modules/                    # Shared dependencies
├── public/                          # Static files
└── README.md                        # This file
```

---

## 📦 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** - Either:
  - Local MongoDB installation, or
  - MongoDB Atlas (Cloud) account
- **OpenAI API Key** - [Get here](https://platform.openai.com/api-keys)

### Verify Installation
```bash
node --version      # Should show v14+
npm --version       # Should show 7+
```

---

## 🚀 Installation & Setup

### Step 1: Clone or Download the Project

```bash
cd "c:\Users\Hp\Desktop\JAVA LEARN\Project 37"
```

### Step 2: Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

### Step 3: Frontend Setup

Navigate to the frontend directory:

```bash
cd ..\frontend
npm install --legacy-peer-deps
```

The `--legacy-peer-deps` flag is used due to React 18 peer dependency requirements.

---

## 🔑 Environment Variables

### Backend `.env` File

Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGO_URL=mongodb://localhost:27017/resume-analyzer
# For MongoDB Atlas:
# MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/resume-analyzer?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_min_32_characters_long

# OpenAI Configuration
OPENAI_API_KEY=sk-your-openai-api-key-here
```

### Important Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URL` | MongoDB connection string | `mongodb://localhost:27017/db` |
| `JWT_SECRET` | Secret key for JWT tokens | `mySecretKey123...` |
| `OPENAI_API_KEY` | OpenAI API key for resume analysis | `sk-...` |

---

## 🏃 Running the Application

### Option 1: Run Backend and Frontend Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Server running at http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# App opens at http://localhost:3000
```

### Option 2: Run Backend Only (if using existing frontend)

```bash
cd backend
npm start
```

Access the API at `http://localhost:5000/api`

### Option 3: Install Concurrently for Single Command

**In root directory:**
```bash
npm install -D concurrently
```

**Update package.json in root:**
```json
{
  "scripts": {
    "dev": "concurrently \"cd backend && npm start\" \"cd frontend && npm start\""
  }
}
```

**Run both together:**
```bash
npm run dev
```

---

## 📡 API Endpoints

### Authentication Endpoints

#### Register User
```
POST /api/register
Content-Type: application/json

Request Body:
{
  "username": "john_doe",
  "email": "john@gmail.com",
  "password": "password123"
}

Response (201):
{
  "message": "Account Created Successful!!",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Validation Rules:**
- Email must end with `@gmail.com`
- Password must be at least 8 characters
- Username is required

#### Login User
```
POST /api/login
Content-Type: application/json

Request Body:
{
  "email": "john@gmail.com",
  "password": "password123"
}

Response (200):
{
  "message": "Login Successful!",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user_id": "507f1f77bcf86cd799439011"
}
```

### Protected Endpoints (Require JWT Token)

#### Analyze Resume
```
POST /api/analyze
Content-Type: multipart/form-data
Authorization: Bearer <JWT_TOKEN>

Form Data:
- resume: <PDF_FILE>

Response (200):
{
  "suggestions": [
    "Add more quantifiable achievements",
    "Improve formatting and spacing",
    ...
  ]
}
```

#### Update User Profile
```
PUT /api/update
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>

Request Body (at least one field required):
{
  "username": "new_name",
  "email": "newemail@gmail.com",
  "password": "newpassword123"
}

Response (200):
{
  "message": "User updated successfully"
}
```

#### Delete User Account
```
DELETE /api/delete
Authorization: Bearer <JWT_TOKEN>

Response (200):
{
  "message": "User deleted successfully"
}
```

---

## 💾 Database Schema

### User Model

```javascript
{
  _id: ObjectId,
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: /.*@gmail\.com$/
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
- `generateToken()` - Creates JWT token
- `comparePassword(password)` - Compares passwords with bcrypt

---

## 🎨 Frontend Components

### Pages

#### 1. Login Page (`pages/Login.js`)
- Email and password input fields
- Password visibility toggle
- Error message display
- Link to registration page
- Secure authentication

#### 2. Register Page (`pages/Register.js`)
- Username, email, password inputs
- Password confirmation
- Form validation
- Error handling
- Link to login page

#### 3. Dashboard Page (`pages/Dashboard.js`)
- Header with logout button
- PDF file upload area
- File preview
- Resume analysis button
- Results display
- Protected route

### Components

#### ProtectedRoute (`components/ProtectedRoute.js`)
- Checks authentication status
- Redirects to login if not authenticated
- Wraps dashboard and other protected pages

---

## 🔧 Troubleshooting

### Common Issues & Solutions

#### 1. Port Already in Use
```bash
# For Windows - Find and kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or use a different port
PORT=5001 npm start
```

#### 2. MongoDB Connection Failed
```
Error: DataBase Connection is Failed
```

**Solutions:**
- Check MongoDB is running: `mongo --version`
- Verify `MONGO_URL` in `.env`
- For MongoDB Atlas, ensure IP whitelist includes your IP
- Check connection string syntax

#### 3. CORS Errors
```
Access to XMLHttpRequest blocked by CORS
```

**Solution:** Backend already has CORS enabled. If issue persists:
```javascript
// In backend server.js
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

#### 4. npm install Fails
```bash
# Clear npm cache
npm cache clean --force

# Try with legacy peer deps
npm install --legacy-peer-deps

# Or update npm
npm install -g npm@latest
```

#### 5. Module Not Found Errors
```bash
# Reinstall dependencies
rm -r node_modules
npm install --legacy-peer-deps
```

#### 6. Frontend Can't Connect to Backend
- Ensure backend is running on port 5000
- Check network tab in browser DevTools
- Verify `REACT_APP_API_URL` is correct
- Check firewall settings

### Enable Debug Mode

**Backend:**
```bash
DEBUG=* npm start
```

**Frontend (check browser console):**
- Open DevTools (F12)
- Go to Network tab
- Check API responses

---

## 📤 Deployment

### Backend Deployment (Heroku Example)

1. Install Heroku CLI
2. Create Heroku app: `heroku create resume-analyzer-api`
3. Set environment variables:
```bash
heroku config:set MONGO_URL=<mongodb_url>
heroku config:set JWT_SECRET=<your_secret>
heroku config:set OPENAI_API_KEY=<your_key>
```
4. Deploy: `git push heroku main`

### Frontend Deployment (Vercel Example)

1. Build the project:
```bash
cd frontend
npm run build
```

2. Deploy with Vercel:
```bash
npm i -g vercel
vercel
```

3. Update API URL in frontend to production backend URL

### Using MongoDB Atlas (Cloud)

1. Create free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string
3. Update `MONGO_URL` in `.env`:
```
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/resume-analyzer
```

---

## 📝 API Testing

### Using Postman

1. Import the API endpoints
2. Set variable `{{baseURL}}` = `http://localhost:5000`
3. For protected endpoints, add header:
   ```
   Authorization: Bearer <token_from_login>
   ```

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@gmail.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@gmail.com","password":"password123"}'

# Analyze Resume
curl -X POST http://localhost:5000/api/analyze \
  -H "Authorization: Bearer <token>" \
  -F "resume=@resume.pdf"
```

---

## 🎓 Learning Resources

- [Express.js Docs](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [JWT.io](https://jwt.io/)
- [OpenAI API](https://platform.openai.com/docs/)

---

## 📄 License

This project is licensed under the ISC License.

---

## 👥 Support & Contribution

For issues, questions, or contributions:
1. Check the Troubleshooting section
2. Review console logs in browser (DevTools)
3. Check server logs in terminal
4. Ensure all environment variables are set correctly

---

## 🔐 Security Notes

⚠️ **Important for Production:**
- Never commit `.env` file to version control
- Use strong JWT secrets (min 32 characters)
- Keep OpenAI API key private
- Use HTTPS in production
- Implement rate limiting
- Add input validation
- Use environment-specific configurations

---

**Last Updated:** December 2025
**Version:** 1.0.0

Happy analyzing! 🚀
