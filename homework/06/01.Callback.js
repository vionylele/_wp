function mathTool(n1, n2, callback) {
    return callback(n1, n2);
}

console.log(mathTool(10, 5, (a, b) => a + b));
console.log(mathTool(10, 5, (a, b) => a - b));
