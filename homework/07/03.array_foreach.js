// Exercise 3: Array forEach & Template Literals
// 目標：理解部落格首頁如何產生文章列表
// 題目：給定一個陣列，請使用 forEach 遍歷並將每個物件轉為 <div>...</div> 的格式拼接到 html 中。

const posts = [{id: 1, t: "A"}, {id: 2, t: "B"}];
let html = "";

posts.forEach(post => {
    html += `<div>${post.t}</div>`;
});

console.log(html);
