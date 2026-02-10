# 🎬 React JSON Server Movie Review App

A full-stack movie review application built using **React (Vite)** and **json-server**, where users can add, edit, delete, and rate movies.

---

## 🔗 Live Demo

Live Link:  
🌐https://react-json-server-movie-review-app.vercel.app/

GitHub Repository:  
🗃️https://github.com/AaronStark1/react-json-server-movie-review-app

---

## 🚀 Features

- Add new movie reviews
- Edit existing reviews
- Delete reviews with confirmation (SweetAlert2)
- Star-based rating system
- Persistent data using json-server
- Clean UI built with Material UI
- Fully deployed frontend and backend

---

## 🛠 Tech Stack


### Frontend

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Material UI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)
[![SweetAlert2](https://img.shields.io/badge/SweetAlert2-FF6F61?style=for-the-badge)](https://sweetalert2.github.io/)

---

### Backend

[![JSON Server](https://img.shields.io/badge/JSON_Server-000000?style=for-the-badge)](https://github.com/typicode/json-server)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

---

### Deployment

[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)](https://render.com/)


---

## 📁 Project Structure

```
react-json-server-movie-review-app/
│
├── movie-review-app/     # React frontend
│   ├── src/
│   ├── package.json
│
├── server/               # json-server backend
│   ├── db.json
│   ├── package.json
│
└── .gitignore
```

---

## ⚙️ Local Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/AaronStark1/react-json-server-movie-review-app.git
cd react-json-server-movie-review-app
```

---

### 2️⃣ Run Backend (json-server)

```bash
cd server
npm install
npm start
```

Backend runs at:

```
http://localhost:5000
```

---

### 3️⃣ Run Frontend

Open a new terminal:

```bash
cd movie-review-app
npm install
npm run dev
```

---

## 🌍 Environment Variables

Frontend uses:

```
VITE_SERVER_URL
```

For local development:

```
VITE_SERVER_URL=http://localhost:3000
```

For production (Vercel):

```
VITE_SERVER_URL=https://your-render-backend-url.onrender.com
```

---

## 📌 Notes

- Backend is deployed on Render (free tier), so it may take 30–60 seconds to wake up if inactive.
- json-server is used for lightweight API simulation and persistence via `db.json`.

---

## 📈 Future Improvements

- Authentication system
- Express + MongoDB backend
- Image upload for posters
- Pagination and search
- User accounts with protected routes

---

