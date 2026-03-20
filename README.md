# 💬 SyncChat

A real-time full-stack chat application built with the **MERN stack** and **Socket.IO**, designed to deliver a smooth and modern one-to-one messaging experience.  
SyncChat allows users to create accounts, log in securely, update profile pictures, send text and image messages, view online users in real time, switch between multiple themes, and delete their own messages.

🔗 **Live Demo:** https://syncchat-rcsl.onrender.com/

---

## ✨ Features

- 🔐 **Authentication & Authorization** — Secure JWT-based authentication using HTTP-only cookies
- 💬 **Real-Time Messaging** — Instant one-to-one messaging powered by Socket.IO
- 🖼️ **Image Sharing** — Send image messages with Cloudinary-based media handling
- 🟢 **Online Presence** — See which users are currently online in real time
- 👤 **Profile Management** — Update profile picture and manage user information
- 🗑️ **Message Deletion** — Delete your own sent text and image messages
- 🎨 **Theme Support** — Multiple DaisyUI themes with persistent theme selection
- 📱 **Responsive UI** — Works across desktop, tablet, and mobile screens
- 🔔 **Toast Notifications** — Instant feedback for user actions
- ⚡ **Smooth UX** — Real-time updates, image preview, and clean chat flow

---

## 🧠 Project Overview

SyncChat is a full-stack real-time chat application created to demonstrate practical skills in:

- frontend and backend integration
- secure authentication
- state management
- WebSocket-based communication
- database design
- cloud image handling
- full deployment to production

This project is stronger than a basic CRUD app because it combines **authentication, real-time messaging, media upload, online presence, theme management, and deployment** in one complete system.

---

## 🛠️ Tech Stack

## Frontend

| Technology | Purpose |
|-----------|---------|
| React | UI development |
| Vite | Frontend build tool |
| Zustand | State management |
| Socket.IO Client | Real-time communication |
| Tailwind CSS | Utility-first styling |
| DaisyUI | Theme system and UI styling |
| React Router DOM | Client-side routing |
| Axios | HTTP requests |
| React Hot Toast | Notifications |

## Backend

| Technology | Purpose |
|-----------|---------|
| Node.js | Runtime environment |
| Express | Backend framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB object modeling |
| Socket.IO | Real-time WebSocket server |
| JWT | Authentication tokens |
| bcryptjs | Password hashing |
| Cookie Parser | Cookie handling |
| dotenv | Environment variable management |
| Cloudinary | Image storage and hosting |

---

## 🏗️ Project Architecture

```text
Frontend (React + Zustand + Socket.IO Client)
        │
        │ HTTP Requests / WebSocket Events
        ▼
Backend (Node.js + Express + Socket.IO)
        │
        ├── MongoDB (users, messages)
        └── Cloudinary (profile pictures, message images)
