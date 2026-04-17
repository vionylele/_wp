// Exercise 4: Dictionary / URL Params
// 目標：理解 req.params.id 的來源
// 題目：建立一個名為 params 的物件，動態新增一個鍵為 "id"，值為 99 的屬性，然後印出這個物件。

const params = {};
params["id"] = 99;

console.log(params);
console.log(params.id);
