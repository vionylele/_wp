// Exercise 10: Error-First Callback Pattern
// 目標：理解 if (err) return ... 的模式
// 題目：寫一個函數 checkAdmin(role, callback)，如果 role 不是 "admin" 就呼叫 callback("Access Denied")，否則呼叫 callback(null, "Welcome")。

function checkAdmin(role, callback) {
    if (role !== "admin") {
        callback("Access Denied");
    } else {
        callback(null, "Welcome");
    }
}

checkAdmin("guest", (err, msg) => {
    if (err) {
        console.log("錯誤：", err);
    } else {
        console.log("成功：", msg);
    }
});

checkAdmin("admin", (err, msg) => {
    if (err) {
        console.log("錯誤：", err);
    } else {
        console.log("成功：", msg);
    }
});
