## 🚀 What is Node.js?

* Node.js = JavaScript runtime (lets you run JS outside the browser).
* Built on Chrome’s V8 engine → super fast for handling **I/O-heavy apps** (APIs, real-time apps, servers).
* Event-driven + non-blocking I/O = scales like crazy.

👉 Example without Express (plain Node):

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World from Node!');
});

server.listen(3000, () => console.log('Server running on http://localhost:3000'));
```


## ⚡ What is Express.js?

* Express.js = **framework** for Node.
* Think of it as a **shortcut toolkit** → helps you build APIs and web apps faster without writing raw HTTP boilerplate.


👉 Example with Express:

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
```




## 🔥 Example REST API with Express

```js
const express = require('express');
const app = express();

// Middleware
app.use(express.json()); // parse JSON body

// Routes
app.get('/api/books', (req, res) => {
  res.json([{ id: 1, title: '1984' }, { id: 2, title: 'The Hobbit' }]);
});

app.post('/api/books', (req, res) => {
  const book = req.body;
  res.status(201).json({ message: 'Book added', book });
});

// Start server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));
```

---


