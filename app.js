
const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

const dbPath = path.join(__dirname, "books.db");

let db;

// Initialize Database and Server
const initializeDBAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });

        console.log("Database connected successfully");

        await db.exec(`
            CREATE TABLE IF NOT EXISTS books (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                author TEXT NOT NULL,
                price INTEGER,
                pages INTEGER
            );
        `);

        console.log("Books table created successfully");

        app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});

    } catch (error) {
        console.log("Database Error:", error.message);
        process.exit(1);
    }
};


// Validate Book ID
const validateBookId = (bookId) => {
    const id = Number(bookId);
    return Number.isInteger(id) && id > 0 ? id : null;
};


// Validate Book Details
const validateBook = (book) => {
    const { title, author, price, pages } = book;

    return (
        typeof title === "string" &&
        title.trim().length > 0 &&
        typeof author === "string" &&
        author.trim().length > 0 &&
        Number.isInteger(price) &&
        price >= 0 &&
        Number.isInteger(pages) &&
        pages > 0
    );
};


// 1. GET - Retrieve All Books
app.get("/books", async (request, response) => {
    try {
        const books = await db.all(
            "SELECT * FROM books"
        );

        response.status(200).send(books);

    } catch (error) {
        response.status(500).send(error.message);
    }
});


// 2. GET - Retrieve a Book by ID
app.get("/books/:bookId", async (request, response) => {
    try {
        const bookId = validateBookId(request.params.bookId);

        if (bookId === null) {
            return response.status(400).send("Invalid book ID");
        }

        const book = await db.get(
            "SELECT * FROM books WHERE id = ?",
            [bookId]
        );

        if (book === undefined) {
            return response.status(404).send("Book not found");
        }

        response.status(200).send(book);

    } catch (error) {
        response.status(500).send(error.message);
    }
});


// 3. POST - Add a New Book
app.post("/books", async (request, response) => {
    try {
        const { title, author, price, pages } = request.body;

        if (!validateBook(request.body)) {
            return response.status(400).send("Invalid book details");
        }

        const query = `
            INSERT INTO books (title, author, price, pages)
            VALUES (?, ?, ?, ?)
        `;

        const result = await db.run(
            query,
            [title.trim(), author.trim(), price, pages]
        );

        response.status(201).send({
            message: "Book added successfully",
            bookId: result.lastID
        });

    } catch (error) {
        response.status(500).send(error.message);
    }
});


// 4. PUT - Update an Existing Book
app.put("/books/:bookId", async (request, response) => {
    try {
        const bookId = validateBookId(request.params.bookId);

        if (bookId === null) {
            return response.status(400).send("Invalid book ID");
        }

        const { title, author, price, pages } = request.body;

        if (!validateBook(request.body)) {
            return response.status(400).send("Invalid book details");
        }

        const query = `
            UPDATE books
            SET title = ?, author = ?, price = ?, pages = ?
            WHERE id = ?
        `;

        const result = await db.run(
            query,
            [title.trim(), author.trim(), price, pages, bookId]
        );

        if (result.changes === 0) {
            return response.status(404).send("Book not found");
        }

        response.status(200).send("Book updated successfully");

    } catch (error) {
        response.status(500).send(error.message);
    }
});


// 5. DELETE - Remove a Book
app.delete("/books/:bookId", async (request, response) => {
    try {
        const bookId = validateBookId(request.params.bookId);

        if (bookId === null) {
            return response.status(400).send("Invalid book ID");
        }

        const result = await db.run(
            "DELETE FROM books WHERE id = ?",
            [bookId]
        );

        if (result.changes === 0) {
            return response.status(404).send("Book not found");
        }

        response.status(200).send("Book deleted successfully");

    } catch (error) {
        response.status(500).send(error.message);
    }
});


// Start Application
initializeDBAndServer();

