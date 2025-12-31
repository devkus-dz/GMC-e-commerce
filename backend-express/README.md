# E-Commerce Backend API

This is the RESTful API server for the E-Commerce platform. It handles user authentication, product management, order processing, and admin dashboard functionalities.

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (using Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcryptjs (password hashing), cors, dotenv

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Connection String (Local or MongoDB Atlas)

### Installation

1.  Navigate to the backend directory:

    ```bash
    cd backend
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the root of the `backend` folder and add the following:
    ```properties
    NODE_ENV=development
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    ```

### Running the Server

- **Development Mode** (uses nodemon for auto-restart):
  ```bash
  npm run dev
  ```
- **Production Mode:**
  ```bash
  npm start
  ```

## 📡 API Endpoints (Key Routes)

| Method | Endpoint             | Description                              |
| :----- | :------------------- | :--------------------------------------- |
| POST   | `/api/users/login`   | Authenticate user & get token            |
| POST   | `/api/users`         | Register a new user                      |
| GET    | `/api/products`      | Fetch all products (pagination included) |
| GET    | `/api/products/:id`  | Fetch single product details             |
| POST   | `/api/orders`        | Create a new order (Protected)           |
| GET    | `/api/config/paypal` | Get PayPal Client ID                     |

## ☁️ Deployment (Azure Web App)

This project is configured to run on Azure App Service.

1.  **Create Web App:** Create a Node.js Web App on the Azure Portal.
2.  **Environment Variables:** Go to **Settings > Environment variables** in your Azure App Service and add the keys from your `.env` file (`MONGO_URI`, `JWT_SECRET`, etc.).
3.  **Deploy:**
    - Connect your GitHub repository via the Deployment Center.
    - **OR** use the VS Code Azure App Service extension to right-click and "Deploy to Web App".
