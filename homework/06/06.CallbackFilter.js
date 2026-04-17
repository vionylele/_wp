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
