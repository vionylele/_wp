const users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 17 }
];

const adultUsers = users.filter(user => user.age >= 18);
console.log(adultUsers);
