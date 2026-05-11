const API_BASE = '/api';
let studentSortColumn = 'id';
let studentSortAsc = true;

function navigateTo(pageId) {
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelector(`.nav-link[data-page="${pageId}"]`)?.classList.add('active');
  document.getElementById(pageId)?.classList.add('active');
}

function handleSort(column) {
  if (studentSortColumn === column) {
    studentSortAsc = !studentSortAsc;
  } else {
    studentSortColumn = column;
    studentSortAsc = true;
  }
  loadStudents();
}

function sortStudents(students) {
  return [...students].sort((a, b) => {
    let valA = a[studentSortColumn];
    let valB = b[studentSortColumn];
    if (valA === null || valA === undefined) valA = '';
    if (valB === null || valB === undefined) valB = '';
    if (typeof valA === 'number' && typeof valB === 'number') {
      return studentSortAsc ? valA - valB : valB - valA;
    }
    valA = String(valA).toLowerCase();
    valB = String(valB).toLowerCase();
    if (studentSortAsc) {
      return valA.localeCompare(valB);
    }
    return valB.localeCompare(valA);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupEventDelegation();
  loadDashboard();
  loadStudents();
  loadCourses();
  loadEnrollments();
  setupForms();
});

function setupNavigation() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      link.classList.add('active');
      document.getElementById(link.dataset.page).classList.add('active');
    });
  });
}

function setupEventDelegation() {
  document.body.addEventListener('click', (e) => {
    const target = e.target;
    const closeBtn = target.closest('.modal-close');
    
    if (closeBtn) {
      hideModal(closeBtn.dataset.modal);
      return;
    }
    
    const button = target.closest('button');
    if (!button) return;
    
    if (button.classList.contains('add-student')) {
      openStudentModal();
    } else if (button.classList.contains('add-course')) {
      openCourseModal();
    } else if (button.classList.contains('add-enrollment')) {
      openEnrollmentModal();
    } else if (button.classList.contains('edit-student')) {
      editStudent(parseInt(button.dataset.id));
    } else if (button.classList.contains('delete-student')) {
      deleteStudent(parseInt(button.dataset.id));
    } else if (button.classList.contains('edit-course')) {
      editCourse(parseInt(button.dataset.id));
    } else if (button.classList.contains('delete-course')) {
      deleteCourse(parseInt(button.dataset.id));
    } else if (button.classList.contains('delete-enrollment')) {
      deleteEnrollment(parseInt(button.dataset.id));
    }
  });
}

function openStudentModal() {
  document.getElementById('studentId').value = '';
  document.getElementById('studentForm').reset();
  document.getElementById('studentModalTitle').textContent = 'Add Student';
  showModal('studentModal');
}

function openCourseModal() {
  document.getElementById('courseId').value = '';
  document.getElementById('courseForm').reset();
  document.getElementById('courseModalTitle').textContent = 'Add Course';
  showModal('courseModal');
}

function openEnrollmentModal() {
  document.getElementById('enrollmentForm').reset();
  loadEnrollmentDropdowns();
  showModal('enrollmentModal');
}

async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  console.log('API Request:', options.method || 'GET', url);
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    cache: 'no-cache',
    ...options
  });
  console.log('Response status:', response.status);
  if (!response.ok) {
    const error = await response.json();
    console.log('Error response:', error);
    throw new Error(error.error || 'Request failed');
  }
  return response.json();
}

