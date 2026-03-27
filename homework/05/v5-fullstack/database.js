const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'blog.db');

if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
}

const db = new sqlite3.Database(dbPath);

function initDatabase() {
    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS posts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                author TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Database initialized successfully');
    });
}

function getAllPosts(callback) {
    db.all('SELECT * FROM posts ORDER BY created_at DESC', (err, rows) => {
        if (err) {
            console.error('Error fetching posts:', err);
            return callback(err, null);
        }
        callback(null, rows);
    });
}

function getPostById(id, callback) {
    db.get('SELECT * FROM posts WHERE id = ?', [id], (err, row) => {
        if (err) {
            console.error('Error fetching post:', err);
            return callback(err, null);
        }
        callback(null, row);
    });
}

function createPost(title, content, author, callback) {
    const stmt = db.prepare('INSERT INTO posts (title, content, author) VALUES (?, ?, ?)');
    stmt.run([title, content, author], function(err) {
        if (err) {
            console.error('Error creating post:', err);
            return callback(err, null);
        }
        callback(null, this.lastID);
    });
    stmt.finalize();
}

function deletePost(id, callback) {
    db.run('DELETE FROM posts WHERE id = ?', [id], function(err) {
        if (err) {
            console.error('Error deleting post:', err);
            return callback(err);
        }
        callback(null);
    });
}

function closeDatabase() {
    db.close();
}

module.exports = {
    initDatabase,
    getAllPosts,
    getPostById,
    createPost,
    deletePost,
    closeDatabase
};
