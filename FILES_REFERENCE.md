# 📂 Key Files Reference

Quick reference to important files in your Resume Analyzer project.

---

## 📄 Root Documentation Files

```
Project 37/
├── README.md ⭐ START HERE - Complete project guide
├── COMPLETION_SUMMARY.md - What was delivered
├── INSTALLATION_GUIDE.md - Step-by-step setup
├── PROJECT_SUMMARY.md - Quick reference
├── ARCHITECTURE.md - System design & diagrams
├── INDEX.md - Documentation navigation
└── SETUP_GUIDE.md - Alternative setup guide
```

---

## 🏗️ Backend Files (Node.js/Express)

### Main Files
```
backend/
├── server.js ⭐ Express server entry point
├── package.json - Backend dependencies
├── .env - Configuration (CREATE THIS!)
└── README.md - Backend API documentation
```

### Controllers (Business Logic)
```
backend/controllers/
├── auth.controller.js - User registration & login
└── resume.controller.js - Resume analysis logic
```

### Models (Database)
```
backend/models/
└── user.model.js - User schema & methods
```

### Routes (API Endpoints)
```
backend/routes/
└── auth.routes.js - All API routes
```

### Middlewares
```
backend/middlewares/
├── auth.middleware.js - JWT verification
└── multer.middleware.js - File upload handling
```

---

## ⚛️ Frontend Files (React)

### Entry Points
```
frontend/
├── public/index.html - HTML template
├── src/index.js - React entry point
└── package.json - Frontend dependencies
```

### Main App
```
frontend/src/
├── App.js ⭐ Main React component
├── App.css - App styling
├── index.css - Global styles
└── README.md - Frontend documentation
```

### Pages (Components)
```
frontend/src/pages/
├── Login.js - Login page
├── Register.js - Registration page
├── Dashboard.js - Main dashboard
├── Auth.css - Login/Register styling
└── Dashboard.css - Dashboard styling
```

### Components
```
frontend/src/components/
└── ProtectedRoute.js - Route protection wrapper
```

---

## 🔑 Critical Configuration Files

### Backend Configuration
**Location:** `backend/.env`

**Must Create This File!**

```env
PORT=5000
NODE_ENV=development
MONGO_URL=mongodb://localhost:27017/resume-analyzer
JWT_SECRET=your_super_secret_key_min_32_chars_long
OPENAI_API_KEY=sk-your-api-key-from-openai
```

### Frontend Configuration (Optional)
**Location:** `frontend/.env`

```env
REACT_APP_API_URL=http://localhost:5000
```

### Package Files
- `backend/package.json` - Backend dependencies
- `frontend/package.json` - Frontend dependencies

---

## 📊 Project Statistics

### Documentation
- **7 major guides** (~40,000 words)
- **API documentation** (5 endpoints)
- **Architecture diagrams**
- **Troubleshooting guides**

### Backend
- **2 controllers** (auth, resume)
- **1 model** (user)
- **1 route file** (5 endpoints)
- **2 middlewares** (JWT, file upload)
- **Main server file**

### Frontend
- **3 pages** (Login, Register, Dashboard)
- **1 route protection** (ProtectedRoute)
- **4 CSS files** (styling)
- **Fully responsive UI**

### Total Files
- **15+ source code files**
- **7+ documentation files**
- **3+ configuration files**

---

## 🎯 File Purpose Quick Guide

| File | Purpose | Edit? |
|------|---------|-------|
| server.js | Backend entry point | No |
| auth.controller.js | Authentication logic | Yes* |
| user.model.js | User database | No |
| auth.middleware.js | JWT verification | No |
| multer.middleware.js | File upload | No |
| App.js | React main component | Yes* |
| Login.js | Login page | Yes* |
| Register.js | Register page | Yes* |
| Dashboard.js | Dashboard page | Yes* |
| *.css | Styling | Yes* |
| .env | Configuration | Yes! |
| README.md files | Documentation | No |

\* = Safe to modify for customization

---

## 🚀 Which File Should I Edit?

### To Change Colors/Styling
Edit CSS files in `frontend/src/`:
- `pages/Auth.css` - Login/Register styling
- `pages/Dashboard.css` - Dashboard styling
- `App.css` - App wrapper styling
- `index.css` - Global styling

