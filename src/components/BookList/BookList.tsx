import { useEffect, useState, useCallback } from "react";
import type { Book } from "../models/Book";
import { BookComponent } from "../BookComponent/BookComponent";
import type { BookSettings } from "../models/BookSettings";
const API_URL = import.meta.env.VITE_API_URL;

type Props = {
  settings: BookSettings;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const BooksList: React.FC<Props> = ({ settings, page, setPage }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Fetch books when settings or page changes
  useEffect(() => {
    let ignore = false;
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(settings),
        });
        const result = await response.json();
        if (!ignore) {
          if (response.ok) {
            if (page === 0) {
              // Renumber indexes for the first page
              const renumbered = result.data.map((book: Book, i: number) => ({ ...book, index: i + 1 }));
              setBooks(renumbered);
            } else {
              setBooks((prev) => {
                const offset = prev.length;
                const renumbered = result.data.map((book: Book, i: number) => ({ ...book, index: offset + i + 1 }));
                return [...prev, ...renumbered];
              });
            }
            setHasMore(result.data && result.data.length > 0);
          } else {
            setHasMore(false);
            console.error("Error:", result);
          }
        }
      } catch (error) {
        if (!ignore) setHasMore(false);
        console.error("Fetch error:", error);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchBooks();
    return () => { ignore = true; };
  }, [settings, page]);

  // Reset books when settings (except page) change
  useEffect(() => {
    setBooks([]);
    setHasMore(true);
  }, [settings.locale, settings.seed, settings.likes, settings.reviews]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 200
    ) {
      setPage((p) => p + 1);
    }
  }, [loading, hasMore, setPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (loading && books.length === 0) return <p>Loading books...</p>;

  return (
    <div className="divide-y border rounded shadow bg-white">
      {books.map((book) => (
        <BookComponent key={book.isbn + book.index} book={book} />
      ))}
      {loading && books.length > 0 && <p className="p-4 text-center">Loading more...</p>}
      {!hasMore && <p className="p-4 text-center text-gray-400">No more books.</p>}
    </div>
  );
};
