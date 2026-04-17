// Exercise 7: Simulating DB Queries
// 目標：理解 db.get 的結構
// 題目：寫一個函數 fakeGet(sql, params, callback)，內部直接呼叫 callback(null, { title: "Fake Title" })，並在回呼函數中印出標題。

function fakeGet(sql, params, callback) {
    callback(null, { id: 1, title: "Fake Title", content: "這是內容" });
}

fakeGet("SELECT * FROM posts WHERE id = ?", [1], (err, row) => {
    if (err) {
        console.error("查詢失敗");
    } else {
        console.log("抓到的文章標題是：", row.title);
    }
});