async function loadDashboard() {
  try {
    const data = await apiRequest('/dashboard');
    document.getElementById('stat-students').textContent = data.totalStudents;
    document.getElementById('stat-courses').textContent = data.totalCourses;
    document.getElementById('stat-enrollments').textContent = data.totalEnrollments;
    
    const tbody = document.querySelector('#recent-table tbody');
    tbody.innerHTML = data.recentStudents.map(s => `
      <tr>
        <td>${s.id}</td>
        <td>${s.name}</td>
        <td>${s.email}</td>
        <td>${s.grade || '-'}</td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error loading dashboard:', error);
  }
}

async function loadStudents() {
  try {
    const students = await apiRequest('/students');
    const sorted = sortStudents(students);
    const tbody = document.querySelector('#students-table tbody');
    tbody.innerHTML = sorted.map(s => `
      <tr>
        <td>${s.id}</td>
        <td>${s.name}</td>
        <td>${s.email}</td>
        <td>${s.phone || '-'}</td>
        <td>${s.grade || '-'}</td>
        <td>${s.enrollment_date || '-'}</td>
        <td>
          <button class="btn btn-warning edit-student" data-id="${s.id}">Edit</button>
          <button class="btn btn-danger delete-student" data-id="${s.id}">Delete</button>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error loading students:', error);
  }
}

async function loadCourses() {
  try {
    const courses = await apiRequest('/courses');
    const tbody = document.querySelector('#courses-table tbody');
    tbody.innerHTML = courses.map(c => `
      <tr>
        <td>${c.id}</td>
        <td>${c.code}</td>
        <td>${c.name}</td>
        <td>${c.credits}</td>
        <td>${c.instructor || '-'}</td>
        <td>
          <button class="btn btn-warning edit-course" data-id="${c.id}">Edit</button>
          <button class="btn btn-danger delete-course" data-id="${c.id}">Delete</button>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error loading courses:', error);
  }
}

async function loadEnrollmentDropdowns() {
  try {
    const [students, courses] = await Promise.all([
      fetch('/api/students').then(r => r.ok ? r.json() : []),
      fetch('/api/courses').then(r => r.ok ? r.json() : [])
    ]);
    
    const studentSelect = document.getElementById('enrollmentStudent');
    const courseSelect = document.getElementById('enrollmentCourse');
    
    if (studentSelect) {
      studentSelect.innerHTML = '<option value="">Select a student</option>' + 
        (Array.isArray(students) ? students.map(s => `<option value="${s.id}">${s.name}</option>`).join('') : '');
    }
    if (courseSelect) {
      courseSelect.innerHTML = '<option value="">Select a course</option>' + 
        (Array.isArray(courses) ? courses.map(c => `<option value="${c.id}">${c.code} - ${c.name}</option>`).join('') : '');
    }
  } catch (error) {
    console.error('Error loading enrollment dropdowns:', error);
  }
}

async function loadEnrollments() {
  try {
    const [enrollments, students, courses] = await Promise.all([
      apiRequest('/enrollments'),
      apiRequest('/students'),
      apiRequest('/courses')
    ]);
    
    const studentSelect = document.getElementById('enrollmentStudent');
    const courseSelect = document.getElementById('enrollmentCourse');
    studentSelect.innerHTML = students.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
    courseSelect.innerHTML = courses.map(c => `<option value="${c.id}">${c.code} - ${c.name}</option>`).join('');
    
    const tbody = document.querySelector('#enrollments-table tbody');
    tbody.innerHTML = enrollments.map(e => `
      <tr>
        <td>${e.id}</td>
        <td>${e.student_name}</td>
        <td>${e.course_code} - ${e.course_name}</td>
        <td>${e.semester}</td>
        <td>${e.grade !== null && e.grade !== undefined ? e.grade : '-'}</td>
        <td>
          <button class="btn btn-danger delete-enrollment" data-id="${e.id}">Delete</button>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error loading enrollments:', error);
  }
}

function setupForms() {
  document.getElementById('studentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('studentId').value;
    const data = {
      name: document.getElementById('studentName').value,
      email: document.getElementById('studentEmail').value,
      phone: document.getElementById('studentPhone').value,
      grade: parseInt(document.getElementById('studentGrade').value) || null,
      enrollment_date: document.getElementById('studentEnrollmentDate').value
    };
    
    const numericId = id ? parseInt(id) : null;
    if (numericId) {
      const response = await fetch('/api/students/' + encodeURIComponent(String(numericId)), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const errData = await response.json();
        alert(errData.error || 'Update failed');
        hideModal('studentModal');
        return;
      }
    } else {
      const studentsRes = await fetch('/api/students');
      const students = await studentsRes.json();
      let nextId = 1;
      if (students.length > 0) {
        const maxId = Math.max(...students.map(s => s.id));
        nextId = maxId + 1;
      }
      data.id = nextId;
      await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    }
    loadStudents();
    loadDashboard();
    loadEnrollmentDropdowns();
    hideModal('studentModal');
    document.getElementById('studentForm').reset();
  });
  
  document.getElementById('courseForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('courseId').value;
    const data = {
      code: document.getElementById('courseCode').value,
      name: document.getElementById('courseName').value,
      credits: parseInt(document.getElementById('courseCredits').value) || null,
      instructor: document.getElementById('courseInstructor').value
    };
    
    const numericId = id ? parseInt(id) : null;
    if (numericId) {
      const response = await fetch('/api/courses/' + encodeURIComponent(String(numericId)), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const errData = await response.json();
        alert(errData.error || 'Update failed');
        hideModal('courseModal');
        return;
      }
    } else {
      await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    }
    loadCourses();
    loadDashboard();
    loadEnrollmentDropdowns();
    hideModal('courseModal');
    document.getElementById('courseForm').reset();
  });
  
  document.getElementById('enrollmentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const studentId = document.getElementById('enrollmentStudent').value;
    const courseId = document.getElementById('enrollmentCourse').value;
    const gradeValue = document.getElementById('enrollmentGrade').value;
    const data = {
      student_id: studentId ? parseInt(studentId) : null,
      course_id: courseId ? parseInt(courseId) : null,
      semester: document.getElementById('enrollmentSemester').value,
      grade: gradeValue ? parseInt(gradeValue) : null
    };
    
    if (!data.student_id || !data.course_id) {
      alert('Please select a student and course');
      return;
    }
    
    if (data.grade !== null && (data.grade < 0 || data.grade > 100)) {
      alert('Grade must be between 0 and 100');
      return;
    }
    
    const response = await fetch('/api/enrollments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      const errData = await response.json();
      alert(errData.error || 'Failed to create enrollment');
      return;
    }
    hideModal('enrollmentModal');
    loadEnrollments();
    loadDashboard();
    document.getElementById('enrollmentForm').reset();
  });
}

