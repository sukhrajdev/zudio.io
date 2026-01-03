# 🎨 Project Architecture & Visual Guide

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        RESUME ANALYZER                           │
│                    Full Stack Application                        │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────┐         ┌──────────────────────┐
│   FRONTEND (React)   │         │   BACKEND (Node.js)  │
│                      │         │                      │
│  http://localhost:3000      http://localhost:5000    │
│                      │         │                      │
│  ┌─────────────────┐ │         │  ┌─────────────────┐│
│  │ Login Page      │ │         │  │ Auth Routes     ││
│  │ Register Page   │◄──────────┤─►│ /register       ││
│  │ Dashboard       │ │  HTTP   │  │ /login          ││
│  │ Protected Route │ │  REST   │  │ /update         ││
│  │                 │ │  API    │  │ /delete         ││
│  │ Features:       │ │  JWT    │  │ /analyze        ││
│  │ • Login/Signup  │ │         │  └─────────────────┘│
│  │ • Upload PDF    │ │         │                     │
│  │ • View Results  │ │         │  ┌─────────────────┐│
│  │ • Responsive UI │ │         │  │ Controllers     ││
│  │                 │ │         │  │ • auth.js       ││
│  │ Tech:           │ │         │  │ • resume.js     ││
│  │ • React         │ │         │  │                 ││
│  │ • Router DOM    │ │         │  │ Middlewares     ││
│  │ • Axios         │ │         │  │ • JWT verify    ││
│  │ • React Icons   │ │         │  │ • File upload   ││
│  │ • CSS3          │ │         │  └─────────────────┘│
│  └─────────────────┘ │         │                     │
│                      │         │  ┌─────────────────┐│
│                      │         │  │ Database Models ││
│                      │         │  │ • User Schema   ││
│                      │         │  └─────────────────┘│
│                      │         │                     │
│                      │         │  ┌─────────────────┐│
│                      │         │  │ External APIs   ││
│                      │         │  │ • OpenAI        ││
│                      │         │  │ • PDF Parse     ││
│                      │         │  └─────────────────┘│
└──────────────────────┘         └──────────────────────┘
         │                                    │
         │                                    │
         ▼                                    ▼
    Browser Storage                  ┌─────────────────┐
    • Token (JWT)                    │  MongoDB        │
    • User ID                        │                 │
    • Session                        │  Collections:   │
                                     │  • users        │
                                     │                 │
                                     │  Indexes:       │
                                     │  • email        │
                                     └─────────────────┘
```

---

## Data Flow Diagrams

### 1. Authentication Flow

```
┌────────────────┐
│  User Input    │
│ Email/Password │
└────────┬───────┘
         │
         ▼
    ┌─────────────────────┐
    │  Frontend React Form │
    │  Validation         │
    └──────────┬──────────┘
               │
               ▼
    ┌──────────────────────────┐
    │ Axios HTTP Request       │
    │ POST /api/login          │
    │ JSON Body                │
    └──────────┬───────────────┘
               │
               ▼ (Network)
    ┌──────────────────────────┐
    │ Express Middleware       │
    │ • CORS                   │
    │ • JSON Parser            │
    └──────────┬───────────────┘
               │
               ▼
    ┌──────────────────────────┐
    │ Auth Controller          │
    │ loginUser() function     │
    │ • Find user in DB       │
    │ • Verify password       │
    └──────────┬───────────────┘
               │
               ▼
    ┌──────────────────────────┐
    │ Generate JWT Token       │
    │ user.generateToken()     │
    └──────────┬───────────────┘
               │
               ▼
    ┌──────────────────────────┐
    │ Send Response            │
    │ {                        │
    │   token: "eyJ...",       │
    │   user_id: "507f..."     │
    │ }                        │
    └──────────┬───────────────┘
               │
               ▼ (Network)
    ┌──────────────────────────┐
    │ Frontend Receives        │
    │ Response                 │
    │ • Save token            │
    │ • Save user_id          │
    │ • localStorage.setItem() │
    └──────────┬───────────────┘
               │
               ▼
    ┌──────────────────────────┐
    │ Navigate to Dashboard    │
    │ useNavigate('/dashboard')│
    └──────────────────────────┘
