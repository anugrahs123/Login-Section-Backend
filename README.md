# Login System with JWT (Access + Refresh Token)- Backend

This project implements a secure login system using the MERN stack (MongoDB, Express.js, React.js, Node.js) with support for **JWT access and refresh token rotation**, token blacklisting, and logout functionality.

## Features

- Login with email and password
- JWT access token (15 min expiry)
- JWT refresh token (rotates on use, expires in 1 week)
- Secure password hashing (bcrypt)
- MongoDB for user and refresh token management
- Logout support (token invalidation)
- Access token refresh endpoint

---

## Getting Started

### 1. Clone the repository

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

### 2. Install dependencies

npm install

---

## 3. Environment Configuration

Create a `.env` file at the root of your project and add the following variables:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/loginSection
JWT_SECRET=yourSuperSecretJWTKey
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

---

## Insert Initial User Data

A sample `users.json` file is available in the root directory. You can edit user details here.

To insert user data into MongoDB without duplication:

1. Ensure MongoDB is running locally
2. Run the following Node script:

npm run data

Note: Duplicate entries (by email) will be skipped.

---

## Run the Backend

Make sure your **MongoDB local server is running**, then:

npm start

The backend will run on `http://localhost:5000`.

---

## Authentication

- Use the `accessToken` for protected routes via Bearer token
- When expired, call `/refresh` with the `refreshToken` to get a new pair
- Refresh tokens are stored and rotated securely

---

## Testing

Use **Postman** or **frontend app** to test:

1. Login
2. Access protected routes
3. Refresh token when access token expires
4. Logout and attempt reuse of tokens (should fail)

---