async function editStudent(id) {
  const endpoint = '/api/students/' + encodeURIComponent(String(id));
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  if (!response.ok) {
    const err = await response.json();
    alert(err.error || 'Failed to load student');
    return;
  }
  const student = await response.json();
  document.getElementById('studentId').value = student.id;
  document.getElementById('studentName').value = student.name;
  document.getElementById('studentEmail').value = student.email;
  document.getElementById('studentPhone').value = student.phone || '';
  document.getElementById('studentGrade').value = student.grade || '';
  document.getElementById('studentEnrollmentDate').value = student.enrollment_date || '';
  document.getElementById('studentModalTitle').textContent = 'Edit Student';
  showModal('studentModal');
}

async function deleteStudent(id) {
  if (!confirm('Delete this student?')) return;
  
  const rowToDelete = document.querySelector(`.delete-student[data-id="${id}"]`)?.closest('tr');
  if (rowToDelete) rowToDelete.remove();
  loadDashboard();
  
  try {
    const endpoint = '/api/students/' + encodeURIComponent(String(id));
    const response = await fetch(endpoint, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Delete failed');
    }
    loadEnrollments();
    
    const studentsRes = await fetch('/api/students');
    const students = await studentsRes.json();
    for (let i = 0; i < students.length; i++) {
      const expectedId = i + 1;
      if (students[i].id !== expectedId) {
        await fetch('/api/students/' + encodeURIComponent(String(students[i].id)), {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: expectedId, name: students[i].name, email: students[i].email, phone: students[i].phone, grade: students[i].grade, enrollment_date: students[i].enrollment_date })
        });
      }
    }
    await loadStudents();
  } catch (error) {
    if (error.message.includes('not found')) {
      await loadStudents();
    } else {
      await loadStudents();
      alert('Delete error: ' + error.message);
    }
  }
}

async function editCourse(id) {
  const endpoint = '/api/courses/' + encodeURIComponent(String(id));
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  if (!response.ok) {
    const err = await response.json();
    alert(err.error || 'Failed to load course');
    return;
  }
  const course = await response.json();
  document.getElementById('courseId').value = course.id;
  document.getElementById('courseCode').value = course.code;
  document.getElementById('courseName').value = course.name;
  document.getElementById('courseCredits').value = course.credits || '';
  document.getElementById('courseInstructor').value = course.instructor || '';
  document.getElementById('courseModalTitle').textContent = 'Edit Course';
  showModal('courseModal');
}

async function deleteCourse(id) {
  if (!confirm('Delete this course?')) return;
  
  const rowToDelete = document.querySelector(`.delete-course[data-id="${id}"]`)?.closest('tr');
  if (rowToDelete) rowToDelete.remove();
  loadDashboard();
  
  try {
    const endpoint = '/api/courses/' + encodeURIComponent(String(id));
    const response = await fetch(endpoint, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Delete failed');
    }
  } catch (error) {
    await loadCourses();
    alert('Delete error: ' + error.message);
  }
}

async function deleteEnrollment(id) {
  if (!confirm('Delete this enrollment?')) return;
  
  const rowToDelete = document.querySelector(`.delete-enrollment[data-id="${id}"]`)?.closest('tr');
  if (rowToDelete) rowToDelete.remove();
  loadDashboard();
  
  try {
    const endpoint = '/api/enrollments/' + encodeURIComponent(String(id));
    const response = await fetch(endpoint, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Delete failed');
    }
  } catch (error) {
    await loadEnrollments();
    alert('Delete error: ' + error.message);
  }
}

function showModal(id) {
  document.getElementById(id).classList.add('show');
}

function hideModal(id) {
  document.getElementById(id).classList.remove('show');
  document.getElementById(id).querySelector('form')?.reset();
  document.getElementById(id).querySelectorAll('input[type="hidden"]').forEach(i => i.value = '');
  const titles = { studentModal: 'Add Student', courseModal: 'Add Course', enrollmentModal: 'Add Enrollment' };
  const titleEl = document.getElementById(id + 'Title');
  if (titleEl) titleEl.textContent = titles[id] || '';
}

async function resetDatabase() {
  if (!confirm('Are you sure you want to delete ALL data? This cannot be undone!')) return;
  
  try {
    const response = await fetch('/api/reset', { method: 'POST' });
    if (!response.ok) throw new Error('Reset failed');
    alert('All data has been reset!');
    loadDashboard();
    loadStudents();
    loadCourses();
    loadEnrollments();
  } catch (error) {
    alert('Reset error: ' + error.message);
  }
}