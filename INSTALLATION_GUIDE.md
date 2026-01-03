# Complete Installation & Setup Guide

This guide provides step-by-step instructions to get the Resume Analyzer application running on your system.

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- [ ] Node.js v14+ installed ([Download](https://nodejs.org/))
- [ ] npm v7+ installed (comes with Node.js)
- [ ] MongoDB installed or MongoDB Atlas account ([Create free account](https://www.mongodb.com/cloud/atlas))
- [ ] OpenAI API key ([Get here](https://platform.openai.com/api-keys))
- [ ] Text editor (VS Code recommended)

---

## 🔧 Installation Steps

### Step 1: Verify Node.js Installation

Open PowerShell or Command Prompt and run:

```powershell
node --version
npm --version
```

Both should show version numbers (v14+ for Node, v7+ for npm).

---

### Step 2: Project Structure Overview

Your project should look like:

```
Project 37/
├── backend/                    # Backend API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── server.js
│   ├── .env
│   ├── package.json
│   └── README.md
├── frontend/                   # React App
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
├── README.md                   # Main documentation
└── SETUP_GUIDE.md             # This file
```

---

### Step 3: Setup Backend

#### 3.1 Navigate to Backend Directory

```powershell
cd "c:\Users\Hp\Desktop\JAVA LEARN\Project 37\backend"
```

#### 3.2 Create Environment File

Create a `.env` file in the backend directory with:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGO_URL=mongodb://localhost:27017/resume-analyzer

# JWT Configuration
JWT_SECRET=your_secret_key_here_min_32_characters_long_for_security

# OpenAI API Key
OPENAI_API_KEY=sk-your-api-key-here
```

**Important:**
- Replace `your_secret_key_here` with a strong random string (32+ chars)
- Get OpenAI API key from [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)

#### 3.3 Install Backend Dependencies

```powershell
npm install
```

This will install all packages from `package.json`:
- express, mongoose, bcrypt, jsonwebtoken, multer, openai, pdf-parse, cors, dotenv, nodemon

Wait for installation to complete (2-5 minutes depending on internet speed).

#### 3.4 Verify Backend Setup

```powershell
npm start
```

You should see:
```
DataBase Was Connected Successful!!
Server was running
Link: http://localhost:5000
```

**Note:** Keep this terminal open with the server running.

---

### Step 4: Setup MongoDB

#### Option A: Local MongoDB

1. Install MongoDB from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   - Windows: Services app → MongoDB Server
   - Or run: `mongod` in a new terminal

#### Option B: MongoDB Atlas (Cloud)

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create a cluster (free tier available)
4. Get connection string
5. Update `.env`:
```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/resume-analyzer
```

---

### Step 5: Setup Frontend

#### 5.1 Open New Terminal/PowerShell Window

**Don't close the backend terminal!** Open a new one:

```powershell
# Navigate to frontend
cd "c:\Users\Hp\Desktop\JAVA LEARN\Project 37\frontend"
```

#### 5.2 Install Frontend Dependencies

```powershell
npm install --legacy-peer-deps
```

The `--legacy-peer-deps` flag handles React 18 compatibility issues.

Wait for installation to complete (3-5 minutes).

#### 5.3 Start Frontend Development Server

```powershell
npm start
```

The React app will automatically open in your browser at `http://localhost:3000`.

---

## ✅ Verification Checklist

### Backend Running?

```powershell
curl http://localhost:5000/api/login
```

Should return an error (expected - missing credentials), not "connection refused"

### Frontend Running?

- Browser automatically opens
- See login page with "Resume Analyzer" title
- No console errors in browser DevTools (F12)

### Database Connected?

Backend terminal shows:
```
DataBase Was Connected Successful!!
```

---

## 🧪 Testing the Application

### 1. Create an Account

1. Go to `http://localhost:3000`
2. Click "Sign up"
3. Fill in:
   - Username: `testuser`
   - Email: `test@gmail.com`
   - Password: `TestPass123` (min 8 chars)
   - Confirm: `TestPass123`
4. Click "Sign Up"

Expected: Logged in, redirected to dashboard

### 2. Upload a Resume

1. On dashboard, click "Choose PDF File"
2. Select a PDF file from your computer
3. Click "Analyze Resume"
4. Wait for analysis results

Expected: Shows suggestions for resume improvement

### 3. Logout

1. Click "Logout" button
2. Should redirect to login page

---

## 🚀 Different Ways to Run

### Method 1: Two Separate Terminals (Recommended for Development)

**Terminal 1:**
```powershell
cd "c:\Users\Hp\Desktop\JAVA LEARN\Project 37\backend"
npm start
```

**Terminal 2:**
```powershell
cd "c:\Users\Hp\Desktop\JAVA LEARN\Project 37\frontend"
npm start
```

### Method 2: Using Concurrently (Single Terminal)

In the root `Project 37` directory:

```powershell
npm install -D concurrently
```

Add to package.json in root:
```json
{
  "scripts": {
    "dev": "concurrently \"cd backend && npm start\" \"cd frontend && npm start\""
  }
}
```

Then run:
```powershell
npm run dev
```

---

## 🔧 Common Issues & Solutions

### Issue: Port Already in Use

**Error:** `listen EADDRINUSE: address already in use :::5000`

**Solution 1: Kill existing process**
```powershell
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Solution 2: Use different port**
```powershell
# In .env
PORT=5001
# Then restart backend
```

---

### Issue: npm install fails

**Error:** `ERR! code ERESOLVE could not resolve dependencies`

**Solution:**
```powershell
npm install --legacy-peer-deps
```

Or clear cache:
```powershell
npm cache clean --force
npm install --legacy-peer-deps
```

---

### Issue: MongoDB Connection Failed

**Error:** `DataBase Connection is Failed`

**Solutions:**

1. **Local MongoDB not running:**
   - Start MongoDB: `mongod`
   - Or check Services app (Windows)

2. **Wrong connection string:**
   - Check `.env` MONGO_URL
   - Verify MongoDB is listening on port 27017

3. **MongoDB Atlas issues:**
   - Add your IP to whitelist in Atlas
   - Check username/password in connection string
   - Ensure cluster is running

---

### Issue: Frontend Can't Connect to Backend

**Error:** In browser console: `Network Error: Failed to connect`

**Solutions:**

1. **Verify backend is running:**
   - Check backend terminal
   - Should see "Server was running"

2. **Check port 5000:**
   ```powershell
   curl http://localhost:5000
   ```

3. **Check firewall:**
   - Windows Defender may block port 5000
   - Add exception in firewall settings

---

### Issue: npm start hangs or takes too long

**Solution:**
```powershell
# Kill existing node processes
taskkill /F /IM node.exe

# Clear npm cache
npm cache clean --force

# Try again
npm start
```

---

## 📁 File Locations Reference

| File | Location |
|------|----------|
| Backend server | `backend/server.js` |
| Environment (Backend) | `backend/.env` |
| Frontend main | `frontend/src/App.js` |
| Backend routes | `backend/routes/auth.routes.js` |
| User model | `backend/models/user.model.js` |
| Login page | `frontend/src/pages/Login.js` |
| Dashboard page | `frontend/src/pages/Dashboard.js` |

---

## 🌐 URLs Reference

| App | URL | Port |
|-----|-----|------|
| Frontend | http://localhost:3000 | 3000 |
| Backend API | http://localhost:5000 | 5000 |
| API Routes | http://localhost:5000/api | 5000 |

---

## 📚 Additional Resources

### Official Documentation
- [Node.js Docs](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [React Official Docs](https://react.dev/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)

### API Testing
- [Postman](https://www.postman.com/) - API testing tool
- [Insomnia](https://insomnia.rest/) - REST client
- Browser DevTools (F12) - Network inspection

### Learning
- [freeCodeCamp JavaScript](https://www.freecodecamp.org/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Udemy React Courses](https://www.udemy.com/courses/search/?q=react)

---

## 🔐 Security Tips

⚠️ **Before Production:**

1. **Change default values:**
   ```env
   JWT_SECRET=use_a_very_long_random_string_here
   ```

2. **Update MongoDB:**
   - Set strong password
   - Whitelist specific IPs
   - Enable authentication

3. **Environment:**
   - Use `.env.local` for secrets
   - Never commit `.env` to git
   - Use different keys for prod/dev

4. **API Keys:**
   - Keep OpenAI key private
   - Rotate regularly
   - Monitor usage

---

## 📞 Getting Help

If you encounter issues:

1. **Check console logs:**
   - Backend: Look at terminal output
   - Frontend: Press F12 → Console tab

2. **Read error messages carefully:**
   - They often indicate exact problem
   - Search error online

3. **Verify setup:**
   - Run verification checklist above
   - Ensure all prerequisites installed

4. **Check port availability:**
   ```powershell
   netstat -ano | findstr :3000
   netstat -ano | findstr :5000
   ```

---

## ✨ Next Steps

### After successful setup:

1. **Customize styling:**
   - Edit CSS files in `frontend/src/`
   - Change color scheme
   - Modify fonts and layout

2. **Add features:**
   - Create new pages
   - Add more API endpoints
   - Implement user profile page

3. **Improve functionality:**
   - Better error messages
   - Loading animations
   - Search/filter functionality

4. **Deploy:**
   - Frontend to Vercel/Netlify
   - Backend to Heroku/AWS

---

## 📋 Quick Reference Commands

```powershell
# Backend commands
cd backend
npm install                    # Install dependencies
npm start                      # Start server (development)
npm run build                  # Build for production

# Frontend commands
cd frontend
npm install --legacy-peer-deps # Install dependencies
npm start                      # Start dev server
npm run build                  # Create production build
npm test                       # Run tests

# Utility commands
node --version                 # Check Node.js version
npm --version                  # Check npm version
npm cache clean --force        # Clear npm cache
npm audit                      # Check for vulnerabilities
```

---

## 🎉 Success Indicators

When everything is working correctly, you should see:

✅ Backend terminal shows: "Server was running"
✅ Frontend opens automatically at http://localhost:3000
✅ Can register new user
✅ Can login with credentials
✅ Can upload PDF and get analysis
✅ No errors in browser console
✅ No errors in backend terminal

---

**Congratulations! Your Resume Analyzer is ready to use!** 🚀

For detailed information, see:
- `/README.md` - Main project documentation
- `/backend/README.md` - Backend API documentation
- `/frontend/README.md` - Frontend documentation

