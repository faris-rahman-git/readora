# 📰 Article Feeds Web Application - Readora

A full-stack web application where users can register, log in, set their article preferences (e.g., sports, politics, space), and create/manage articles. The app shows users articles based on their chosen interests.

---

## 🚀 Features

- **Authentication**: Signup, Login (via email or phone), JWT-based auth.
- **User Preferences**: Choose article categories at signup or edit later.
- **Dashboard**: See personalized feed of articles based on preferences.
- **Article Management**: Create, edit, delete your own articles.
- **Interactions**: Like, dislike, and block articles.
- **Responsive UI**: Interactive, mobile-friendly design.
- **Settings**: Update personal info, password, and preferences.

---

## 🛠️ Tech Stack

**Backend**

- Node.js, Express, TypeScript
- MongoDB
- JWT, Bcrypt, Cloudinary

**Frontend**

- React + TypeScript + Vite
- TailwindCSS + ShadCN/UI
- Redux Toolkit + React Query
- React Router

---

## ⚙️ Setup & Installation

### 1. Clone repositories

```bash
git clone https://github.com/faris-rahman-git/readora.git
cd readora
```

### 2. Backend Setup

```bash
cd backend
cp .env.example .env   # Fill in DB, JWT, etc.
npm install
npm run dev
```

Backend runs on http://localhost:5000

### 3. Frontend Setup

```bash
cd frontend
cp .env.example .env   # Fill API base URL
npm install
npm run dev
```

Frontend runs on http://localhost:4173

## 🔑 Environment Variables

### 1. Backend (backend/.env)

```bash

CLIENT_URL=http://localhost:5173
PORT=5000

NODEMAILER_EMAIL=
NODEMAILER_PASS=

MONGO_URI=mongodb://localhost:27017/readora

JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
```

### 1. Frontend (frontend/.env)

```bash

VITE_BASE_API=http://localhost:5000/api
```

## 📦 Build & Deployment

### 1. Backend

```bash

cd backend
npm run build
npm start
```

Deploy on Heroku, Render, or Docker.

### 1. Frontend

```bash

cd frontend
npm run build
npm run preview
```

Deploy on Vercel, Netlify, or any static host.

## 🗂️ Pages Overview

1. Registration: Signup with personal details + preferences.
2. Login: Email/Phone + password.
3. Dashboard: Feed of articles matching user preferences.
4. Settings: Edit profile, password, preferences.
5. Article Creation: Add title, content, tags, images, category.
6. Article List: Manage own articles (edit/delete, view stats).
7. Article Edit: Update articles.

## 📌 Notes

- Articles in Dashboard are filtered by user preferences.
- Likes/Dislikes/Blocks are tracked per article.
- Email is non-editable once registered.
- Responsive UI using TailwindCSS.

## 👨‍💻 Author

**Faris Rahman**  
📧 [farisrahman786687@gmail.com](mailto:farisrahman786687@gmail.com)
