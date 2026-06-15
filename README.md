# Inventory Management System

A full-stack inventory management system for tracking products and stock quantities. The application includes user registration and login, a React-based inventory dashboard, and an Express/MongoDB API for managing product records.

## Features

- User registration and login
- Password hashing with bcrypt
- JWT token generation on login
- Product listing
- Add new inventory products
- Delete products from inventory
- Stock status badges for low and healthy stock levels
- Responsive Bootstrap interface
- MongoDB persistence with Mongoose

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- Bootstrap

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- bcryptjs
- JSON Web Token
- dotenv
- CORS

## Project Structure

```text
Inventory-Management-System/
+-- backend/
|   +-- controllers/
|   |   +-- authController.js
|   |   +-- productController.js
|   +-- models/
|   |   +-- Product.js
|   |   +-- user.js
|   +-- routes/
|   |   +-- authRoutes.js
|   |   +-- productRoutes.js
|   +-- package.json
|   +-- server.js
+-- frontend/
|   +-- public/
|   +-- src/
|   |   +-- api/
|   |   |   +-- axios.js
|   |   +-- components/
|   |   |   +-- Navbar.jsx
|   |   +-- pages/
|   |   |   +-- Login.jsx
|   |   |   +-- Products.jsx
|   |   |   +-- Register.jsx
|   |   +-- App.jsx
|   |   +-- App.css
|   |   +-- index.css
|   |   +-- main.jsx
|   +-- package.json
|   +-- vite.config.js
+-- LICENSE
+-- README.md
```

## Getting Started

### Prerequisites

Install these before running the project:

- Node.js
- npm
- MongoDB database, either local MongoDB or MongoDB Atlas

## Backend Setup

1. Go to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
```

Example for a local MongoDB database:

```env
MONGO_URI=mongodb://127.0.0.1:27017/inventory-management
```

4. Start the backend server:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

## Frontend Setup

1. Open a new terminal and go to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend development server:

```bash
npm run dev
```

Vite will show the local frontend URL, usually:

```text
http://localhost:5173
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive a JWT token |

### Products

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Add a new product |
| PUT | `/api/products/:id` | Update a product or stock value |
| DELETE | `/api/products/:id` | Delete a product |

## Product Data Model

```js
{
  name: String,
  quantity: Number,
  price: Number,
  supplier: String
}
```

## User Data Model

```js
{
  name: String,
  email: String,
  password: String,
  role: String
}
```

## Usage

1. Register a new account.
2. Login with your email and password.
3. Open the inventory page.
4. Add products with a name and stock quantity.
5. View available stock in the inventory table.
6. Delete products when they are no longer needed.

## Available Scripts

### Backend

```bash
npm start
```

Runs the backend with Node.js.

```bash
npm run dev
```

Runs the backend with Nodemon for development.

### Frontend

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Builds the frontend for production.

```bash
npm run lint
```

Runs ESLint.

```bash
npm run preview
```

Previews the production build.

## Notes

- The frontend API client points to `http://localhost:5000/api`.
- The backend listens on port `5000`.
- Login stores the JWT token in browser `localStorage`.
- Product API requests include the token automatically when one exists.

## License

This project is licensed under the terms included in the `LICENSE` file.
