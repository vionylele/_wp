// Exercise 9: Sort & Substring
// 目標：理解 SQL 語法在 JS 端的預習邏輯（例如 ORDER BY, substr）
// 題目：取出字串的前 10 個字元，並在後方加上 "..."。

const arr = ["Very long content here", "Another Very long content here", "3rd Very long content here"];
const result = arr.map(s => s.substring(0, 10) + "...");

console.log(result);
