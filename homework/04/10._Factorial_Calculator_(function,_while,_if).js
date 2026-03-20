function calculateFactorial(n) {
  if (n < 0) return "Invalid";
  let result = 1;
  while (n > 1) {
    result *= n;
    n--;
  }
  return result;
}

console.log(`Factorial of 5 is: ${calculateFactorial(5)}`); // Output: Factorial of 5 is: 120
