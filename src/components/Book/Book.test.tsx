import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Book } from './Book';
import type { Book as BookType } from '../../types/book';

describe('Book Component', () => {
  const mockBook: BookType = {
    id: '1',
    title: 'Test Book',
    description: 'This is a test book description',
    imageUrl: 'https://example.com/book.jpg',
  };

  it('renders book title', () => {
    render(<Book book={mockBook} />);
    expect(screen.getByText('Test Book')).toBeInTheDocument();
  });

  it('renders book description when toggle is clicked', async () => {
    const user = userEvent.setup();
    render(<Book book={mockBook} />);

    const toggleButton = screen.getByRole('button', { name: /show description/i });
    expect(screen.queryByText('This is a test book description')).not.toBeInTheDocument();

    await user.click(toggleButton);
    expect(screen.getByText('This is a test book description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /hide description/i })).toBeInTheDocument();
  });

  it('hides description when toggle is clicked again', async () => {
    const user = userEvent.setup();
    render(<Book book={mockBook} />);

    const toggleButton = screen.getByRole('button', { name: /show description/i });
    await user.click(toggleButton);
    expect(screen.getByText('This is a test book description')).toBeInTheDocument();

    const hideButton = screen.getByRole('button', { name: /hide description/i });
    await user.click(hideButton);
    expect(screen.queryByText('This is a test book description')).not.toBeInTheDocument();
  });

  it('handles missing description gracefully', () => {
    const bookWithoutDescription: BookType = {
      id: '2',
      title: 'Book Without Description',
    };
    render(<Book book={bookWithoutDescription} />);

    expect(screen.getByText('Book Without Description')).toBeInTheDocument();
    expect(screen.getByText(/no description available/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /show description/i })).not.toBeInTheDocument();
  });

  it('handles missing image URL with placeholder', () => {
    const bookWithoutImage: BookType = {
      id: '3',
      title: 'Book Without Image',
      description: 'Test description',
    };
    render(<Book book={bookWithoutImage} />);

    const image = screen.getByAltText(/book cover placeholder/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('placeholder'));
  });

  it('handles image load error', async () => {
    const bookWithInvalidImage: BookType = {
      id: '4',
      title: 'Book With Invalid Image',
      description: 'Test description',
      imageUrl: 'https://invalid-url-that-will-fail.com/image.jpg',
    };

    render(<Book book={bookWithInvalidImage} />);
    const image = screen.getByAltText(/Book With Invalid Image cover/i) as HTMLImageElement;

    // Simulate image error
    await act(async () => {
      const errorEvent = new Event('error', { bubbles: true });
      image.dispatchEvent(errorEvent);
      // Wait for state update after error
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // After error, should show placeholder
    expect(image.src).toContain('placeholder');
  });

  it('has proper accessibility attributes', () => {
    render(<Book book={mockBook} />);

    const article = screen.getByRole('article');
    expect(article).toHaveAttribute('aria-labelledby', 'book-title-1');

    const title = screen.getByText('Test Book');
    expect(title).toHaveAttribute('id', 'book-title-1');

    const toggleButton = screen.getByRole('button', { name: /show description/i });
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(toggleButton).toHaveAttribute('aria-controls', 'book-description-1');
  });
});

