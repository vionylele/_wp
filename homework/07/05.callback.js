// Exercise 5: Callback Function - Error-First Pattern
// 目標：理解 getPost(id, callback) 的非同步設計
// 題目：撰寫一個函數 fetchData(id, callback)，在函數內宣告一個物件，執行時呼叫 callback 並傳入 null 與該物件。

function fetchData(id, callback) {
    const fakeData = { id: id, status: "success" };
    callback(null, fakeData);
}

fetchData(101, (err, data) => {
    if (err) {
        console.log("發生錯誤：" + err);
    } else {
        console.log("成功取得資料：", data);
    }
});
