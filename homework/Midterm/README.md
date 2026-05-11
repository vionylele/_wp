# School Administration System

## Project Overview
A full-stack web application for managing school operations including student records, courses, and enrollments. Built with Node.js/Express backend and SQLite database.

## Technology Stack
- **Backend**: Node.js, Express.js
- **Database**: SQLite (via sql.js)
- **Frontend**: Vanilla HTML, CSS, JavaScript

## Features
- **Dashboard**: Overview statistics and recent students
- **Student Management**: Add, edit, delete, view students
- **Course Management**: Add, edit, delete, view courses
- **Enrollment Management**: Enroll students in courses, track grades

## Project Structure
```
Midterm/
├── server.js          # Express server with API routes
├── package.json      # Dependencies
├── public/
│   ├── index.html    # Main HTML interface
│   ├── styles.css    # Styling
│   └── app.js        # Frontend JavaScript
└── school.db        # SQLite database (auto-generated)
```

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/students | List all students |
| POST | /api/students | Create student |
| GET | /api/students/:id | Get student |
| PUT | /api/students/:id | Update student |
| DELETE | /api/students/:id | Delete student |
| GET | /api/courses | List all courses |
| POST | /api/courses | Create course |
| PUT | /api/courses/:id | Update course |
| DELETE | /api/courses/:id | Delete course |
| GET | /api/enrollments | List enrollments |
| POST | /api/enrollments | Create enrollment |
| DELETE | /api/enrollments/:id | Delete enrollment |
| GET | /api/dashboard | Dashboard statistics |

## Running the Project
```bash
npm install
npm start
```
Server runs on http://localhost:3000

## Database Schema
- **students**: id, name, email, phone, grade, enrollment_date
- **courses**: id, code, name, credits, instructor
- **enrollments**: id, student_id, course_id, semester, grade