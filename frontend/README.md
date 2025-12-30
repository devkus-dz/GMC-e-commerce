# E-Commerce Frontend

The client-side application for the E-Commerce platform. It features a responsive design, product filtering, shopping cart functionality, and a dedicated admin panel.

## 🛠 Tech Stack

- **Framework:** React
- **Build Tool:** Vite
- **UI Library:** Material UI (MUI)
- **State Management:** Zustand
- **Routing:** React Router DOM
- **HTTP Client:** Axios

## 🚀 Getting Started

### Prerequisites

- Node.js installed locally.
- The Backend server must be running (locally or on Azure).

### Installation

1.  Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Environment Configuration

This project uses Vite's environment variable handling.

1.  **For Local Development:**
    Create/Edit `.env.development`:

    ```properties
    VITE_API_BASE_URL=http://localhost:5000
    ```

2.  **For Production:**
    Create/Edit `.env.production`:
    ```properties
    VITE_API_BASE_URL=link_to_backend_deployed_api
    ```

### Running the App

- **Start Development Server:**

  ```bash
  npm run dev
  ```

  Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

- **Build for Production:**

  ```bash
  npm run build
  ```

  This generates a static `/dist` folder optimized for deployment.

- **Preview Production Build:**
  ```bash
  npm run preview
  ```

## 📂 Project Structure

- `/src/components` - Reusable UI components (Header, Footer, ProductCard).
- `/src/pages` - Full page views (Home, ProductDetails, Cart, Login).
- `/src/store` - Global state management using Zustand.
- `/src/utils` - Helper functions and Axios configuration.

## ☁️ Deployment

### Option 1: Azure Static Web Apps (Recommended)

1.  Push your code to GitHub.
2.  Create a "Static Web App" resource in Azure.
3.  Connect to your GitHub repo.
4.  **Build Presets:** Select "React".
    - **App Location:** `/frontend`
    - **Output Location:** `dist`
5.  Azure will automatically build and deploy the site.

### Option 2: Azure Web App (Node.js)

If deploying as a standard web app, ensure your startup command serves the static build files:

```bash
npm install && npm run build
npx serve -s dist
```
