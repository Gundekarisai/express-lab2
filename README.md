# Lab-02: Books Management REST API using Node.js, Express.js and SQLite

## Student Details

* **Name:** Gundekari Sai
* **Registration Number:** 252U1R5052
* **Section:** 2A
* **Lab Number:** Lab-02
* **Title:** Books Management REST API using Node.js, Express.js and SQLite

---

## 1. Project Description

This project is a Books Management REST API developed using Node.js, Express.js and SQLite.

The application allows users to perform CRUD (Create, Read, Update and Delete) operations on book records. Each book contains an ID, title, author, price and number of pages.

The API uses SQLite as its database to store and manage book information.

## 2. Technologies Used

* Node.js
* Express.js
* SQLite
* JavaScript
* Postman (for API testing)

## 3. Project Structure

```text
lab-02/
│
├── app.js
├── books.db
├── package.json
├── package-lock.json
├── README.md
└── node_modules/
```

## 4. Installation and Setup

### Prerequisites

* Node.js installed
* npm (Node Package Manager)
* VS Code or any code editor
* Postman (for testing API endpoints)

### Step 1: Install Dependencies

Open the terminal in the project directory and execute:

```bash
npm install
```

### Step 2: Run the Application

To start the server:

```bash
npm start
```

To run the application in development mode:

```bash
npm run dev
```

### Step 3: Access the Application

The application runs locally at:

```text
http://localhost:3000
```

The Books API endpoint is:

```text
http://localhost:3000/books
```

## 5. Environment Variables

The application does not require any API keys or secret environment variables.

| Variable | Description                    | Value           |
| -------- | ------------------------------ | --------------- |
| PORT     | Port number used by the server | `<PORT_NUMBER>` |

The application uses port 3000 by default when the PORT environment variable is not provided.

## 6. Database Schema

The project uses an SQLite database named `books.db`.

The `books` table contains the following columns:

| Column | Data Type | Description                                         |
| ------ | --------- | --------------------------------------------------- |
| id     | INTEGER   | Unique ID of the book (Primary Key, Auto Increment) |
| title  | TEXT      | Title of the book                                   |
| author | TEXT      | Author of the book                                  |
| price  | INTEGER   | Price of the book                                   |
| pages  | INTEGER   | Number of pages in the book                         |

## 7. API Endpoints

The following endpoints are implemented in this project.

| HTTP Method | Endpoint         | Description                              |
| ----------- | ---------------- | ---------------------------------------- |
| GET         | `/books`         | Retrieves all books from the database.   |
| GET         | `/books/:bookId` | Retrieves a specific book using its ID.  |
| POST        | `/books`         | Adds a new book to the database.         |
| PUT         | `/books/:bookId` | Updates the details of an existing book. |
| DELETE      | `/books/:bookId` | Deletes a book using its ID.             |

## 8. Sample API Requests

### GET - Retrieve All Books

```http
GET /books
```

### GET - Retrieve a Book by ID

```http
GET /books/1
```

### POST - Add a New Book

```http
POST /books
Content-Type: application/json
```

Request Body:

```json
{
  "title": "JavaScript Complete Guide",
  "author": "John Smith",
  "price": 450,
  "pages": 400
}
```

### PUT - Update Book Details

```http
PUT /books/1
Content-Type: application/json
```

Request Body:

```json
{
  "title": "Updated Wings of Fire",
  "author": "APJ Abdul Kalam",
  "price": 300,
  "pages": 200
}
```

### DELETE - Delete a Book

```http
DELETE /books/1
```

## 9. Validation and Error Handling

The application includes basic input validation to ensure:

* Book title and author are non-empty strings.
* Price must be a non-negative integer.
* Pages must be a positive integer.
* Book ID must be a valid positive integer.
* Appropriate responses are returned when a book is not found.

## 10. Deployment

The application has been deployed using Render.

**Live Deployment URL:**

https://express-lab2.onrender.com

**Books API Endpoint:**

https://express-lab2.onrender.com/books

## 11. Screenshots of Working Output

Add screenshots of your successful API testing in Postman or browser in the `screenshots` folder.

Include screenshots for:

1. GET - Retrieve all books.
2. GET - Retrieve a book by ID.
3. POST - Add a new book.
4. PUT - Update an existing book.
5. DELETE - Delete a book.
6. Successful application execution or Render deployment.

Example:

```text
screenshots/
├── get-all-books.png
├── get-book-by-id.png
├── post-book.png
├── update-book.png
├── delete-book.png
└── render-deployment.png
```

## 12. Conclusion

Through this lab, I learned how to develop REST APIs using Node.js and Express.js and how to connect an SQLite database to a backend application.

I gained practical experience with HTTP methods, routing, request and response handling, CRUD operations, input validation and API testing using Postman.

I also learned how to deploy a backend application using Render.
