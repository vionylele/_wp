# Blog System Development - AI Conversation Log

## 2026-03-27

### User's Questions and Requirements

1. **Create a website project with different versions (v1, v2, v3, v4)**
   - Each version should demonstrate different stages of web development
   - Include: v1-basic (HTML only), v2-css (HTML + CSS), v3-javascript (client-side JS), v4-nodejs (Node.js server)

2. **Create v1-basic with just HTML**
   - Basic HTML form for creating posts
   - No styling, no interactivity
   - Static page with title, author, and content fields

3. **Create v2-css with HTML and CSS styling**
   - Add CSS styling to make the page look better
   - Improve form design with padding, borders, shadows
   - Style the post list display

4. **Create v3-javascript with client-side JavaScript**
   - Add JavaScript for form submission without page reload
   - Implement add post functionality using array storage
   - Add delete post functionality
   - Client-side only, no server

5. **Create v4-nodejs with Node.js server**
   - Set up Express server
   - Add body-parser for form data
   - Implement in-memory post storage
   - Create routes for displaying and creating posts
   - Posts persist during server runtime

6. **Erase and recreate project multiple times**
   - Clean up and start fresh
   - Reorganize file structure

7. **Add user login/register functionality**
   - Simple username-based login
   - Track current user session
   - Show user info in header

8. **Add thread and blog post features**
   - Separate threads (forum posts) from blog posts
   - Add tabs to switch between views
   - Add statistics display (count of threads, posts, users)

9. **Restructure to follow Node.js + SQLite + Markdown format**
   - Remove thread/blog separation
   - Focus on simple blog system
   - Add SQLite database for persistence
   - Add Markdown support using `marked`

10. **Create documentation for all versions**
    - Document the development process
    - Include user requirements and bot responses
    - Write in English following the provided format

### Bot's Actions and Responses

1. Created v1-basic/index.html with basic HTML structure
2. Created v2-css/index.html with CSS styling
3. Created v3-javascript/index.html with client-side JavaScript
4. Created v4-nodejs with server.js, index.html, and package.json
5. Created v5-fullstack with SQLite database, marked markdown support
6. Deleted and recreated folders as requested
7. Added user login functionality with session tracking
8. Separated threads and blog posts with tab navigation
9. Restructured to simple blog with SQLite + Markdown
10. Created this documentation file

### Project Structure

```
homework-05/
├── v1-basic/
│   └── index.html         (HTML only)
├── v2-css/
│   └── index.html         (HTML + CSS)
├── v3-javascript/
│   └── index.html         (HTML + CSS + JavaScript)
├── v4-nodejs/
│   ├── server.js          (Express server)
│   ├── index.html         (Static HTML)
│   └── package.json       (Dependencies)
└── v5-fullstack/
    ├── server.js          (Express server with routes)
    ├── database.js        (SQLite operations)
    ├── package.json       (Dependencies)
    └── blog.db            (SQLite database)
```

### How to Run Each Version

| Version | Command |
|---------|---------|
| v1, v2, v3 | Double-click index.html |
| v4-nodejs | `cd v4-nodejs && npm install && npm start` |
| v5-fullstack | `cd v5-fullstack && npm install && npm start` |

### Key Features by Version

**v1-basic:**
- Static HTML form
- No interactivity
- Basic structure

**v2-css:**
- CSS styling
- Better visual design
- Improved form layout

**v3-javascript:**
- Client-side JavaScript
- Add/delete posts without server
- Array-based storage

**v4-nodejs:**
- Node.js Express server
- In-memory data storage
- Server-side rendering

**v5-fullstack:**
- SQLite database
- Persistent storage
- Markdown support with marked
- Full CRUD operations
