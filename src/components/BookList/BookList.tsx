import { useEffect, useState } from "react";
import type { Book } from "../models/Book";
import { BookComponent } from "../BookComponent/BookComponent";
import type { BookSettings } from "../models/BookSettings";

type Props = {
  settings: BookSettings
};

export const BooksList: React.FC<Props> = ({ settings }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://localhost:7284/api/Book/GetBooks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(settings),
        });

        const result = await response.json();

        if (response.ok) {
          setBooks(result.data);
        } else {
          console.error("Error:", result);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [settings]); // refetch every time settings change

  if (loading) return <p>Loading books...</p>;

  return (
    <div className="divide-y border rounded shadow bg-white">
      {books.map((book) => (
        <BookComponent key={book.ISBN} book={book} />
      ))}
    </div>
  );
};
