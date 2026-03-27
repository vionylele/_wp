const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];

app.get('/', (req, res) => {
    const postsHTML = posts.length === 0 
        ? '<p style="color: #999; text-align: center;">No posts yet.</p>'
        : posts.slice().reverse().map(post => `
            <div class="post">
                <h3>${escapeHtml(post.title)}</h3>
                <div class="meta">By ${escapeHtml(post.author)} | ${post.date}</div>
                <p>${escapeHtml(post.content)}</p>
            </div>
        `).join('');

    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Blog v4 - Node.js</title>
        <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background: #f5f5f5; }
            h1 { text-align: center; color: #333; }
            .form-box { background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
            input, textarea { width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 5px; box-sizing: border-box; }
            textarea { height: 100px; resize: vertical; }
            button { background: #667eea; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; }
            .post { background: white; padding: 15px; border-radius: 10px; margin-bottom: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
            .post h3 { color: #667eea; }
            .meta { color: #999; font-size: 12px; margin-bottom: 10px; }
        </style>
    </head>
    <body>
        <h1>Simple Blog (Node.js)</h1>
        <div class="form-box">
            <h2>Create Post</h2>
            <form action="/create" method="POST">
                <input type="text" name="title" placeholder="Post Title" required>
                <input type="text" name="author" placeholder="Your Name" required>
                <textarea name="content" placeholder="Write your content..." required></textarea>
                <button type="submit">Publish</button>
            </form>
        </div>
        <h2>Recent Posts</h2>
        ${postsHTML}
    </body>
    </html>
    `);
});

app.post('/create', (req, res) => {
    const { title, author, content } = req.body;
    if (title && author && content) {
        posts.push({
            id: Date.now(),
            title,
            author,
            content,
            date: new Date().toLocaleDateString()
        });
    }
    res.redirect('/');
});

function escapeHtml(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

app.listen(PORT, () => {
    console.log('Blog v4 running at http://localhost:' + PORT);
});