```

### 2. Resume Upload & Analysis Flow

```
┌─────────────────────┐
│  User Selects PDF   │
│  file input change  │
└──────────┬──────────┘
           │
           ▼
    ┌─────────────────────┐
    │ Frontend Validates  │
    │ • File type (PDF)   │
    │ • File size         │
    └──────────┬──────────┘
               │
               ▼
    ┌─────────────────────┐
    │ User Clicks Analyze │
    │ handleUpload()      │
    └──────────┬──────────┘
               │
               ▼
    ┌──────────────────────────────┐
    │ FormData with File           │
    │ • File buffer                │
    │ + JWT Token                  │
    │ + Authorization Header       │
    └──────────┬───────────────────┘
               │
               ▼ (Network)
    ┌──────────────────────────────┐
    │ Backend Middleware           │
    │ • verifyJWT() - Check token  │
    │ • multer.single() - Get file │
    └──────────┬───────────────────┘
               │
               ▼
    ┌──────────────────────────────┐
    │ Resume Controller            │
    │ getResponse()                │
    │ • PDF Parse - Extract text   │
    └──────────┬───────────────────┘
               │
               ▼
    ┌──────────────────────────────┐
    │ OpenAI API Call              │
    │ • Send extracted text        │
    │ • Get analysis               │
    │ • Extract suggestions        │
    └──────────┬───────────────────┘
               │
               ▼
    ┌──────────────────────────────┐
    │ Send Response                │
    │ {                            │
    │   suggestions: [...]         │
    │ }                            │
    └──────────┬───────────────────┘
               │
               ▼ (Network)
    ┌──────────────────────────────┐
    │ Frontend Receives            │
    │ setAnalysis(data)            │
    │ Display suggestions          │
    └──────────────────────────────┘
```

---

## Database Schema

```
MongoDB - resume-analyzer Database
│
└─── users (Collection)
     │
     └─── Document Example:
          {
            "_id": ObjectId("507f1f77bcf86cd799439011"),
            "username": "john_doe",
            "email": "john@gmail.com",
            "password": "$2b$10$... (hashed)",
            "createdAt": ISODate("2025-12-21T10:30:00.000Z"),
            "__v": 0
          }
     
     Indexes:
     • _id (Primary)
     • email (Unique)
     
     Methods:
     • generateToken() -> JWT String
     • comparePassword(pwd) -> Boolean
```

---

## Component Tree

```
App.js
│
├─ Router
│  │
│  ├─ Route: /login
│  │  └─ Login.js
│  │     ├─ Form Input
│  │     ├─ Password Toggle
│  │     ├─ Submit Button
│  │     └─ Link to Register
│  │
│  ├─ Route: /register
│  │  └─ Register.js
│  │     ├─ Form Input (username, email, password)
│  │     ├─ Password Confirm
│  │     ├─ Submit Button
│  │     └─ Link to Login
│  │
│  ├─ Route: /dashboard
│  │  └─ ProtectedRoute
│  │     └─ Dashboard.js
│  │        ├─ Header
│  │        │  ├─ Title
│  │        │  └─ Logout Button
│  │        ├─ Upload Section
│  │        │  ├─ File Input
│  │        │  ├─ File Preview
│  │        │  └─ Analyze Button
│  │        └─ Results Section
│  │           └─ Suggestions List
│  │
│  └─ Route: / (redirect to dashboard)
```

---

## API Request/Response Examples

### Login Request/Response

```
REQUEST:
────────
POST /api/login HTTP/1.1
Host: localhost:5000
Content-Type: application/json

{
  "email": "user@gmail.com",
  "password": "password123"
}


RESPONSE (200 OK):
──────────────────
{
  "message": "Login Successful!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTEiLCJpYXQiOjE3MDMxNjEwMjEsImV4cCI6MTcwMzc2NjAyMX0.xxx",
  "user_id": "507f1f77bcf86cd799439011"
}
```

### Analyze Resume Request/Response

```
REQUEST:
────────
POST /api/analyze HTTP/1.1
Host: localhost:5000
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: multipart/form-data

[Binary PDF file data]


RESPONSE (200 OK):
──────────────────
{
  "suggestions": [
    "Add quantifiable metrics to your achievements",
    "Use action verbs to start bullet points",
    "Include relevant keywords for your target role",
    "Improve the formatting and spacing",
    "Add a professional summary at the top"
  ]
}
```

---

## Technology Stack Layers

```
┌─────────────────────────────────────────┐
│         PRESENTATION LAYER              │
│  React Components, HTML, CSS, Animations│
│                                         │
│  Pages: Login, Register, Dashboard      │
│  Components: ProtectedRoute             │
│  Styling: CSS3, Flexbox, Grid           │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│        BUSINESS LOGIC LAYER             │
│  React Hooks, State Management          │
│                                         │
│  • Form Validation                      │
│  • API Call Logic                       │
│  • Auth State Management                │
│  • File Upload Handling                 │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│      COMMUNICATION LAYER (API)          │
│  HTTP/REST, Axios, JSON                 │
│                                         │
│  Frontend ◄─────────► Backend           │
│  Port 3000            Port 5000         │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│         APPLICATION LAYER               │
│  Express.js, Routing, Controllers       │
│                                         │
│  • Route Handlers                       │
│  • Middleware Processing                │
│  • Business Logic                       │
│  • Request Validation                   │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│         DATA LAYER                      │
│  Mongoose ODM, MongoDB                  │
│                                         │
│  • User Model                           │
│  • Database Operations                  │
│  • Schema Definition                    │
│  • Data Validation                      │
└─────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│     EXTERNAL SERVICES LAYER             │
│  OpenAI, PDF Processing                 │
│                                         │
│  • Resume Analysis (OpenAI)             │
│  • PDF Text Extraction                  │
└─────────────────────────────────────────┘
```

---

## Deployment Architecture

```
PRODUCTION ENVIRONMENT

