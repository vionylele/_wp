# Blog System - Project Summary

## Overview

This project demonstrates the evolution of a blog system through 5 different versions, showing the progression from basic HTML to full-stack development.

## Version Comparison

| Version | Technology | Data Storage | Interactivity |
|---------|------------|--------------|---------------|
| v1-basic | HTML | None (static) | None |
| v2-css | HTML + CSS | None (static) | None |
| v3-javascript | HTML + CSS + JS | Client-side array | Full (add/delete) |
| v4-nodejs | Node.js + Express | Server memory | Form submission |
| v5-fullstack | Node.js + SQLite | SQLite database | Full CRUD |

## Features

### v1-basic (HTML Only)
- Static HTML form
- Basic post creation UI
- No styling or interactivity

### v2-css (HTML + CSS)
- CSS styling applied
- Improved visual design
- Better form layout
- Styled post display

### v3-javascript (Client-side JS)
- JavaScript for interactivity
- Add posts without page reload
- Delete posts functionality
- Array-based local storage
- Real-time updates

### v4-nodejs (Node.js Server)
- Express.js server
- In-memory data storage
- Server-side rendering
- Form submission via POST
- Route handling

### v5-fullstack (SQLite + Markdown)
- SQLite database for persistence
- Data survives server restart
- Markdown support (marked library)
- Clean URL routing
- Professional UI design
- Create, Read, Delete operations

## Installation & Usage

### v1-v3 (Static HTML)
Simply open `index.html` in a web browser.

### v4-nodejs
```bash
cd v4-nodejs
npm install
npm start
# Open http://localhost:3000
```

### v5-fullstack
```bash
cd v5-fullstack
npm install
npm start
# Open http://localhost:3000
```

## Dependencies

### v4-nodejs
- express: ^4.18.2
- body-parser: ^1.20.2

### v5-fullstack
- express: ^4.18.2
- sqlite3: ^5.1.6
- marked: ^9.1.2
- body-parser: ^1.20.2

## Database Schema (v5-fullstack)

```sql
CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Learning Outcomes

1. Understanding static vs dynamic web pages
2. Client-side vs server-side rendering
3. Database integration with SQLite
4. RESTful API concepts
5. Markdown content rendering
