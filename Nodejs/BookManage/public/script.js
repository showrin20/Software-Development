const bookForm = document.getElementById('bookForm');
const bookList = document.getElementById('bookList'); 

async function fetchBooks() {
    try {
        const res = await fetch("/books");
        console.log("Fetch response status:", res.status);
        if (!res.ok) throw new Error("Failed to fetch books");
        const books = await res.json();
        console.log("Books from server:", books); 
        renderBooks(books);
    } catch (err) {
        console.error("FetchBooks Error:", err);
    }
}

function renderBooks(books) {
    bookList.innerHTML = '';
    books.forEach(book => {
        const li = document.createElement("li");
        li.innerHTML = `<span><b>${book.title}</b> by ${book.author} (${book.publicationDate})</span>`;
        
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌ Delete";
        deleteBtn.addEventListener("click", () => deleteBook(book.id));

        li.appendChild(deleteBtn);
        bookList.appendChild(li);
    });
}

bookForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newBook = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        publicationDate: document.getElementById('publicationDate').value,
    };

    try {
        const res = await fetch('/books', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        });

        if (res.ok) {
            await fetchBooks();  
            bookForm.reset();
        } else {
            const errorText = await res.text();
            console.error('Failed to add book:', res.status, errorText);
        }
    } catch (err) {
        console.error('Network error:', err);
    }
});

async function deleteBook(id) {
    try {
        const res = await fetch(`/books/${id}`, {
            method: 'DELETE'
        });
        if (res.ok) fetchBooks();
    } catch (err) {
        console.error(err);
    }
}

fetchBooks();