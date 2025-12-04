import { useState } from 'react';
import type { Book } from '../../types/book';
import { mockBooks } from '../../data/mockBooks'
import './BookList.css';
import { Book as BookComponent } from '../Book/Book.tsx';

export const BookList = () => {
  const [books, setBooks] = useState<Book[]>(mockBooks);

  const handleAddNewBook = () => {
    const newBook: Book = {
      id: `book-${Date.now()}`,
      title: `New Book ${books.length + 1}`,
      description: 'This is a newly added book. You can customize this description.',
      imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
    };

    setBooks((prevBooks) => [newBook, ...prevBooks]);
  };

  return (
    <div className="book-list-container">
      <header className="book-list-header">
        <h1 className="book-list-title">Book Collection</h1>
        <button
          type="button"
          onClick={handleAddNewBook}
          className="book-list-add-button"
          aria-label="Add a new book to the collection"
        >
          Add New Book
        </button>
      </header>
      <div className="book-list" role="list" aria-label="List of books">
        {books.length === 0 ? (
          <p className="book-list-empty" role="status">
            No books in the collection. Click "Add New Book" to get started.
          </p>
        ) : (
          books.map((book) => (
            <div key={book.id} role="listitem">
              <BookComponent book={book} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

