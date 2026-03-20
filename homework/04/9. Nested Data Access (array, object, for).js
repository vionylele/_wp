const school = [
  { room: 101, teacher: "Mr. Smith" },
  { room: 102, teacher: "Ms. Johnson" }
];

for (let classroom of school) {
  console.log(`Room ${classroom.room} is taught by ${classroom.teacher}`); 
}
// Output: Room 101 is taught by Mr. Smith
//         Room 102 is taught by Ms. Johnson
