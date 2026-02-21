
# 💬 Chatify (MERN + Socket.IO)

A real-time chat application with 🔐 authentication, 🟢 online user tracking (Socket.IO), and 🖼️ profile picture upload (Cloudinary).

## 🌐 Live Website

- **LIVE Website:** https://your-deployed-site-url.com

## ✨ Features

- 🔐 Cookie-based JWT authentication
- 💬 Real-time messaging with Socket.IO
- 🟢 Online users tracking
- 🖼️ Profile picture upload via Cloudinary
- 🎨 Modern UI (React + Tailwind)

## 🧱 Folder Structure

- `Backend/` — Express + MongoDB + Socket.IO server
- `Frontend/vite-project/` — React (Vite) client

## 🛠️ Tech Stack

- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT (cookie-based), Socket.IO
- **Frontend:** React, Vite, Zustand, Axios, Tailwind CSS
- **Media:** Cloudinary (images are stored in Cloudinary, DB stores the image URL)

## ✅ Prerequisites

- Node.js installed
- MongoDB connection string (Atlas or local)
- Cloudinary account (for profile picture upload)

## 🚀 Run Locally

### 1) Backend Setup

Install dependencies:

```bash
cd Backend
npm install
```

Create `Backend/.env` (copy from `Backend/.env.example` and fill your real values). Do NOT commit `Backend/.env`.

```env
PORT=5000
NODE_ENV=development

MONGODB_URI=your_mongodb_connection_string
secretKey=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_api_secret
```

Start the backend:

```bash
npm start
```

Backend entry: `Backend/src/app.js`

Important:

- Frontend API base URL is `http://localhost:5000/api` (see `Frontend/vite-project/src/lib/axios.js`).
- Socket.IO client connects to `http://localhost:5000` (see `Frontend/vite-project/src/store/authStore.js`).
- Keep `PORT=5000` locally unless you also update those client URLs.

### 2) Frontend Setup

Install dependencies:

```bash
cd Frontend/vite-project
npm install
```

Start the frontend:

```bash
npm run dev
```

Vite typically runs at `http://localhost:5173`.

Note:

- Running `npm start` inside `Frontend/` (not `Frontend/vite-project/`) will fail because `Frontend/` has no `package.json`.

## 🖼️ Profile Picture (How It Works)

- The user document stores `profilepic` as a string URL.
- Frontend sends a Base64 DataURL to `POST /api/auth/update-profile`.
- Backend uploads to Cloudinary and saves `secure_url` in MongoDB.
- If no image is set, the frontend uses a generated fallback avatar.

## 📦 Deploy

You can deploy **Backend** and **Frontend** separately.

### Backend Deployment

1) Deploy `Backend/` to a Node hosting provider (Render / Railway / etc.).
2) Set the same environment variables from `Backend/.env` in your hosting dashboard.
3) Ensure your backend CORS allows your deployed frontend domain.

### Frontend Deployment

1) Deploy `Frontend/vite-project/` to a static host (Vercel / Netlify / etc.).
2) Update the frontend to point to your deployed backend:
	- API base URL in `Frontend/vite-project/src/lib/axios.js`
	- Socket server URL in `Frontend/vite-project/src/store/authStore.js`
3) After deploying, paste your deployed URL into the **Live Website** section above so people can click it.

## 🧩 Common Issues

- **Profile upload fails:** verify Cloudinary env vars.
- **CORS errors:** make sure backend allows your frontend domain.
- **Socket not connecting:** confirm the client is pointing to the correct socket URL.

