function findFruit(list, target) {
  for (let fruit of list) {
    if (fruit.toLowerCase() === target.toLowerCase()) {
      return true;
    }
  }
  return false;
}

const fruits = ["Apple", "Banana", "Cherry"];
console.log(findFruit(fruits, "banana")); // Output: true
