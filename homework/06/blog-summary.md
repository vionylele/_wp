# JavaScript Advanced Functions & Array Operations

## References

- AI Gemini: https://gemini.google.com/share/909a01223018
- blog-summary.md created by: OpenCode

---

## 1. Callback Basics

```javascript
function mathTool(n1, n2, callback) {
    return callback(n1, n2);
}

console.log(mathTool(10, 5, (a, b) => a + b)); // 15
console.log(mathTool(10, 5, (a, b) => a - b)); // 5
```

**Explanation:** The `mathTool` function accepts two numbers and a callback function. Different anonymous functions are passed to perform addition and subtraction.

---

## 2. Anonymous Function & IIFE (Immediately Invoked Function Expression)

```javascript
(function() {
    const count = 100;
    console.log("Count is: " + count);
})();
```

**Output:**
```
Count is: 100
```

**Explanation:** IIFE is a function that executes immediately. The `count` variable is scoped inside the function, making it inaccessible from outside.

---

## 3. Arrow Function & Array Transformation

```javascript
const prices = [100, 200, 300, 400];
const discountedPrice = prices.map(price => price * 0.8);
console.log(discountedPrice);
```

**Output:**
```
[80, 160, 240, 320]
```

**Explanation:** The `map` method with an arrow function applies 20% discount (multiply by 0.8) to each element, returning a new array.

---

## 4. Destructive Array Modification

```javascript
function cleanData(arr) {
    arr.pop();
    arr.unshift("Start");
}

let myData = [1, 2, 3];
cleanData(myData);
console.log(myData);
```

**Output:**
```
["Start", 1, 2]
```

**Explanation:** Arrays in JavaScript are passed by reference. Modifying the array inside the function affects the original `myData`. `pop()` removes the last element, `unshift()` adds "Start" at the beginning.

---

## 5. Higher-Order Function (Function Returning Function)

```javascript
function multiplier(factor) {
    return (n) => n * factor;
}

const double = multiplier(2);
console.log(double(10)); // 20
```

**Output:**
```
20
```

**Explanation:** `multiplier` returns another function. When called with `2`, it returns a function that multiplies any number by 2.

---

## 6. Callback Filter (Custom Filter Function)

```javascript
function myFilter(arr, callback) {
    const result = [];
    for (let item of arr) {
        if (callback(item)) {
            result.push(item);
        }
    }
    return result;
}

const numbers = [1, 5, 8, 12];
const filteredNumbers = myFilter(numbers, num => num > 7);
console.log(filteredNumbers);
```

**Output:**
```
[8, 12]
```

**Explanation:** `myFilter` mimics the native `filter` method. It iterates through the array and includes elements for which the callback returns `true`.

---

## 7. Arrow Function with Objects

```javascript
const users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 17 }
];

const adultUsers = users.filter(user => user.age >= 18);
console.log(adultUsers);
```

**Output:**
```
[{ name: "Alice", age: 25 }]
```

**Explanation:** The `filter` method combined with an arrow function filters the array of objects based on the `age` property.

---

## 8. Pass by Reference Trap: Reassignment vs Modification

```javascript
let listA = [1, 2];
let listB = [3, 4];

function process(a, b) {
    a.push(99);
    b = [100];
}

process(listA, listB);

console.log("listA:", listA);
console.log("listB:", listB);
```

**Output:**
```
listA: [1, 2, 99]
listB: [3, 4]
```

**Explanation:**
- `listA` is modified by `push()` because arrays are passed by reference.
- `listB` reassignment inside the function only affects the local parameter `b`, not the original `listB`.

---

## 9. Delayed Callback with setTimeout

```javascript
setTimeout(() => {
    console.log(["Task", "Completed"].join(" "));
}, 2000);
```

**Output (after 2 seconds):**
```
Task Completed
```

**Explanation:** `setTimeout` delays execution of the arrow function by 2000 milliseconds (2 seconds).

---

## 10. Calculate Total (Combined Application)

```javascript
function calculateTotal(cart, discountFunc) {
    const total = cart.reduce((acc, curr) => acc + curr, 0);
    return discountFunc(total);
}

const cart = [100, 200, 300];
const finalTotal = calculateTotal(cart, (total) => total - 50);
console.log(finalTotal);
```

**Output:**
```
550
```

**Explanation:** The function sums all cart items using `reduce`, then passes the total to the discount callback function to apply a fixed $50 discount.
