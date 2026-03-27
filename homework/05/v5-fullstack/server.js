const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { marked } = require('marked');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

marked.setOptions({
    breaks: true,
    gfm: true
});

app.get('/', (req, res) => {
    db.getAllPosts((err, posts) => {
        if (err) {
            return res.status(500).send('Error loading posts');
        }
        
        const postsHTML = posts.length === 0 
            ? '<p class="empty">No posts yet. Be the first to write one!</p>'
            : posts.map(post => `
                <div class="post">
                    <h3><a href="/post/${post.id}">${escapeHtml(post.title)}</a></h3>
                    <div class="meta">
                        By ${escapeHtml(post.author)} | ${new Date(post.created_at).toLocaleDateString()}
                    </div>
                    <p>${escapeHtml(post.content.substring(0, 150))}${post.content.length > 150 ? '...' : ''}</p>
                    <a href="/post/${post.id}" class="read-more">Read More</a>
                </div>
            `).join('');

        res.send(getLayout('Home - Simple Blog', `
            <div class="hero">
                <h1>Welcome to Simple Blog</h1>
                <p>A Markdown-powered blog system</p>
            </div>
            
            <div class="create-post">
                <h2>Create New Post</h2>
                <form action="/create" method="POST">
                    <input type="text" name="title" placeholder="Post Title" required>
                    <input type="text" name="author" placeholder="Your Name" required>
                    <textarea name="content" placeholder="Write your post in Markdown..." required></textarea>
                    <button type="submit">Publish Post</button>
                </form>
            </div>
            
            <div class="posts-list">
                <h2>Recent Posts</h2>
                ${postsHTML}
            </div>
        `));
    });
});

app.post('/create', (req, res) => {
    const { title, content, author } = req.body;
    
    if (!title || !content || !author) {
        return res.redirect('/');
    }
    
    db.createPost(title, content, author, (err, id) => {
        if (err) {
            return res.status(500).send('Error creating post');
        }
        res.redirect('/post/' + id);
    });
});

app.get('/post/:id', (req, res) => {
    const id = req.params.id;
    
    db.getPostById(id, (err, post) => {
        if (err || !post) {
            return res.redirect('/');
        }
        
        const htmlContent = marked(post.content);
        
        res.send(getLayout(post.title, `
            <div class="post-view">
                <h1>${escapeHtml(post.title)}</h1>
                <div class="meta">
                    By ${escapeHtml(post.author)} | ${new Date(post.created_at).toLocaleString()}
                </div>
                <hr>
                <div class="post-content">
                    ${htmlContent}
                </div>
                <hr>
                <a href="/" class="back-link">← Back to Home</a>
                <a href="/delete/${post.id}" class="delete-link" onclick="return confirm('Delete this post?')">Delete Post</a>
            </div>
        `));
    });
});

app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    
    db.deletePost(id, (err) => {
        if (err) {
            return res.status(500).send('Error deleting post');
        }
        res.redirect('/');
    });
});

function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/"/g, '&quot;');
}

function getLayout(title, content) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #f5f5f5; color: #333; line-height: 1.6; }
            .container { max-width: 800px; margin: 0 auto; padding: 20px; }
            header { background: #fff; padding: 20px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
            header h1 a { color: #2c3e50; text-decoration: none; }
            .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; border-radius: 10px; text-align: center; margin-bottom: 20px; }
            .hero h1 { margin-bottom: 10px; }
            .create-post { background: #fff; padding: 25px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
            .create-post h2 { margin-bottom: 15px; color: #2c3e50; }
            .posts-list { background: #fff; padding: 25px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
            .posts-list h2 { margin-bottom: 15px; color: #2c3e50; }
            input, textarea { width: 100%; padding: 12px; margin-bottom: 15px; border: 2px solid #ddd; border-radius: 8px; font-size: 14px; }
            input:focus, textarea:focus { outline: none; border-color: #667eea; }
            textarea { height: 150px; resize: vertical; font-family: monospace; }
            button { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; }
            button:hover { opacity: 0.9; }
            .post { border-bottom: 1px solid #eee; padding: 20px 0; }
            .post:last-child { border-bottom: none; }
            .post h3 { margin-bottom: 8px; }
            .post h3 a { color: #667eea; text-decoration: none; }
            .post h3 a:hover { text-decoration: underline; }
            .meta { color: #999; font-size: 14px; margin-bottom: 10px; }
            .post p { color: #666; margin-bottom: 10px; }
            .read-more { color: #667eea; text-decoration: none; font-weight: bold; }
            .read-more:hover { text-decoration: underline; }
            .empty { color: #999; text-align: center; padding: 20px; }
            .post-view { background: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
            .post-view h1 { color: #2c3e50; margin-bottom: 10px; }
            .post-view hr { border: none; border-top: 1px solid #eee; margin: 20px 0; }
            .post-content { line-height: 1.8; color: #333; }
            .post-content h1, .post-content h2, .post-content h3 { margin: 20px 0 10px 0; color: #2c3e50; }
            .post-content p { margin-bottom: 15px; }
            .post-content code { background: #f4f4f4; padding: 2px 6px; border-radius: 4px; font-family: monospace; }
            .post-content pre { background: #f4f4f4; padding: 15px; border-radius: 8px; overflow-x: auto; margin: 15px 0; }
            .post-content pre code { background: none; padding: 0; }
            .post-content blockquote { border-left: 4px solid #667eea; padding-left: 15px; margin: 15px 0; color: #666; font-style: italic; }
            .post-content a { color: #667eea; }
            .back-link { color: #667eea; text-decoration: none; margin-right: 20px; }
            .delete-link { color: #e74c3c; text-decoration: none; }
            .delete-link:hover { text-decoration: underline; }
        </style>
    </head>
    <body>
        <div class="container">
            <header>
                <h1><a href="/">Simple Blog</a></h1>
            </header>
            ${content}
        </div>
    </body>
    </html>
    `;
}

db.initDatabase();

app.listen(PORT, () => {
    console.log(`Blog server running at http://localhost:${PORT}`);
    console.log(`Open your browser and go to http://localhost:${PORT}`);
});
