
const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;

const public_users = express.Router();

// Task 1: Register a new user
public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required"
    });
  }

  if (isValid(username)) {
    return res.status(409).json({
      message: "User already exists"
    });
  }

  users.push({
    username: username,
    password: password
  });

  return res.status(200).json({
    message: "User successfully registered. Now you can login"
  });
});

// Task 2: Get all books
public_users.get('/', async (req, res) => {
  try {
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving books"
    });
  }
});

// Task 3: Get book by ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const book = books[isbn];

    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving book"
    });
  }
});

// Task 4: Get books by author
public_users.get('/author/:author', async (req, res) => {
  try {
    const author = req.params.author.toLowerCase();

    const result = Object.values(books).filter(book =>
      book.author.toLowerCase() === author
    );

    if (result.length === 0) {
      return res.status(404).json({
        message: "No books found for this author"
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving books"
    });
  }
});

// Task 5: Get books by title
public_users.get('/title/:title', async (req, res) => {
  try {
    const title = req.params.title.toLowerCase();

    const result = Object.values(books).filter(book =>
      book.title.toLowerCase() === title
    );

    if (result.length === 0) {
      return res.status(404).json({
        message: "No books found with this title"
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving books"
    });
  }
});

// Task 6: Get book reviews
public_users.get('/review/:isbn', async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const book = books[isbn];

    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    return res.status(200).json(book.reviews);
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving reviews"
    });
  }
});

module.exports.general = public_users;

