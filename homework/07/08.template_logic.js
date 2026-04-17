// Exercise 8: Template Literals with Logic
// 目標：理解網頁 HTML 模板的產生
// 題目：使用反引號建立 HTML 字串，如果 user 有值就顯示 user，否則顯示 "Stranger"。

const user = "Guest";
const html = `<h1>Welcome, ${user || "Stranger"}</h1>`;

console.log(html);
