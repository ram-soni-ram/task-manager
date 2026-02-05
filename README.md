# 📝 Task Manager API

A production-ready RESTful Task Manager API built with Node.js & Express, featuring authentication, task management, security best practices, structured logging, and clean architecture.

This project is designed to showcase real-world backend development practices and is suitable for learning, interviews, and production use.

## 🚀 Features

🔐 User Authentication (JWT based)

🔑 Forgot & Reset password Via Email

👤 User Registration & Login

🗂️ Task CRUD (Create, Read, Update, Delete)

✅ Task status management

🔒 Protected routes with middleware

🧾 Centralized error handling

📊 Winston logger (console + rotating files)

🚦 Rate limiting & security middleware

🧹 Input validation (Yup)

🌍 Environment-based configuration

✨ ESLint + Prettier for clean code

## 🧰 Tech Stack

Node.js (ES6 Modules)

Express.js

MongoDB + Mongoose

JWT (jsonwebtoken) – Authentication

Winston – Logging

Yup – Validation

dotenv – Environment variables

ESLint & Prettier – Code quality

Nodemailer – Sending Email

Bcryptjs – Password hashing

## ⚙️ Environment Variables

To run this project, you will need to add the following environment variables to your .env file

Create a .env file using .env.example:

`DBURL`
`PORT`
`NODE_ENV`
`GOOGLE_APP_PASSWORD`
`SENDER_EMAIL`

## 📌 API Endpoints

#### 🔑 Auth Routes

```http
  POST /api/v1/auth/signup
```

```http
  POST /api/v1/auth/login
```

```http
  POST /api/v1/auth/logout
```

```http
  POST /api/v1/auth/renew-token
```

```http
  POST /api/v1/auth/forgot-password
```

```http
  POST /api/v1/auth/reset-password
```

#### 🗂️ Task Routes (Protected)

```http
  POST /api/v1/tasks
```

```http
  GET /api/v1/tasks
```

```http
  PATCH /api/v1/tasks/${id}
```

```http
  DELETE /api/v1/tasks/${id}
```

#### 👤 User Routes

```http
  GET /api/v1/user
```

```http
  PATCH /api/v1/user
```

```http
  PATCH /api/v1/user/change-password
```

#### 🔐 Requires JWT token in Authorization: Bearer <token>

## 🧾 Logging (Winston)

Colorized logs in development

Daily rotating log files

Separate error logs

## 🧹 Code Quality

ESLint

Prevents bugs

Enforces best practices

Prettier

Ensures consistent formatting

## ▶️ Run Locally

Clone the project

```bash
  git clone https://github.com/ram-soni-ram/task-manager.git
```

Go to the project directory

```bash
  cd task-manager
```

Install dependencies

```bash
  npm install
```

Start the server (production)

```bash
  npm start
```

Start the server (development)

```bash
  npm run dev
```

## 🧠 Design Philosophy

Separation of concerns

Middleware-driven architecture

Environment-based configuration

Clean & readable code

Code is not just written to work — it is written to be understood.

## 🔮 Future Improvements

[ ] Role-based access control

[ ] Swagger / OpenAPI docs

[ ] images

[ ] Unit & integration tests

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## Ram Soni

⭐ If you find this project useful, consider giving it a star on GitHub!

Happy coding 🚀
