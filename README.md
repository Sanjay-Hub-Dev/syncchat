# 💬 SyncChat

A real-time full-stack chat application built with the **MERN stack** and **Socket.IO**, designed to deliver a smooth and modern one-to-one messaging experience.  
SyncChat allows users to create accounts, log in securely, update profile pictures, send text and image messages, view online users in real time, switch between multiple themes, and delete their own messages.

🔗 **Live Demo:** [https://syncchat-rcsl.onrender.com/](https://syncchat-rcsl.onrender.com/)

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

### Frontend

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

### Backend

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
```

## 🔄 Flow Summary

### 1. Authentication Flow

- User signs up or logs in through the frontend
- Backend validates credentials
- JWT token is generated
- Token is stored in an HTTP-only cookie
- Protected routes use middleware to verify the logged-in user

### 2. Messaging Flow

- User selects another user from the sidebar
- Previous chat history is fetched from MongoDB
- User sends a text or image message
- Message is stored in MongoDB
- Socket.IO emits the message in real time
- Receiver gets the new message instantly if online

### 3. Profile Update Flow

- User uploads a profile picture
- Backend uploads the image to Cloudinary
- Cloudinary returns an image URL
- URL is stored in MongoDB
- Updated profile is reflected in the UI

### 4. Theme Flow

- User selects a theme from the settings page
- Theme is saved in localStorage
- Theme is applied globally using DaisyUI
- Selected theme remains active after page refresh

---

## 📁 Project Structure

```text
syncchat/
├── backend/
│   └── src/
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   └── message.controller.js
│       ├── lib/
│       │   ├── cloudinary.js
│       │   ├── db.js
│       │   ├── socket.js
│       │   └── utils.js
│       ├── middleware/
│       │   └── auth.middleware.js
│       ├── models/
│       │   ├── user.model.js
│       │   └── message.model.js
│       ├── routes/
│       │   ├── auth.route.js
│       │   ├── message.route.js
│       │   └── user.route.js
│       └── index.js
│
├── frontend/
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── ChatContainer.jsx
│       │   └── Sidebar.jsx
│       ├── constants/
│       │   └── index.js
│       ├── lib/
│       │   └── axios.js
│       ├── pages/
│       │   ├── HomePage.jsx
│       │   ├── LoginPage.jsx
│       │   ├── ProfilePage.jsx
│       │   ├── SettingsPage.jsx
│       │   └── SignUpPage.jsx
│       ├── store/
│       │   ├── useAuthStore.js
│       │   ├── useChatStore.js
│       │   └── useThemeStore.js
│       ├── App.jsx
│       └── main.jsx
│
└── package.json
```

## 🗂️ Repository Content Explanation

### Backend Folder

The `backend/` folder contains the complete server-side logic of SyncChat.

| Folder / File | Purpose |
|--------------|---------|
| `controllers/` | Contains the main business logic for authentication and messaging |
| `lib/db.js` | Connects the backend to MongoDB |
| `lib/socket.js` | Configures Socket.IO and handles online user tracking |
| `lib/cloudinary.js` | Configures Cloudinary for image uploads |
| `lib/utils.js` | Handles JWT token generation and helper utilities |
| `middleware/auth.middleware.js` | Protects private routes by verifying JWT cookies |
| `models/` | Defines MongoDB schemas for users and messages |
| `routes/` | Declares API endpoints for auth, users, and messages |
| `index.js` | Main backend entry point that starts the server and serves the frontend in production |

### Frontend Folder

The `frontend/` folder contains the complete client-side application.

| Folder / File | Purpose |
|--------------|---------|
| `assets/` | Stores static files like default images |
| `components/` | Reusable UI components such as sidebar and chat container |
| `constants/index.js` | Stores reusable constants like available themes |
| `lib/axios.js` | Axios instance setup for API communication |
| `pages/` | Contains the main pages like login, signup, profile, settings, and home |
| `store/useAuthStore.js` | Manages authentication state and socket connection |
| `store/useChatStore.js` | Manages chat state, messages, and message actions |
| `store/useThemeStore.js` | Manages theme selection and persistence |
| `App.jsx` | Defines routes and app-level structure |
| `main.jsx` | Renders the app and applies theme globally |

### Root Level

| File | Purpose |
|------|---------|
| `package.json` | Root scripts for building and starting the full project |

---

## 🚀 Core Functionalities

### 1. Authentication System

- User signup
- User login
- JWT generation
- Cookie-based authentication
- Authentication check on reload
- Logout support

### 2. User Management

- Display registered users
- Show users in sidebar
- Update profile picture
- Default avatar support

### 3. Messaging System

- One-to-one messaging
- Text message support
- Image message support
- Fetch previous chat history
- Delete own messages

### 4. Real-Time Communication

- Real-time chat updates
- Online/offline indicators
- Socket-based live message delivery

### 5. Theme Management

- Theme selection page
- Multiple available themes
- Persistent theme selection using localStorage
- Theme applied across the app UI

---

## 🗄️ Database Design

### Users Collection

```json
{
  "_id": "user_id",
  "fullName": "Sanjay",
  "email": "sanjay@gmail.com",
  "password": "hashed_password",
  "profilePic": "image_url",
  "createdAt": "2026-03-20T10:00:00.000Z",
  "updatedAt": "2026-03-20T10:00:00.000Z"
}
```

### Messages Collection

```json
{
  "_id": "message_id",
  "senderId": "user_1_id",
  "receiverId": "user_2_id",
  "text": "Hello Rahul",
  "image": "optional_image_url",
  "createdAt": "2026-03-20T10:10:00.000Z",
  "updatedAt": "2026-03-20T10:10:00.000Z"
}
```

---

## 📡 API Endpoints

### Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login existing user |
| POST | `/api/auth/logout` | Logout authenticated user |
| GET | `/api/auth/check` | Get current logged-in user |
| PUT | `/api/auth/update-profile` | Update user profile picture |

### User Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users except the logged-in user |

### Message Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/messages/:id` | Get chat history with selected user |
| POST | `/api/messages/send/:id` | Send message to selected user |
| DELETE | `/api/messages/:id` | Delete own message |

---

## 🔄 Real-Time Socket Events

| Event | Description |
|------|-------------|
| `connection` | Triggered when a user connects |
| `disconnect` | Triggered when a user disconnects |
| `getOnlineUsers` | Sends current online user list |
| `newMessage` | Delivers incoming message in real time |

---

## 🔒 Security Features

- Passwords are hashed using **bcryptjs**
- JWT tokens are stored in **HTTP-only cookies**
- Protected routes use authentication middleware
- Secure cookie settings are enabled in production
- Sensitive credentials are stored using environment variables
- Only the sender can delete their own messages

---

## 🎨 UI / UX Highlights

- Clean split chat layout
- User sidebar with online indicators
- Profile picture with default avatar fallback
- Message bubbles for sender and receiver
- Image preview before sending
- Professional theme-aware design
- Settings page for theme selection
- Minimal, responsive, and easy-to-use interface

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have:

- **Node.js v18+**
- **MongoDB Atlas account** or local MongoDB
- **Cloudinary account**
- **Git installed**

---

## 1. Clone the Repository

```bash
git clone https://github.com/Sanjay-Hub-Dev/syncchat.git
cd syncchat
```

---

## 2. Set Up Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

---

## 3. Set Up Frontend

```bash
cd ../frontend
npm install
```

---

## 4. Run the Application

### Start backend

```bash
cd backend
npm run dev
```

### Start frontend

```bash
cd frontend
npm run dev
```

---

## 5. Open in Browser

| Service | URL |
|--------|-----|
| Frontend | `http://localhost:5173` |
| Backend | `http://localhost:5001` |

---

## 📦 Scripts

### Root

| Script | Command | Purpose |
|-------|---------|---------|
| Build | `npm run build` | Installs backend/frontend dependencies and builds frontend |
| Start | `npm start` | Starts backend server |

### Backend

| Script | Command | Purpose |
|-------|---------|---------|
| Development | `npm run dev` | Runs backend with nodemon |

### Frontend

| Script | Command | Purpose |
|-------|---------|---------|
| Development | `npm run dev` | Starts Vite dev server |
| Build | `npm run build` | Builds frontend for production |
| Preview | `npm run preview` | Preview production build |
| Lint | `npm run lint` | Run linter |

---

## 🌐 Deployment

SyncChat is deployed on **Render**.

### Live URL

[https://syncchat-rcsl.onrender.com/](https://syncchat-rcsl.onrender.com/)

### Deployment Notes

- frontend and backend are served together in production
- frontend is built with Vite
- Express serves the production frontend build
- MongoDB Atlas is used as cloud database
- Cloudinary stores uploaded images
- environment variables are configured in Render dashboard

---

## 🧩 Challenges Solved

During development, several real-world issues were handled, such as:

- setting up JWT authentication with cookies
- handling image uploads through Cloudinary
- integrating Socket.IO for real-time messaging
- tracking online/offline users
- serving React frontend through Express in production
- fixing deployment issues on Render
- making themes apply globally
- implementing sender-only message deletion

These challenges made the project much more practical and closer to real production apps.

---

## 📘 Learning Outcomes

This project helped apply and strengthen understanding of:

- MERN stack architecture
- REST API development
- MongoDB schema modeling
- JWT-based authentication
- middleware protection
- Zustand state management
- real-time communication using WebSockets
- image storage and handling
- deployment and production debugging
- theme-aware frontend design

---

## 🚀 Future Improvements

Possible future upgrades for SyncChat:

- typing indicator
- seen/delivered status
- group chats
- emoji picker
- timestamps in chat bubbles
- search users/chats
- notifications
- audio messages
- pagination for older messages

---

## 👨‍💻 Author

**Sanjay Dhavanam**
GitHub Repository: [https://github.com/Sanjay-Hub-Dev/syncchat](https://github.com/Sanjay-Hub-Dev/syncchat)
