const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

let books = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/books', (req, res) => {
    res.json(books);
});

app.post('/books', (req, res) => {
    const { title, author, publicationDate } = req.body;

    if (!title || !author) {
        return res.status(400).json({ error: 'Title and author are required' });
    }
    if (!publicationDate) {
        return res.status(400).json({ error: 'Publication Date is required' });
    }

    const newBook = {
        id: uuidv4(),
        title,
        author,
        publicationDate
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
});

app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === req.params.id);
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }
    books.splice(bookIndex, 1);
    res.json({ message: 'Book deleted successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
