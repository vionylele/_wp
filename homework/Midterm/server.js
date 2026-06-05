const express = require('express');
const cors = require('cors');
const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let db;

async function initDatabase() {
  const SQL = await initSqlJs();
  const dbPath = path.join(__dirname, 'school.db');
  
  if (fs.existsSync(dbPath)) {
    const fileBuffer = fs.readFileSync(dbPath);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }
  
  db.run(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE,
      phone TEXT,
      grade INTEGER,
      enrollment_date TEXT
    )
  `);
  
  db.run(`
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE,
      name TEXT NOT NULL,
      credits INTEGER,
      instructor TEXT
    )
  `);
  
  db.run(`
    CREATE TABLE IF NOT EXISTS enrollments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER,
      course_id INTEGER,
      semester TEXT,
      grade TEXT,
      FOREIGN KEY (student_id) REFERENCES students(id),
      FOREIGN KEY (course_id) REFERENCES courses(id)
    )
  `);
  
  saveDatabase();
}

function saveDatabase() {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(path.join(__dirname, 'school.db'), buffer);
}

function queryAll(sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const results = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }
  stmt.free();
  return results;
}

function queryOne(sql, params = []) {
  const results = queryAll(sql, params);
  return results[0] || null;
}

function runQuery(sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  stmt.step();
  stmt.free();
  saveDatabase();
  return db.getRowsModified();
}

// Students API
app.get('/api/students', (req, res) => {
  try {
    const students = queryAll('SELECT * FROM students ORDER BY name');
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/students/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const student = queryOne('SELECT * FROM students WHERE id = ?', [id]);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/students', (req, res) => {
  try {
    const { id, name, email, phone, grade, enrollment_date } = req.body;
    if (id) {
      runQuery(
        'INSERT INTO students (id, name, email, phone, grade, enrollment_date) VALUES (?, ?, ?, ?, ?, ?)',
        [id, name, email, phone, grade, enrollment_date]
      );
    } else {
      runQuery(
        'INSERT INTO students (name, email, phone, grade, enrollment_date) VALUES (?, ?, ?, ?, ?)',
        [name, email, phone, grade, enrollment_date]
      );
    }
    res.json({ message: 'Student created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/students/:id', (req, res) => {
  try {
    const { id, name, email, phone, grade, enrollment_date } = req.body;
    const oldId = parseInt(req.params.id);
    if (id && id !== oldId) {
      runQuery(
        'UPDATE students SET id = ?, name = ?, email = ?, phone = ?, grade = ?, enrollment_date = ? WHERE id = ?',
        [id, name, email, phone, grade, enrollment_date, oldId]
      );
    } else {
      runQuery(
        'UPDATE students SET name = ?, email = ?, phone = ?, grade = ?, enrollment_date = ? WHERE id = ?',
        [name, email, phone, grade, enrollment_date, oldId]
      );
    }
    res.json({ message: 'Student updated successfully', success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/students/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    runQuery('DELETE FROM enrollments WHERE student_id = ?', [id]);
    runQuery('DELETE FROM students WHERE id = ?', [id]);
    
    // Anggap selalu berhasil (Idempotent)
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Courses API
app.get('/api/courses', (req, res) => {
  try {
    const courses = queryAll('SELECT * FROM courses ORDER BY code');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/courses/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const course = queryOne('SELECT * FROM courses WHERE id = ?', [id]);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/courses', (req, res) => {
  try {
    const { code, name, credits, instructor } = req.body;
    runQuery(
      'INSERT INTO courses (code, name, credits, instructor) VALUES (?, ?, ?, ?)',
      [code, name, credits, instructor]
    );
    res.json({ message: 'Course created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/courses/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { code, name, credits, instructor } = req.body;
    runQuery(
      'UPDATE courses SET code = ?, name = ?, credits = ?, instructor = ? WHERE id = ?',
      [code, name, credits, instructor, id]
    );
    res.json({ message: 'Course updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/courses/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    runQuery('DELETE FROM enrollments WHERE course_id = ?', [id]);
    runQuery('DELETE FROM courses WHERE id = ?', [id]);
    
    // Anggap selalu berhasil (Idempotent)
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Enrollments API

app.get('/api/enrollments', (req, res) => {
  try {
    db.run('DELETE FROM enrollments WHERE student_id NOT IN (SELECT id FROM students) OR course_id NOT IN (SELECT id FROM courses)');
    const enrollments = queryAll(`
      SELECT e.id, e.student_id, e.course_id, e.semester, e.grade,
             s.name as student_name, c.name as course_name, c.code as course_code
      FROM enrollments e
      JOIN students s ON e.student_id = s.id
      JOIN courses c ON e.course_id = c.id
      ORDER BY e.id
    `);
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/enrollments/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const enrollment = queryOne(`
      SELECT e.id, e.student_id, e.course_id, e.semester, e.grade,
             s.name as student_name, c.name as course_name, c.code as course_code
      FROM enrollments e
      JOIN students s ON e.student_id = s.id
      JOIN courses c ON e.course_id = c.id
      WHERE e.id = ?
    `, [id]);
    
    if (!enrollment) return res.status(404).json({ error: 'Enrollment not found' });
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/enrollments', (req, res) => {
  try {
    const { student_id, course_id, semester, grade } = req.body;
    runQuery(
      'INSERT INTO enrollments (student_id, course_id, semester, grade) VALUES (?, ?, ?, ?)',
      [student_id, course_id, semester, grade || null]
    );
    res.json({ message: 'Enrollment created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/enrollments/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { student_id, course_id, semester, grade } = req.body;
    
    runQuery(
      'UPDATE enrollments SET student_id = ?, course_id = ?, semester = ?, grade = ? WHERE id = ?',
      [student_id, course_id, semester, grade, id]
    );
    
    res.json({ message: 'Enrollment updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/enrollments/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    runQuery('DELETE FROM enrollments WHERE id = ?', [id]);
    
    // Anggap selalu berhasil (Idempotent)
    res.json({ message: 'Enrollment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Dashboard API
app.get('/api/dashboard', (req, res) => {
  try {
    db.run('DELETE FROM enrollments WHERE student_id NOT IN (SELECT id FROM students) OR course_id NOT IN (SELECT id FROM courses)');
    const totalStudents = queryOne('SELECT COUNT(*) as count FROM students');
    const totalCourses = queryOne('SELECT COUNT(*) as count FROM courses');
    const totalEnrollments = queryOne('SELECT COUNT(*) as count FROM enrollments');
    const recentStudents = queryAll('SELECT * FROM students ORDER BY id DESC LIMIT 5');
    res.json({
      totalStudents: totalStudents.count,
      totalCourses: totalCourses.count,
      totalEnrollments: totalEnrollments.count,
      recentStudents
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, async () => {
  await initDatabase();
  console.log(`Server running on http://localhost:${PORT}`);
});

app.post('/api/reset', async (req, res) => {
  try {
    db.run('DELETE FROM enrollments');
    db.run('DELETE FROM students');
    db.run('DELETE FROM courses');
    db.run("DELETE FROM sqlite_sequence WHERE name IN ('students', 'courses', 'enrollments')");
    const dbPath = path.join(__dirname, 'school.db');
    const data = db.export();
    fs.writeFileSync(dbPath, Buffer.from(data));
    res.json({ message: 'Database reset successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});