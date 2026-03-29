## Exercise 4 

AI Q&A -- https://gemini.google.com/share/54d5fcd5f911

## My test results

```sh
....

node 1_Basic_Grade_Classifier.js
Your grade is: B
node 2_The_Accumulator.js
Total sum: 15
node 3_Find_the_Smallest_Number.js
The smallest number is: 1
node 4_User_Profile_Management.js
{ name: "John Doe", age: 31, email: "john.doe@example.com" }
node 5_Filtering_Students.js
Students who passed: Bob, Charlie
Laptop is available for $1200
node 6_JSON_Data_Parsing.js
node 7_Shopping_Cart_Total.js
Total cart value: $85
node 8_Search_for_a_Fruit.js
true
node 9_Nested_Data_Access.js
Room 101 is taught by Mr. Smith
Room 102 is taught by Ms. Johnson
node 10_Factorial_Calculator.js
Factorial of 5 is: 120
```

## Summary

To make the program flow easier to understand, I organized each exercise with the full test code and expected console output below:

---

### 1. Basic Grade Classifier
**Code:**
```javascript
function getGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  return "F";
}

console.log(`Your grade is: ${getGrade(85)}`);
```
**Expected output:**
> Your grade is: B

---

### 2. Accumulator
**Code:**
```javascript
let limit = 5;
let sum = 0;
let i = 1;
while (i <= limit) {
  sum += i;
  i++;
}
console.log(`Total sum: ${sum}`);
```
**Expected output:**
> Total sum: 15

---

### 3. Smallest Number in Array
**Code:**
```javascript
const numbers = [10, 3, 8, 1, 5];
let min = numbers[0];
for (let i = 1; i < numbers.length; i++) {
  if (numbers[i] < min) {
    min = numbers[i];
  }
}
console.log(`The smallest number is: ${min}`);
```
**Expected output:**
> The smallest number is: 1

---

### 4. User Profile Update
**Code:**
```javascript
const userProfile = {
  name: "John Doe",
  age: 30,
  email: "john.doe@example.com"
};

function updateUserProfile(profile, key, value) {
  profile[key] = value;
}

updateUserProfile(userProfile, "age", 31);
console.log(userProfile);
```
**Expected output:**
> { name: "John Doe", age: 31, email: "john.doe@example.com" }

---

### 5. Filtering Students
**Code:**
```javascript
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
console.log(`Students who passed: ${passingStudents.join(", ")}`);
```
**Expected output:**
> Students who passed: Bob, Charlie

---

### 6. JSON Parsing and Stock Check
**Code:**
```javascript
const jsonString = '{"product": "Laptop", "price": 1200, "stock": 5}';
const productData = JSON.parse(jsonString);

if (productData.stock > 0) {
  console.log(`${productData.product} is available for $${productData.price}`);
}
```
**Expected output:**
> Laptop is available for $1200

---

### 7. Shopping Cart Total
**Code:**
```javascript
const cart = [
  { name: "Item 1", price: 10, quantity: 2 },
  { name: "Item 2", price: 15, quantity: 1 },
  { name: "Item 3", price: 20, quantity: 3 }
];

let total = 0;
for (let item of cart) {
  total += item.price * item.quantity;
}
console.log(`Total cart value: $${total}`);
```
**Expected output:**
> Total cart value: $95

---

### 8. Fruit Search
**Code:**
```javascript
function findFruit(list, target) {
  for (let fruit of list) {
    if (fruit.toLowerCase() === target.toLowerCase()) {
      return true;
    }
  }
  return false;
}

const fruits = ["Apple", "Banana", "Cherry"];
console.log(findFruit(fruits, "banana"));
```
**Expected output:**
> true

---

### 9. Classroom Data Output
**Code:**
```javascript
const school = [
  { room: 101, teacher: "Mr. Smith" },
  { room: 102, teacher: "Ms. Johnson" }
];
for (let classroom of school) {
  console.log(`Room ${classroom.room} is taught by ${classroom.teacher}`);
}
```
**Expected output:**
> Room 101 is taught by Mr. Smith
> Room 102 is taught by Ms. Johnson

---

### 10. Factorial Calculator
**Code:**
```javascript
function calculateFactorial(n) {
  if (n < 0) return "Invalid";
  let result = 1;
  while (n > 1) {
    result *= n;
    n--;
  }
  return result;
}

console.log(`Factorial of 5 is: ${calculateFactorial(5)}`);
```
**Expected output:**
> Factorial of 5 is: 120

---

These exercises cover core JS concepts like if, while, for, arrays, objects, and JSON parsing. If you want, I can rewrite them in modern ES6+ style.

