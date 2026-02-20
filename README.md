# Login Auth (Node.js + Express + MongoDB)

A simple authentication project with:

- User signup
- Email verification link
- Login with JWT
- Protected profile route (`/api/me`)
- Basic frontend pages (`login`, `signup`, `dashboard`)

## Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- JSON Web Tokens (`jsonwebtoken`)
- Email sending with Nodemailer (Gmail)
- Validation with `express-validator`

## Project Structure

```
.
├── config/
│   └── db.js
├── controllers/
│   └── authController.js
├── middleware/
│   ├── authMiddleware.js
│   └── validationMiddleware.js
├── models/
│   └── user.js
├── public/
│   ├── dashboard.html
│   ├── login.html
│   └── signup.html
├── routes/
│   └── authRoutes.js
├── utils/
│   └── sendEmail.js
├── server.js
└── package.json
```

## Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB installed locally (or a MongoDB Atlas URI)

## Environment Setup

1. Copy `.env.example` to `.env`
2. Fill in your real values

Required environment variables:

- `MONGO_URI` - Example: `mongodb://127.0.0.1:27017/abcd`
- `JWT_SECRET` - Long random secret string
- `EMAIL` - Gmail address used to send verification emails
- `EMAIL_PASS` - Gmail App Password (not your normal account password)
- `APP_URL` - Base URL of app, default is `http://localhost:5000`

## Installation

```bash
npm install
```

## Run the App

```bash
npm start
```

The server starts on:

`http://localhost:5000`

## Start MongoDB (Windows local install)

If MongoDB service is not configured, start it manually:

```powershell
"C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --dbpath "C:\data\db"
```

If `C:\data\db` does not exist, create it first.

## API Endpoints

Base path: `/api`

- `POST /api/signup`
  - Body: `{ name, email, phone, password }`
  - Creates user and sends email verification link

- `GET /api/verify/:token`
  - Verifies email from token link

- `POST /api/login`
  - Body: `{ email, password }`
  - Returns JWT token after successful login and verification

- `GET /api/me`
  - Header: `Authorization: Bearer <token>`
  - Returns current user profile

## Frontend Pages

- `/signup.html`
- `/login.html`
- `/dashboard.html`

Root `/` redirects to `/login.html`.

## Common Issues

1. **MongoDB connection refused**
   - Ensure MongoDB is running on port `27017`
   - Verify `MONGO_URI` has no spaces and correct host

2. **Email not sending**
   - Use Gmail App Password in `EMAIL_PASS`
   - Ensure 2-Step Verification is enabled on Gmail

3. **JWT errors**
   - Confirm `JWT_SECRET` is set in `.env`

## Security Notes

- Do **not** commit `.env` to GitHub
- Use strong secrets in production
- Current password check is plain-text in this project logic; hash passwords (e.g. bcrypt) before production use

## License

ISC
