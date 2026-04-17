// Exercise 6: JSON Parsing
// 目標：理解 app.use(express.json()) 在處理什麼
// 題目：將 JSON 字串轉換成 JavaScript 物件，並印出 tags 陣列中的第二個元素。

const jsonStr = '{"title": "Post 1", "tags": ["js", "node"]}';
const obj = JSON.parse(jsonStr);

console.log(obj.tags[1]);