### To Change Form Fields
Edit page components:
- `pages/Login.js` - Add/modify login fields
- `pages/Register.js` - Add/modify register fields
- `pages/Dashboard.js` - Modify resume upload

### To Change API Behavior
Edit backend controllers:
- `controllers/auth.controller.js` - Auth logic
- `controllers/resume.controller.js` - Analysis logic

### To Add New Endpoints
Edit:
- `routes/auth.routes.js` - Add new routes
- Create new controller file
- Add new middleware if needed

### To Change Database
Edit:
- `models/user.model.js` - User schema

### To Change Configuration
Edit:
- `backend/.env` - Environment variables

---

## 📖 File Dependencies

```
server.js
  ├─ routes/auth.routes.js
  │  ├─ controllers/auth.controller.js
  │  │  └─ models/user.model.js
  │  ├─ controllers/resume.controller.js
  │  ├─ middlewares/auth.middleware.js
  │  └─ middlewares/multer.middleware.js
  └─ .env

App.js
  ├─ pages/Login.js
  ├─ pages/Register.js
  ├─ pages/Dashboard.js
  ├─ components/ProtectedRoute.js
  └─ CSS files
```

---

## 🔍 Finding Things

### Where are the API endpoints?
`backend/routes/auth.routes.js`

### Where is user authentication?
`backend/controllers/auth.controller.js`

### Where is resume analysis?
`backend/controllers/resume.controller.js`

### Where is the login page?
`frontend/src/pages/Login.js`

### Where is the dashboard?
`frontend/src/pages/Dashboard.js`

### Where are environment variables?
`backend/.env` (you need to create this)

### Where is styling?
`frontend/src/pages/*.css` and `frontend/src/*.css`

### Where is database schema?
`backend/models/user.model.js`

### Where are JWT tokens handled?
`backend/middlewares/auth.middleware.js`

### Where is file upload configured?
`backend/middlewares/multer.middleware.js`

---

## ✅ File Checklist

Before running the app:

- [ ] Created `backend/.env` file
- [ ] Added MongoDB URL to `.env`
- [ ] Added OpenAI API key to `.env`
- [ ] Set strong JWT_SECRET in `.env`
- [ ] Backend files are in `backend/` folder
- [ ] Frontend files are in `frontend/` folder
- [ ] `package.json` exists in both folders

---

## 📋 File Size Summary

| Component | Approx. Size | Files |
|-----------|--------------|-------|
| Backend Code | ~500 KB | 5 |
| Frontend Code | ~300 KB | 8 |
| Documentation | ~2 MB | 7 |
| Dependencies | ~500 MB | Many |
| **Total (w/o node_modules)** | **~2.8 MB** | **20** |

---

## 🎨 Customization Files

Most likely to edit for customization:

1. **Styling** - CSS files
   - `frontend/src/pages/Auth.css`
   - `frontend/src/pages/Dashboard.css`

2. **Content** - Page files
   - `frontend/src/pages/Login.js`
   - `frontend/src/pages/Register.js`
   - `frontend/src/pages/Dashboard.js`

3. **Configuration** - Environment file
   - `backend/.env`

---

## 🔐 Don't Edit These

Files you shouldn't modify (unless you know what you're doing):

- ❌ `server.js` - Core Express setup
- ❌ `package.json` - Dependency management
- ❌ Authentication controllers - Core logic
- ❌ Middleware files - Core functionality
- ❌ Model files - Database schema
- ❌ README files - Documentation

---

## 📍 Important Locations

```
Windows Path: c:\Users\Hp\Desktop\JAVA LEARN\Project 37\

Key Folders:
• backend/ - All backend code
• frontend/ - All frontend code
• frontend/src/ - React source files
• frontend/src/pages/ - Page components
• frontend/src/components/ - React components
```

---

## 🚀 Quick File Reference

### To Run the App
1. Check `backend/.env` exists
2. Run `npm start` in `backend/`
3. Run `npm start` in `frontend/`

### To Add a Feature
1. Create backend endpoint in `routes/`
2. Create controller in `controllers/`
3. Create frontend component in `pages/` or `components/`
4. Create styling in CSS files

### To Deploy
1. Build: `npm run build` in `frontend/`
2. Push to GitHub
3. Deploy backend to Heroku/AWS
4. Deploy frontend to Vercel/Netlify
5. Update `.env` for production

---

**For detailed information about any file, check the README.md files in each folder!**

Last Updated: December 21, 2025

