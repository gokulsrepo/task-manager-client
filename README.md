## Task Manager Application (MERN Stack)

# Overview
This is a Task Manager Application built using the MERN stack (MongoDB, Express.js, React, Node.js) with Vite.js as the frontend build tool. It allows users to manage tasks effectively with CRUD operations.

# Features
- Task management (create, read, update, delete tasks)
- Responsive UI for desktop and mobile

# Setup Locally (for front-end)
To run this application locally, follow these steps:

Clone the repository:
```
git clone https://github.com/gokulsrepo/task-manager-client.git
cd task-manager-client
```
Install dependencies:
```
npm install
```
Update API URL:

In src/global.js, change API_URL to point to your local backend server:
```
export const API_URL = 'http://localhost:4000';
```
# Running the Application:

Start the frontend server:
```
npm run dev
```
Your front-end will be running at http://localhost:5173/.

Before accessing the application complete the installation for backend. (https://github.com/gokulsrepo/task-manager-server)
