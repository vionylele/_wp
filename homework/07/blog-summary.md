# Express Blog Exercise Summary

This document contains summaries of 10 JavaScript exercises designed to help students understand how data flows from a database to web pages, object destructuring, and asynchronous callback patterns in Express.js.

---

## Exercise 1: Object Property Access

**File:** `01.property_access.js`

**Objective:** Understand how `post.title` works.

**Problem:** Declare an object named `post` with `id: 1`, `title: "Hello World"`, and `content: "Markdown content"`. Practice printing the title using both dot notation and bracket notation.

**Code:**
```javascript
const post = { id: 1, title: "Hello World", content: "Markdown content" };

// Dot notation
console.log(post.title);

// Bracket notation
console.log(post["title"]);
```

**Output:**
```
Hello World
Hello World
```

**Explanation:** Objects can be accessed using dot notation (`obj.key`) or bracket notation (`obj["key"]`). Both methods return the same value.

---

## Exercise 2: Object Destructuring

**File:** `02.destructuring.js`

**Objective:** Understand the syntax `const { title, content } = req.body;`.

**Problem:** Given a `req` object, extract `title` and `content` from `req.body` using a single line of code.

**Code:**
```javascript
const req = { body: { title: "JS教學", content: "內容在此", author: "Gemini" } };

const { title, content } = req.body;
console.log(title, content);
```

**Output:**
```
JS教學 內容在此
```

**Explanation:** Destructuring assignment allows you to extract properties from objects into variables with the same name. This is commonly used in Express routes: `const { title, content } = req.body;`.

---

## Exercise 3: Array forEach & Template Literals

**File:** `03.array_foreach.js`

**Objective:** Understand how blog index pages generate post lists.

**Problem:** Given an array of posts, iterate using `forEach` and build an HTML string with `<div>` elements.

**Code:**
```javascript
const posts = [{id: 1, t: "A"}, {id: 2, t: "B"}];
let html = "";

posts.forEach(post => {
    html += `<div>${post.t}</div>`;
});

console.log(html);
```

**Output:**
```
<div>A</div><div>B</div>
```

