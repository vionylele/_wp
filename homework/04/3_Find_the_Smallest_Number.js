const numbers = [10, 3, 8, 1, 5];
let min = numbers[0];

for (let i = 1; i < numbers.length; i++) {
  if (numbers[i] < min) {
    min = numbers[i];
  }
}

console.log(`The smallest number is: ${min}`); // Output: The smallest number is: 1
