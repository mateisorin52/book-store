# Book Store - React Component

A reusable React component that displays a list of books with modern development practices and accessibility standards.

## Features

- **Book Component**: Displays book title, description, and optional image
- **Toggle Description**: Show/hide book descriptions with a toggle button
- **Image Handling**: Gracefully handles missing or invalid image URLs with placeholder
- **Add New Books**: Button to dynamically add new books to the list
- **Accessibility**: WCAG-compliant with proper ARIA attributes
- **Responsive Design**: Mobile-friendly layout
- **Error Handling**: Handles edge cases like missing descriptions and invalid images

## Project Structure

```
src/
├── components/
│   ├── Book/
│   │   ├── Book.tsx          # Reusable Book component
│   │   ├── Book.css          # Book component styles
│   │   ├── Book.test.tsx     # Book component tests
│   │   └── index.ts          # Component export
│   └── BookList/
│       ├── BookList.tsx      # Book list container component
│       ├── BookList.css      # Book list styles
│       └── index.ts          # Component export
├── data/
│   └── mockBooks.ts          # Mock book data
├── types/
│   └── book.ts               # TypeScript types
├── test/
│   └── setup.ts              # Test setup configuration
├── App.tsx                    # Main app component
└── main.tsx                   # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v20.19.0 or higher recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in the terminal).

### Testing

Run tests:

```bash
npm test
```

Run tests with UI:

```bash
npm run test:ui
```

### Build

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Component Usage

### Book Component

The `Book` component accepts the following props:

```typescript
interface Book {
  id: string;
  title: string;
  description?: string;  // Optional
  imageUrl?: string;      // Optional
}
```

Example:

```tsx
import { Book } from './components/Book';

<Book book={{
  id: '1',
  title: 'The Great Gatsby',
  description: 'A classic American novel...',
  imageUrl: 'https://example.com/image.jpg'
}} />
```

### BookList Component

The `BookList` component manages a list of books and provides functionality to add new books:

```tsx
import { BookList } from './components/BookList';

<BookList />
```

## Accessibility Features

- Semantic HTML (`<article>`, `<h2>`, etc.)
- ARIA attributes (`aria-labelledby`, `aria-expanded`, `aria-controls`, `aria-live`)
- Keyboard navigation support
- Focus indicators
- Screen reader friendly labels

## Testing

The project includes comprehensive tests using Vitest and React Testing Library. Tests cover:

- Component rendering
- User interactions (toggle description)
- Edge cases (missing description, invalid images)
- Accessibility attributes

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Vitest** - Testing framework
- **React Testing Library** - Component testing
- **CSS** - Styling
- **Cloudflare Pages** - Hosting and deployment

## Deployment to Cloudflare Pages

The application is configured for deployment to Cloudflare Pages on your domain `sofermentor.ro`.

### Quick Deploy

1. **Login to Cloudflare (first time only):**
   ```bash
   wrangler login
   ```

2. **Deploy:**
   ```bash
   npm run deploy
   ```
   
   Or use the deployment script:
   ```bash
   ./deploy.sh
   ```