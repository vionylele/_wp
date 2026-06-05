const cart = [
  { name: "Item 1", price: 10, quantity: 2 },
  { name: "Item 2", price: 15, quantity: 1 },
  { name: "Item 3", price: 20, quantity: 3 }
];

let total = 0;
for (let item of cart) {
  total += item.price * item.quantity;
}
console.log(`Total cart value: $${total}`); // Output: Total cart value: $85
