# SEP Project created
# Setup and Execution Instructions
Project Overview

This system consists of two main components:

Backend (Server): Handles authentication, database operations, and event request APIs.

Frontend (Client): Provides the user interface for manager login, event creation, and request management.

1. Prerequisites

Before running the system, ensure the following are installed:

Node.js (version 18 or higher)

npm (comes with Node.js)

MongoDB (running locally or accessible remotely)

2. Backend Setup

Open a terminal and navigate to the backend folder:

cd backend


Install all required dependencies:

npm install


Create a .env file inside the backend directory and add:

PORT=8000
MONGO_URI=mongodb://localhost:27017/eventdb
JWT_SECRET=your_secret_key


Start the MongoDB server (if running locally):

mongod


Run the backend server:

npm start


The backend will run at http://localhost:8000

3. Frontend Setup

Open another terminal and navigate to the frontend folder:

cd frontend


Install dependencies:

npm install


Start the development server:

npm run dev


The frontend will run at http://localhost:5173

4. Accessing the System

Open your browser and go to http://localhost:5173

Log in using:

Email: ahsan@example.com

Password: 123456

After successful login, you can create and manage event requests.

5. Notes

The backend and frontend must run simultaneously.

Ensure MongoDB is active before starting the backend.

The JWT token is automatically stored in the browser’s local storage for authentication.