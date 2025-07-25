# Book-Review-Platform: Full-Stack Book Review Platform #

*This* is a modern and responsive book review web application built using the **MERN stack (MongoDB, Express.js, React, Node.js)**. Users can explore books, filter them by genre/author, post reviews, and rate books from 1 to 5 stars. Designed as a 48-hour full-stack challenge, it demonstrates clean architecture, modern UI, and secure authentication.

---

## 🎯 Core Features

### 📘 Books

* Add new books *(only by logged-in users)*
* View a paginated list of books
* Filter books by **genre** and/or **author**
* Sort by **rating** or **date added**
* See average ratings in the book list and detail pages

### ✍️ Reviews

* Write text reviews and give a **1–5 star rating**
* View all reviews for a specific book
* Reviewer is automatically linked to logged-in user

### 🔐 Authentication

* Secure **Signup/Login** flow using **JWT tokens**
* Token stored in `localStorage` for session persistence
* Only authenticated users can post books or reviews

### 🎨 Frontend Pages

* Login / Signup
* Book Listing (with filters, pagination, sorting)
* Add Book
* Book Detail (with reviews and review form)

---

## 🏗️ Architecture Decisions

### 🔧 Stack

| Layer     | Technology                    |
| --------- | ----------------------------- |
| Frontend  | React (Hooks), Tailwind CSS   |
| Backend   | Node.js, Express.js           |
| Database  | MongoDB (Mongoose)            |
| Auth      | JWT-based Auth                |
| Routing   | React Router, Express Routers |
| API Calls | Axios                         |

### 🔑 Key Patterns & Choices

* **MERN Stack**: End-to-end JavaScript stack for seamless development.
* **JWT Authentication**: Stateless token-based user auth with protected routes.
* **React Context + useReducer**: Lightweight global state management (auth).
* **Tailwind CSS**: Utility-first CSS for fast, responsive design.
* **Pagination + Filtering (Server-side)**: Efficient data querying for scalability.
* **Visual Star Ratings**: Dynamically rendered icons for better UX.
* **Structured Project**: Clean separation of `frontend` and `backend` codebases.

---

## 🚀 Getting Started

### ⚙️ Prerequisites

* Node.js (v18+)
* npm or yarn
* MongoDB (local or Atlas)

### 📂 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

**Optional:** Seed database with sample data:

```bash
npm run db:seed
```

Run the backend:

```bash
npm run dev
```

Server starts at: `http://localhost:5000`

---

### 💻 2. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/`:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

React app runs at: `http://localhost:5173`

---

## ✨ Bonus Features Implemented

* ✅ Tailwind CSS for a modern, responsive UI
* ✅ Visual star ratings
* ✅ Form validation (required fields, rating bounds)
* ✅ Responsive mobile-first design
* ✅ Sorting by rating and date added

---

## ⚠️ Known Limitations

* ❌ No Edit/Delete for books or reviews
* ❌ No user profile to track all submitted reviews
* ❌ Error alerts use basic `alert()` instead of toast notifications
* ❌ No real-time updates (requires page refresh to see new reviews)

---

## 🚀 Deployment Ready

Although optional, the app is ready for deployment:

* **Frontend:** Vercel compatible (React + Vite)
* **Backend:** Render or Railway compatible (Node.js + Express)
* **Environment Variables:** Managed via `.env` files

---

## 🤝 Contributing

This project was built as a time-bound challenge and is open to improvement. Feel free to fork, modify, or contribute enhancements via pull requests.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

Made with ❤️ for developers who love books and clean code.
