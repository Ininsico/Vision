# Vision AI - Advanced Text-to-Image Generation Platform

Vision AI is a state-of-the-art web application designed to generate high-fidelity images from textual descriptions. At its core lies a custom-trained transformer-based diffusion model, engineered to interpret complex prompts and render visually stunning outputs. This platform represents a complete full-stack solution, integrating a robust backend architecture with a modern, responsive frontend interface.

Developed at COMSATS University Islamabad, Abbottabad Campus.

![Vision AI Banner](frontend/public/Ininsicologo.png)

## Overview

Unlike standard wrappers around existing APIs, Vision AI implements a proprietary AI integration pipeline. The system leverage a custom-tuned model optimized for artistic coherence and prompt adherence. The architecture is built on the MERN stack (MongoDB, Express.js, React, Node.js), ensuring scalability, performance, and a seamless user experience.

## Key Features

### Core AI Technology
*   **Custom Diffusion Model**: Utilizes a specialized transformer-based architecture trained on high-quality datasets to deliver superior image generation capabilities.
*   **Optimized Inference Pipeline**: Engineered for low-latency generation (8-15 seconds) without compromising visual fidelity.
*   **Prompt Understanding**: Advanced natural language processing to accurately interpret user intent and stylistic nuances.

### User Experience
*   **Authentication & Security**: sophisticated user management system powered by Clerk, supporting email/password and social logins with secure session handling.
*   **Interactive Dashboard**: A personalized workspace for users to track generation history, manage credits, and view past creations.
*   **Community Showcase**: A curated public gallery featuring high-quality generations approved by administrators, fostering community engagement.
*   **Responsive Interface**: A "Deep Teal and Absolute White" themed UI built with Tailwind CSS and Framer Motion, offering a fluid experience across all devices.

### Administration & Control
*   **Comprehensive Admin Panel**: A dedicated interface for platform oversight.
*   **Content Moderation**: Tools for administrators to review, approve, or delete user-generated content before it appears in the public showcase.
*   **User Management**: Analytics and controls to monitor user activity and platform usage statistics.

## Technical Architecture

The application is structured as a decoupled monolith, with separate frontend and backend services communicating via a RESTful API.

### Frontend
*   **Framework**: React 18 with Vite for high-performance rendering.
*   **Language**: TypeScript for type-safe code and improved maintainability.
*   **Styling**: Tailwind CSS for utility-first design and responsive layouts.
*   **State Management**: React Hooks and Context API.
*   **Animation**: Framer Motion for complex, physics-based UI transitions.

### Backend
*   **Runtime**: Node.js and Express.js.
*   **Database**: MongoDB Atlas for scalable, document-based storage of user profiles and generation metadata.
*   **ODM**: Mongoose for rigorous data modeling and validation.
*   **AI Integration**: Custom service layer interfacing directly with the model inference engine.
*   **Security**: Helmet for HTTP header security, CORS configuration, and JWT-based authentication for administrative routes.

## Installation and Setup

Follow these instructions to deploy the application in a local development environment.

### Prerequisites
*   Node.js (v16.x or higher)
*   npm (v8.x or higher)
*   MongoDB Account (Atlas) or local MongoDB instance
*   Clerk Account and API Keys
*   Custom Model API Access Token

### 1. Backend Configuration

Navigate to the backend directory and install the necessary dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and configure the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
# Custom Model Configuration
HF_TOKEN=your_custom_model_token
HF_MODEL_URL=your_custom_model_endpoint
# Administration
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=secure_password
JWT_SECRET=your_jwt_secret
# Frontend Origin
FRONTEND_URL=http://localhost:5173
```

Start the backend server:

```bash
npm run dev
```

### 2. Frontend Configuration

Navigate to the frontend directory and install dependencies:

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:5000/api
VITE_BASE_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm run dev
```

Access the application at `http://localhost:5173`.

## Team and Credits

This project is the result of collaborative engineering at COMSATS University Islamabad, Abbottabad Campus.

*   **Huzaifa Safdar** - *Full Stack & DevOps Lead*
    *   Designed and implemented the complete frontend and backend infrastructure.
    *   Established robust CI/CD pipelines and deployment strategies.
    *   Optimized server performance and database architecture.

*   **Arslan Rathore** - *AI Engineer & Integration Specialist*
    *   Developed, trained, and fine-tuned the custom AI diffusion model.
    *   Engineered the inference pipeline and integrated ML services with the web application.
    *   Specialized in computer vision and natural language processing.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

**Contact Information**
*   GitHub: https://www.github.com/ininsico
*   Twitter: https://www.twitter.com/ininsico
*   LinkedIn: https://www.linkedin.com/in/arslan-rathore-ininsico
