#!/usr/bin/env python3
"""Generate skeleton README.md files for all homework folders."""

import os
from pathlib import Path

BASE = Path(r"C:\Users\user\Desktop\School\sems2\Web Site Design\_wp\homework")

# ---------------------------------------------------------------------------
# Folder metadata — edit titles / descriptions to match each assignment
# ---------------------------------------------------------------------------
FOLDERS = {
    "01": {
        "title": "Assignment 1: Personal Profile Page",
        "description": "A personal profile card page built with HTML and CSS...",
        "features": ["Feature 1", "Feature 2"],
        "files": ["aboutme.html"],
        "howto": "Open `aboutme.html` in your web browser.",
    },
    "02": {
        "title": "Assignment 2: Personal Information Form",
        "description": "A personal data entry form built with HTML and CSS...",
        "features": ["Feature 1", "Feature 2"],
        "files": ["form.html"],
        "howto": "Open `form.html` in your web browser.",
    },
    "03": {
        "title": "Assignment 3: JavaScript Hello World",
        "description": "A simple JavaScript script printing 'Hello, World!'...",
        "features": ["Feature 1", "Feature 2"],
        "files": ["hello.js"],
        "howto": "Run `node hello.js` in your terminal.",
    },
    "04": {
        "title": "Assignment 4: JavaScript Fundamentals Exercises",
        "description": "Ten JavaScript exercises covering conditionals, loops, arrays, objects, and JSON...",
        "features": ["Feature 1", "Feature 2"],
        "files": [
            "1_Basic_Grade_Classifier.js",
            "2_The_Accumulator.js",
            "3_Find_the_Smallest_Number.js",
            "4_User_Profile_Management.js",
            "5_Filtering_Students.js",
            "6_JSON_Data_Parsing.js",
            "7_Shopping_Cart_Total.js",
            "8_Search_for_a_Fruit.js",
            "9_Nested_Data_Access.js",
            "10_Factorial_Calculator.js",
        ],
        "howto": "Run each file with `node <filename>.js` in your terminal.",
    },
    "05": {
        "title": "Assignment 5: Progressive Web Development",
        "description": "Multi-version project evolving from HTML through CSS, JavaScript, Node.js, to full-stack...",
        "features": ["Feature 1", "Feature 2"],
        "files": [
            "v1-basic/index.html",
            "v2-css/index.html",
            "v3-javascript/index.html",
            "v4-nodejs/server.js",
            "v5-fullstack/server.js",
            "v5-fullstack/database.js",
        ],
        "howto": "For v1-v3 open index.html; for v4-v5 run `node server.js`.",
    },
    "06": {
        "title": "Assignment 6: JavaScript Advanced Concepts",
        "description": "Exercises on callbacks, IIFEs, arrow functions, higher-order functions, etc...",
        "features": ["Feature 1", "Feature 2"],
        "files": [
            "01.Callback.js",
            "02.IIFE.js",
            "03.ArrowFunction.js",
            "04.DestructiveModify.js",
            "05.HigherOrderFunction.js",
            "06.CallbackFilter.js",
            "07.ObjectArrow.js",
            "08.PassByReference.js",
            "09.DelayedCallback.js",
            "10.CalculateTotal.js",
        ],
        "howto": "Run each file with `node <filename>.js` in your terminal.",
    },
    "07": {
        "title": "Assignment 7: JavaScript Practical Applications",
        "description": "Exercises on property access, destructuring, foreach, URL params, callbacks, JSON, etc...",
        "features": ["Feature 1", "Feature 2"],
        "files": [
            "01.property_access.js",
            "02.destructuring.js",
            "03.array_foreach.js",
            "04.url_params.js",
            "05.callback.js",
            "06.json_parse.js",
            "07.db_query.js",
            "08.template_logic.js",
            "09.sort_substring.js",
            "10.error_callback.js",
        ],
        "howto": "Run each file with `node <filename>.js` in your terminal.",
    },
    "Midterm": {
        "title": "Midterm Exam Project: Student Management System",
        "description": "Full-stack web app for managing students, courses, and enrollments...",
        "features": ["Feature 1", "Feature 2"],
        "files": [
            "server.js",
            "public/index.html",
            "public/styles.css",
            "public/app.js",
            "package.json",
        ],
        "howto": "Run `npm install && npm start` then open http://localhost:3000.",
    },
    "Final Exam": {
        "title": "Final Exam",
        "description": "(To be added once exam details are available.)",
        "features": ["(To be completed)"],
        "files": ["(To be added)"],
        "howto": "(To be added once exam deliverables are known.)",
    },
}

# ---------------------------------------------------------------------------
# Template
# ---------------------------------------------------------------------------
AI_DECL = """## AI and Originality Declaration
- **AI Tool Usage:** Yes/No (If yes, specify which AI like ChatGPT/Gemini and provide the shared conversation link or records here).
- **Code Contribution & Plagiarism:** 
  - Did you copy from classmates or the internet? (No / Partially / Entirely)
  - What are your specific individual contributions? (Briefly explain your work here).
  - *Statement:* (If this is 100% original without AI, state: "This assignment is original.")"""


def make_readme(info: dict) -> str:
    lines = [
        f"# {info['title']}",
        "",
        AI_DECL,
        "",
        "## Assignment / Exam Description",
        info["description"],
        "",
        "## Features / Implemented Functions",
    ]
    for f in info["features"]:
        lines.append(f"- {f}")
    lines.append("")
    lines.append("## Files Included")
    for f in info["files"]:
        lines.append(f"- {f}")
    lines.append("")
    lines.append("## How to Run / View")
    lines.append(info["howto"])
    lines.append("")
    return "\n".join(lines)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main():
    for folder, meta in FOLDERS.items():
        target = BASE / folder
        # Create folder if missing (Final Exam)
        if not target.exists():
            target.mkdir(parents=True, exist_ok=True)
            print(f"[MKDIR] {folder}")

        readme_path = target / "README.md"
        existed = readme_path.exists()
        content = make_readme(meta)
        readme_path.write_text(content, encoding="utf-8")
        print(f"[{'OVR' if existed else 'NEW'}] {folder}/README.md")


if __name__ == "__main__":
    main()
