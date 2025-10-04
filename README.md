# Employee Management Dashboard

A full-stack employee management system with a **React frontend** and a **Node.js + SQLite backend**.

---

## Tech Stack

- Frontend: React.js
- Backend: Node.js + Express.js
- Database: SQLite (in-memory for testing)
- Testing: Jest + Supertest

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/employee-management-dashboard.git
# Backend setup
cd backend 

# OR Frontend setup
cd frontend
cd employee_app

# Install dependencies
npm install

# Run the app for frontend
npm run dev

# OR run the backend using
nodemon server.js

```

### Run Test cases

- npm test

---

### API Endpoints

- GET - /api/employees
- GET - /api/employees/:id
- POST - /api/employees
- PUT - /api/employees/:id
- DELETE - /api/employees/:id

---

### Assumptions and Design Checks

- Used in-memory SQLite for simplicity and fast testing
- Separated frontend/backend for clear modular structure
- Only backend is covered by unit tests using Jest
- Input validation is enforced on the API layer

---
