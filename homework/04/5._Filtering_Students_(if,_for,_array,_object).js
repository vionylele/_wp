const students = [
  { name: "Alice", score: 45 },
  { name: "Bob", score: 72 },
  { name: "Charlie", score: 90 }
];

const passingStudents = [];

for (let s of students) {
  if (s.score >= 60) {
    passingStudents.push(s.name);
  }
}

console.log(`Students who passed: ${passingStudents.join(", ")}`); // Output: Students who passed: Bob, Charlie
