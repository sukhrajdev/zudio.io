# Resume Analyzer - Frontend

Modern React frontend for the Resume Analyzer application. Provides user-friendly interface for authentication, resume upload, and AI-powered analysis.

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Features](#features)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Pages & Components](#pages--components)
- [API Integration](#api-integration)
- [Styling](#styling)
- [Environment Variables](#environment-variables)
- [Building & Deployment](#building--deployment)
- [Troubleshooting](#troubleshooting)
- [Browser Support](#browser-support)

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm start

# App opens at http://localhost:3000
```

---

## ✨ Features

### Authentication
- ✅ User Registration with validation
- ✅ Secure Login with JWT
- ✅ Password visibility toggle
- ✅ Error message display
- ✅ Account creation flow

### Resume Management
- ✅ PDF file upload
- ✅ File type validation
- ✅ File preview
- ✅ Resume analysis
- ✅ Results display
- ✅ Loading states

### UI/UX
- ✅ Modern gradient design
- ✅ Smooth animations
- ✅ Responsive layout (mobile-friendly)
- ✅ Form validation
- ✅ Error handling
- ✅ Loading indicators
- ✅ Protected routes

---

## 📦 Installation

### Prerequisites

- **Node.js** v14 or higher - [Download](https://nodejs.org/)
- **npm** v7 or higher (comes with Node.js)
- Backend API running on `http://localhost:5000`

### Verify Installation

```bash
node --version     # Should show v14+
npm --version      # Should show v7+
```

### Install Frontend

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

The `--legacy-peer-deps` flag is necessary due to React 18 peer dependency requirements.

---

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html                 # HTML template
├── src/
│   ├── pages/
│   │   ├── Login.js              # Login page component
│   │   ├── Login.css             # Login styling
│   │   ├── Register.js           # Registration page component
│   │   ├── Register.css          # (Combined in Auth.css)
│   │   ├── Dashboard.js          # Main dashboard component
│   │   ├── Dashboard.css         # Dashboard styling
│   │   └── Auth.css              # Shared auth styles
│   ├── components/
│   │   └── ProtectedRoute.js     # Route protection wrapper
│   ├── App.js                    # Main app component
│   ├── App.css                   # App styling
│   ├── index.js                  # React entry point
│   └── index.css                 # Global styles
├── .gitignore                    # Git ignore rules
├── package.json                  # Dependencies & scripts
└── README.md                     # This file
```

---

## 🎨 Pages & Components

### Pages

#### 1. Login Page (`pages/Login.js`)

**Purpose:** User authentication

**Features:**
- Email input field
- Password input with visibility toggle
- Login button
- Link to registration page
- Error message display
- Loading state

**Form Validation:**
- Email required
- Password required
- Minimum password length: 8 characters

**API Call:**
```javascript
POST /api/login
{
  "email": "user@gmail.com",
  "password": "password123"
}
```

**Styling:** `pages/Auth.css`

---

#### 2. Register Page (`pages/Register.js`)

**Purpose:** New user account creation

**Features:**
- Username input
- Email input
- Password input with visibility toggle
- Password confirmation field
- Password match validation
- Register button
- Link to login page
- Error message display

**Form Validation:**
- Username required
- Email required (must be Gmail)
- Password minimum 8 characters
- Password confirmation must match
- Email format validation

**API Call:**
```javascript
POST /api/register
{
  "username": "john_doe",
  "email": "user@gmail.com",
  "password": "password123"
}
```

**Styling:** `pages/Auth.css`

---

#### 3. Dashboard Page (`pages/Dashboard.js`)

**Purpose:** Resume upload and analysis

**Features:**
- Header with logout button
- PDF file upload area
- File selection and preview
- Analyze button
- Results display
- Loading indicators
- Error handling

**Functionality:**
1. User selects PDF file
2. File preview shows name and size
3. Click "Analyze Resume" to submit
4. Loading state while processing
5. Results display with suggestions

**API Calls:**
```javascript
// Upload and analyze
POST /api/analyze
FormData: {
  "resume": <PDF_FILE>
}
Header: Authorization: Bearer <TOKEN>
```

**Styling:** `pages/Dashboard.css`

---

### Components

#### ProtectedRoute (`components/ProtectedRoute.js`)

**Purpose:** Protect routes from unauthorized access

**How it works:**
```javascript
const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};
```

**Usage:**
```javascript
<Route
  path="/dashboard"
  element={
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

**Behavior:**
- If authenticated: Shows component
- If not authenticated: Redirects to login

---

## 🔌 API Integration

### Base URL
```
http://localhost:5000/api
```

### Authentication Flow

**1. Register Flow:**
```
User clicks Register
  ↓
Submits form
  ↓
POST /api/register
  ↓
Receives token
  ↓
Saves token to localStorage
  ↓
Redirects to Dashboard
```

**2. Login Flow:**
```
User clicks Login
  ↓
Submits credentials
  ↓
POST /api/login
  ↓
Receives token & user_id
  ↓
Saves token to localStorage
  ↓
Redirects to Dashboard
```

**3. Protected Action (Resume Upload):**
```
User uploads resume
  ↓
Frontend reads JWT from localStorage
  ↓
POST /api/analyze with Authorization header
  ↓
Backend verifies token
  ↓
Processes resume
  ↓
Returns analysis results
```

### API Endpoints Used

#### 1. Register User
```
POST /api/register
Content-Type: application/json

Body:
{
  "username": "john_doe",
  "email": "john@gmail.com",
  "password": "password123"
}

Response:
{
  "message": "Account Created Successful!!",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### 2. Login User
```
POST /api/login
Content-Type: application/json

Body:
{
  "email": "john@gmail.com",
  "password": "password123"
}

Response:
{
  "message": "Login Successful!",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user_id": "507f1f77bcf86cd799439011"
}
```

#### 3. Analyze Resume
```
POST /api/analyze
Content-Type: multipart/form-data
Authorization: Bearer <JWT_TOKEN>

Body (Form Data):
- resume: <PDF_FILE>

Response:
{
  "suggestions": [
    "Add more quantifiable achievements",
    "Use action verbs in bullet points",
    ...
  ]
}
```

#### 4. Update Profile
```
PUT /api/update
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>

Body (at least one field):
{
  "username": "new_name",
  "email": "newemail@gmail.com",
  "password": "newpassword123"
}
```

#### 5. Delete Account
```
DELETE /api/delete
Authorization: Bearer <JWT_TOKEN>

Response:
{
  "message": "User deleted successfully"
}
```

### Error Handling

All API errors are caught and displayed to users:

```javascript
try {
  const response = await axios.post('/api/login', credentials);
  // Success handling
} catch (err) {
  const errorMessage = err.response?.data?.message || 'Request failed';
  setError(errorMessage);
}
```

### Using Axios Interceptors (Optional Enhancement)

You can add interceptors for common headers:

```javascript
// Create axios instance with defaults
const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Add token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

---

## 🎨 Styling

### Design System

**Colors:**
- Primary: `#667eea` (Purple)
- Secondary: `#764ba2` (Dark Purple)
- Accent: `#ff6b6b` (Red)
- Background: `#f5f5f5` (Light Gray)
- White: `#ffffff`
- Text: `#333333`

**Typography:**
- Font Family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- Headings: Font weight 700 (bold)
- Body text: Font weight 400 (regular)

**Spacing:**
- Base unit: 8px
- Padding: 10px-40px
- Margin: 8px-30px
- Gap: 8px-20px

### CSS Files Overview

#### index.css
- Global reset (margins, padding, box-sizing)
- Body and HTML defaults
- Base font settings

#### App.css
- Main app wrapper styles
- Loading state styles
- Route transition styles

#### Auth.css (Login & Register)
- Container and card layout
- Form group styling
- Input field styling
- Button styling
- Error message styling
- Animations (slideUp, slideDown)

#### Dashboard.css
- Header layout
- Upload card styling
- File info display
- Results section styling
- Responsive grid/flex layouts

### Responsive Design

**Breakpoints:**
```css
/* Mobile: < 600px */
@media (max-width: 600px) {
  /* Adjust padding, font sizes */
}

/* Tablet: < 768px */
@media (max-width: 768px) {
  /* Stack layouts vertically */
  /* Reduce padding */
}

/* Desktop: >= 768px */
/* Full layout with all features */
```

### Custom Animations

**slideUp Animation:**
- Fades in and moves up 30px
- Duration: 0.5s
- Used for page loads

**slideDown Animation:**
- Fades in and moves down 10px
- Duration: 0.3s
- Used for error messages

**pulse Animation:**
- Scales 1 → 1.1 → 1
- Duration: 2s infinite
- Used for icons

---

## 🔑 Environment Variables

### .env File (Optional)

Create `frontend/.env` for customization:

```env
# Backend API URL
REACT_APP_API_URL=http://localhost:5000

# App Name (optional)
REACT_APP_NAME=Resume Analyzer
```

### How to Use Environment Variables

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

axios.post(`${API_URL}/api/login`, credentials);
```

### Important Notes
- Only variables prefixed with `REACT_APP_` are available in the frontend
- Environment variables are embedded at build time
- Don't commit `.env` to version control
- Create `.env.local` for local-only variables

---

## 🏗 Building & Deployment

### Development Build

```bash
npm start
```

Starts development server with:
- Hot module reloading
- Detailed error messages
- Unminified code
- Source maps for debugging

### Production Build

```bash
npm run build
```

Creates optimized production build:
- Minified code
- Optimized images
- Source maps (optional)
- ~150KB gzipped

Build output: `build/` folder

### Deployment Options

#### Option 1: Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

1. Sign up at [vercel.com](https://vercel.com)
2. Install Vercel CLI
3. Run `vercel` in project root
4. Follow prompts
5. Set `REACT_APP_API_URL` in Vercel dashboard

#### Option 2: Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=build
```

1. Sign up at [netlify.com](https://netlify.com)
2. Install Netlify CLI
3. Build project: `npm run build`
4. Deploy: `netlify deploy --prod --dir=build`
5. Set environment variables in Netlify dashboard

#### Option 3: GitHub Pages

1. Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/project-37"
}
```

2. Build and deploy:
```bash
npm run build
npm i -g gh-pages
gh-pages -d build
```

#### Option 4: Docker

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
FROM node:18-alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=0 /app/build ./build
CMD ["serve", "-s", "build"]
```

Build and run:
```bash
docker build -t resume-analyzer-frontend .
docker run -p 3000:3000 resume-analyzer-frontend
```

---

## 🔧 Troubleshooting

### Problem: npm install fails

**Error:** `ERR! code ERESOLVE`

**Solution:**
```bash
npm install --legacy-peer-deps
```

---

### Problem: Frontend can't connect to backend

**Error:** `Failed to fetch from localhost:5000`

**Checklist:**
- ✅ Is backend running on port 5000?
- ✅ Is `REACT_APP_API_URL` correct?
- ✅ Check Network tab in DevTools
- ✅ Check browser console for errors
- ✅ Check backend is serving from correct origin

**Solution:**
```bash
# In backend .env
PORT=5000

# Make sure backend CORS allows localhost:3000
# Update API URL if using different port
REACT_APP_API_URL=http://localhost:5000
```

---

### Problem: Blank page after login

**Cause:** Route not configured correctly

**Solution:**
1. Check browser console (F12) for errors
2. Verify token is saved: `localStorage.getItem('authToken')`
3. Check ProtectedRoute component logic

---

### Problem: File upload fails

**Error:** "File upload failed"

**Solutions:**
- Ensure file is PDF format
- Check file size < 10MB
- Verify form data is correct
- Check browser console for details

---

### Problem: CSS not loading

**Solution:**
```bash
# Clear cache and reinstall
rm -r node_modules
npm install --legacy-peer-deps
npm start
```

---

### Problem: Slow performance

**Solutions:**
1. Build for production:
```bash
npm run build
serve -s build
```

2. Use React DevTools to identify slow renders
3. Check Network tab for slow API calls
4. Lazy load components for large apps

---

## 🌐 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | Latest | ✅ Full |
| Firefox | Latest | ✅ Full |
| Safari | Latest | ✅ Full |
| Edge | Latest | ✅ Full |
| IE | 11 | ❌ No |

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Register with valid credentials
- [ ] Register with invalid email (not @gmail.com)
- [ ] Register with weak password (< 8 chars)
- [ ] Login with correct credentials
- [ ] Login with wrong password
- [ ] Navigate to dashboard after login
- [ ] Upload PDF file
- [ ] Upload non-PDF file (should fail)
- [ ] View analysis results
- [ ] Logout and verify redirect
- [ ] Test on mobile (responsive)

### Testing with Different Scenarios

```javascript
// Test data
const validCredentials = {
  username: "testuser",
  email: "test@gmail.com",
  password: "password123"
};

const invalidCredentials = {
  email: "test@gmail.com",
  password: "wrongpassword"
};
```

---

## 📚 Technologies Used

| Technology | Purpose | Version |
|-----------|---------|---------|
| React | UI library | 18.2.0 |
| React Router | Navigation | 6.20.0 |
| Axios | HTTP client | 1.6.0 |
| React Icons | Icon library | 4.12.0 |
| CSS3 | Styling | Built-in |

---

## 🔐 Security Notes

⚠️ **Important:**
- Never hardcode API URLs for different environments
- Always use HTTPS in production
- Don't store sensitive data in localStorage (except JWT)
- Implement CSRF protection if handling forms
- Use security headers (Content-Security-Policy)
- Validate all user inputs
- Keep dependencies updated: `npm audit`

---

## 📖 Useful Resources

- [React Documentation](https://react.dev/)
- [React Router Docs](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)

---

## 🤝 Contributing

To improve the frontend:
1. Create new branches for features
2. Follow existing code style
3. Test thoroughly before submitting
4. Update documentation

---

## 📄 License

MIT License - Feel free to use this project

---

**Version:** 1.0.0
**Last Updated:** December 2025
**Status:** Production Ready