┌────────────────────────────────────────────────────────┐
│              CLOUD DEPLOYMENT                          │
│                                                        │
│  ┌──────────────────┐        ┌──────────────────┐   │
│  │  Frontend        │        │  Backend         │   │
│  │  (Vercel/Netlify)│        │  (Heroku/AWS)    │   │
│  │                  │        │                  │   │
│  │ Build: npm build │        │ Node.js Server   │   │
│  │ Deploy: Static   │◄─────►│ Port 5000        │   │
│  │ CDN: Global      │  REST   │ Express API      │   │
│  │ Domain: custom   │  API    │                  │   │
│  └──────────────────┘        └────────┬─────────┘   │
│                                       │               │
│                         ┌─────────────▼──────────┐   │
│                         │  MongoDB Atlas         │   │
│                         │  Cloud Database        │   │
│                         │  Replicas & Backups    │   │
│                         └────────────────────────┘   │
│                                                       │
│                    ┌──────────────────┐             │
│                    │  OpenAI API      │             │
│                    │  External Service│             │
│                    └──────────────────┘             │
└────────────────────────────────────────────────────────┘
```

---

## Authentication Flow Diagram

```
Session Management with JWT

┌─────────────────────────────────────────────────┐
│  Browser (localStorage)                         │
│  {                                              │
│    "authToken": "eyJhbGci...",                 │
│    "userId": "507f1f77bcf86cd799439011"        │
│  }                                              │
└────────────┬────────────────────────────────────┘
             │
             │ JWT Token included in Header
             │ Authorization: Bearer <token>
             │
             ▼
┌─────────────────────────────────────────────────┐
│  Backend Middleware (auth.middleware.js)        │
│                                                 │
│  1. Extract token from header                  │
│  2. Verify token signature (using JWT_SECRET) │
│  3. Decode token to get userId                │
│  4. Attach user object to request             │
│  5. Pass to next middleware                   │
└────────────┬────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────┐
│  Protected Route Handler                        │
│  req.user now available for use               │
│  Execute business logic                        │
└─────────────────────────────────────────────────┘

Token Expiry: 7 days
New Token needed: Re-login required
```

---

## File Upload Flow

```
User selects PDF
       │
       ▼
FormData object created
  • resume: File
       │
       ▼
Frontend sends POST /api/analyze
  • Headers: Authorization: Bearer <token>
  • Body: FormData
       │
       ▼
Backend Middleware Chain:
  ① CORS - Allow request
  ② JSON Parser - (not used here)
  ③ Multer - Extract file from FormData
       │
       ▼
JWT Verification Middleware:
  • Verify token in header
  • Extract user info
       │
       ▼
Controller Function:
  ① Read file from req.file.buffer
  ② Extract text using pdf-parse
  ③ Send text to OpenAI API
  ④ Get suggestions
  ⑤ Return response
       │
       ▼
Frontend receives suggestions
  • Display in UI
  • Show to user
```

---

## Error Handling Flow

```
Error Occurs
    │
    ├─ Validation Error
    │  └─► 400 Bad Request
    │
    ├─ Authentication Error
    │  └─► 401 Unauthorized
    │
    ├─ Already Exists Error
    │  └─► 409 Conflict
    │
    ├─ Data Format Error
    │  └─► 422 Unprocessable Entity
    │
    ├─ Server Error
    │  └─► 500 Internal Server Error
    │
    └─ Network Error
       └─► Frontend catches (catch block)
           └─► Display user-friendly message

Frontend Error Handling:
  • try/catch block
  • Set error state
  • Display error to user
  • Log to console for debugging
```

---

## Key Interactions

### 1. User Registration
```
User Form → Validation → API Call → Database Save → Token → Redirect
```

### 2. User Login
```
Credentials → Validation → DB Find → Password Compare → Token → Storage → Redirect
```

### 3. Resume Analysis
```
PDF Select → Upload → Parse → Extract Text → OpenAI → Get Suggestions → Display
```

### 4. Protected Route Access
```
Request → Check Token → Verify JWT → Attach User → Allow Access → Execute Logic
```

---

## Performance Considerations

```
Frontend Optimization:
• Lazy loading of routes
• Code splitting
• CSS minification
• Image optimization
• Caching strategies

Backend Optimization:
• Request validation early
• Connection pooling
• Database indexes
• Error handling
• Middleware order

Database Optimization:
• Index on email (unique)
• Connection pooling
• Query optimization
• Backup strategy
```

---

**This visual guide helps understand the complete architecture of Resume Analyzer!**

Last Updated: December 2025

