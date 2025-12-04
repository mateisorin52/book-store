import { useState } from 'react';
import type { Book as BookType } from '../../types/book';
import './Book.css';

interface BookProps {
  book: BookType;
}

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/200x300?text=No+Image';

export const Book = ({ book }: BookProps) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const toggleDescription = () => {
    setIsDescriptionVisible((prev) => !prev);
  };

  const imageUrl = book.imageUrl && !imageError ? book.imageUrl : PLACEHOLDER_IMAGE;
  const hasDescription = Boolean(book.description);

  return (
    <article className="book" aria-labelledby={`book-title-${book.id}`}>
      <div className="book-content">
        <div className="book-image-container">
          <img
            src={imageUrl}
            alt={book.imageUrl && !imageError ? `${book.title} cover` : 'Book cover placeholder'}
            className="book-image"
            onError={handleImageError}
            loading="lazy"
          />
        </div>
        <div className="book-details">
          <h2 id={`book-title-${book.id}`} className="book-title">
            {book.title}
          </h2>
          {hasDescription && (
            <button
              type="button"
              onClick={toggleDescription}
              className="book-toggle"
              aria-expanded={isDescriptionVisible}
              aria-controls={`book-description-${book.id}`}
            >
              {isDescriptionVisible ? 'Hide Description' : 'Show Description'}
            </button>
          )}
          {hasDescription && isDescriptionVisible && (
            <p
              id={`book-description-${book.id}`}
              className="book-description"
              role="region"
              aria-live="polite"
            >
              {book.description}
            </p>
          )}
          {!hasDescription && (
            <p className="book-description book-description--empty" aria-label="No description available">
              No description available for this book.
            </p>
          )}
        </div>
      </div>
    </article>
  );
};