**Explanation:** Template literals (`` ` `` backticks) allow embedding expressions with `${}`. The `forEach` method iterates over array elements to build dynamic HTML.

---

## Exercise 4: Dictionary / URL Params

**File:** `04.url_params.js`

**Objective:** Understand where `req.params.id` comes from.

**Problem:** Create a `params` object and dynamically add a property with key `"id"` and value `99`.

**Code:**
```javascript
const params = {};
params["id"] = 99;

console.log(params);
console.log(params.id);
```

**Output:**
```
{ id: 99 }
99
```

**Explanation:** Objects in JavaScript act as dictionaries (key-value pairs). URL parameters like `/posts/:id` are stored in `req.params` as an object.

---

## Exercise 5: Callback Function - Error-First Pattern

**File:** `05.callback.js`

**Objective:** Understand the asynchronous design of `getPost(id, callback)`.

**Problem:** Write a `fetchData(id, callback)` function that creates a data object and passes it to the callback following the Node.js error-first convention.

**Code:**
```javascript
function fetchData(id, callback) {
    const fakeData = { id: id, status: "success" };
    callback(null, fakeData);
}

fetchData(101, (err, data) => {
    if (err) {
        console.log("Error: " + err);
    } else {
        console.log("Data retrieved:", data);
    }
});
```

**Output:**
```
Data retrieved: { id: 101, status: 'success' }
```

**Explanation:** The error-first callback pattern is a Node.js convention where the first argument is reserved for errors (`null` if no error). The second argument contains the data.

---

## Exercise 6: JSON Parsing

**File:** `06.json_parse.js`

**Objective:** Understand what `app.use(express.json())` does.

**Problem:** Convert a JSON string to a JavaScript object and print the second element of the `tags` array.

**Code:**
```javascript
const jsonStr = '{"title": "Post 1", "tags": ["js", "node"]}';
const obj = JSON.parse(jsonStr);

console.log(obj.tags[1]);
```

**Output:**
```
node
```

**Explanation:** `JSON.parse()` converts a JSON string into a JavaScript object. This is exactly what `express.json()` middleware does - parses incoming JSON request bodies.

---

## Exercise 7: Simulating Database Queries

**File:** `07.db_query.js`

**Objective:** Understand the structure of `db.get(sql, params, callback)`.

**Problem:** Write a `fakeGet(sql, params, callback)` function that simulates a database query and prints the result title.

**Code:**
```javascript
function fakeGet(sql, params, callback) {
    callback(null, { id: 1, title: "Fake Title", content: "This is content" });
}

fakeGet("SELECT * FROM posts WHERE id = ?", [1], (err, row) => {
    if (err) {
        console.error("Query failed");
    } else {
        console.log("Post title:", row.title);
    }
});
```

**Output:**
```
Post title: Fake Title
```

**Explanation:** This mimics the `sqlite3` library's `db.get()` API which takes SQL, parameters array, and a callback. The callback receives `(err, row)` following the error-first pattern.

---

## Exercise 8: Template Literals with Logic

**File:** `08.template_logic.js`

**Objective:** Understand how HTML templates are generated dynamically.

**Problem:** Create an HTML string using backticks. If `user` has a value, display it; otherwise display "Stranger".

**Code:**
```javascript
const user = "Guest";
const html = `<h1>Welcome, ${user || "Stranger"}</h1>`;

console.log(html);
```

**Output:**
```
<h1>Welcome, Guest</h1>
```

**Explanation:** Template literals support inline expressions. The `||` operator provides a fallback value when the first operand is falsy.

---

## Exercise 9: Sort & Substring

**File:** `09.sort_substring.js`

**Objective:** Understand SQL functions like `ORDER BY` and `substr` in JavaScript context.

**Problem:** Extract the first 10 characters of each string and append "...".

**Code:**
```javascript
const arr = ["Very long content here", "Another Very long content here", "3rd Very long content here"];
const result = arr.map(s => s.substring(0, 10) + "...");

console.log(result);
```

**Output:**
```
[ 'Very long ...', 'Another V...', '3rd Very ...' ]
```

**Explanation:** `substring(0, 10)` extracts characters from index 0 to 9. `map()` applies this to all array elements, useful for creating preview text like `SUBSTR(content, 1, 10)` in SQL.

---

## Exercise 10: Error-First Callback Pattern

**File:** `10.error_callback.js`

**Objective:** Understand the `if (err) return ...` pattern used throughout Express.

**Problem:** Write a `checkAdmin(role, callback)` function that denies access if role is not "admin", otherwise welcomes the user.

**Code:**
```javascript
function checkAdmin(role, callback) {
    if (role !== "admin") {
        callback("Access Denied");
    } else {
        callback(null, "Welcome");
    }
}

checkAdmin("guest", (err, msg) => {
    if (err) {
        console.log("Error:", err);
    } else {
        console.log("Success:", msg);
    }
});

checkAdmin("admin", (err, msg) => {
    if (err) {
        console.log("Error:", err);
    } else {
        console.log("Success:", msg);
    }
});
```

**Output:**
```
Error: Access Denied
Success: Welcome
```

**Explanation:** This pattern is the foundation of error handling in Node.js/Express. Every callback checks for errors first. This exercise demonstrates how all `db.xxx` operations follow this convention.

---

## Key Concepts Summary

| Concept | File | Express Usage |
|---------|------|--------------|
| Object Property Access | 01 | `post.title` |
| Destructuring | 02 | `const { title } = req.body` |
| forEach + Template Literals | 03 | Building HTML lists |
| URL Params (Dictionary) | 04 | `req.params.id` |
| Error-First Callback | 05, 10 | `getPost(id, (err, post) => {...})` |
| JSON Parsing | 06 | `express.json()` middleware |
| DB Query Simulation | 07 | `db.get(sql, params, callback)` |
| Template Logic | 08 | Dynamic HTML generation |

---

## Reference

This exercise set was generated using **opencode**, an interactive CLI tool that assists with software engineering tasks.

- **opencode** is an open-source project available at [https://github.com/anomalyco/opencode](https://github.com/anomalyco/opencode)
- **Website:** [https://opencode.ai](https://opencode.ai)

---

*Generated for Express Blog Practice (blog1form)*
