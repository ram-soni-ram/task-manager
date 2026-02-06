# 📝 Task Manager API


## Description  
A production-ready **RESTful** Task Manager **API** built with **Node.js** & **Express**, featuring authentication, task management, **security** best practices, structured **logging**, and clean architecture.

This project is designed to showcase real-world backend development practices and is suitable for learning, interviews, and production use.

## 🚀 Features

* 🔐 User Authentication (JWT based)

* 🔑 Forgot & Reset password Via Email

* 👤 User Registration & Login

* 🗂️ Task CRUD (Create, Read, Update, Delete)

* ✅ Task status management

* 🔒 Protected routes with middleware

* 🧾 Centralized error handling

* 📊 Winston logger (console + rotating files)

* 🚦 Rate limiting & security middleware

* 🧹 Input validation (Yup)

* 🌍 Environment-based configuration

* ✨ ESLint + Prettier for clean code


## 🧰 Tech Stack

* Node.js (ES6 Modules)

* Express.js

* MongoDB + Mongoose

* JWT (jsonwebtoken) – Authentication

* Winston – Logging

* Yup – Validation

* dotenv – Environment variables

* ESLint & Prettier – Code quality

* Nodemailer – Sending Email

* Bcryptjs – Password hashing


## ⚙️ Environment Variables

 To run this project, you will need to add the following environment variables to your .env file

`DBURL`  
`GOOGLE_APP_PASSWORD`  
`SENDER_EMAIL`

Create a .env file using .env.example:


## 📂 Folder Structure


```text
.
|-- task-manager
|-- |-- src
|-- |   |-- config
|-- |   |   |-- db.config.js
|-- |   |   |-- env.config.js
|-- |   |   |-- logger.config.js
|-- |   |   |__ ratelimit.config.js
|-- |   |-- controllers
|-- |   |   |-- auth.controller.js
|-- |   |   |-- task.controller.js
|-- |   |   |__ user.controller.js
|-- |   |-- middlewares
|-- |   |   |-- error.middleware.js
|-- |   |   |-- protectroute.middleware.js
|-- |   |   |-- requestlogger.middleware.js
|-- |   |   |-- security.middleware.js
|-- |   |   |__ validation.middleware.js
|-- |   |-- models
|-- |   |   |-- user.model.js
|-- |   |   |-- task.model.js
|-- |   |   |__ blacklist.model.js
|-- |   |-- routes
|-- |   |   |-- user.routes.js
|-- |   |   |-- auth.routes.js
|-- |   |   |__ task.routes.js
|-- |   |-- services
|-- |   |   |-- auth.service.js
|-- |   |   |-- user.service.js
|-- |   |   |__ task.service.js
|-- |   |-- utils
|-- |   |   |-- ApiResponse.js
|-- |   |   |-- AppError.js
|-- |   |   |-- asyncHandler.js
|-- |   |   |-- blacklistToken.js
|-- |   |   |-- cryptoHash.js
|-- |   |   |-- filterQuery.js
|-- |   |   |-- jsonwebtoken.js
|-- |   |   |__ sendMail.js
|-- |   |-- validation
|-- |   |   |__ yup.schemas.js
|-- |-- index.js
|-- |-- .env
|-- |-- .gitignore
|-- |-- .prettierignore
|-- |-- .prettierrc
|-- |-- eslint.config.mjs
|-- |-- LICENSE
|-- |-- package-lock.json
|-- |-- package.json
|__ |__ README.md
```


## 📌 API Endpoints

#### 🔑 Auth Routes

| METHOD | ENDPOINT | PROTECTED | DESCRIPTION |
|----|----|----|----|
| POST | /api/v1/auth/signup | No | Signup |
| POST | /api/v1/auth/login | No | Login |
| POST | /api/v1/auth/logout | Yes | Logout |
| POST | /api/v1/auth/renew-token | Yes  | Generate New Access Token |
| POST | /api/v1/auth/forgot-password | No | Get Reset Password Link Via Email |
| POST | /api/v1/auth/reset-password?token=resettoken&id=userid | No | Reset Password |


#### 🗂️ Task Routes (Protected)

| METHOD | ENDPOINT | PROTECTED | DESCRIPTION |
|----|----|----|----|
| POST | /api/v1/tasks | Yes | Create A Task |
| GET | /api/v1/tasks?page=1&limit=10&search=javascript&sort=oldest&status=success | Yes | Get Tasks |
| PATCH | /api/v1/tasks/${id} | Yes | Update A Task |
| DELETE | /api/v1/tasks/${id} | Yes | Delete A Task |


#### 👤 User Routes (Protected)

| METHOD | ENDPOINT | PROTECTED | DESCRIPTION |
|----|----|----|----|
| GET | /api/v1/user | Yes | Get User |
| PATCH | /api/v1/user | Yes | Update User |
| PATCH | /api/v1/user/change-password | Yes | Change Password |


#### 🔐Protected Routes Requires **JWT** Access token in Authorization: Bearer \<token>


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


## ▶️ Installation 

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

[ ] Accept images

[ ] Unit & integration tests

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## Author Ram soni

⭐ If you find this project useful, consider giving it a star on GitHub!

Happy coding 🚀


## Contact

if any issue in this project then contact me i will help you

**Email:** ramsoni888990@gmail.com