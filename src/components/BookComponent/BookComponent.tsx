import { useState } from "react";
import type { Book } from "../models/Book";
import { CanvasBookImage } from "../CanvasBookImage/CanvasBookImage";

interface BookComponentProps {
  book: Book;
}

export const BookComponent: React.FC<BookComponentProps> = ({ book }) => {
  const [expanded, setExpanded] = useState(false);


  return (
    <div className="border-b p-4 hover:bg-gray-50 transition">
      <div
        className="flex justify-between items-center cursor-pointer w-full"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="block items-center gap-4">
          <span className="text-gray-500 w-6 mr-4">{book.index}</span>
          <span className="text-gray-500 w-6 mr-4">{book.isbn}</span>
          <span className="font-medium mr-4">{book.title}</span>
          <span className="text-gray-600 italic">by {book.author}</span>
        </div>
        <span className="text-sm text-blue-600">{expanded ? "▲" : "▼"}</span>
      </div>

      {expanded && (
        <div className="mt-4 ml-8 flex gap-6">
          {/* Small book-like image */}
          <div className="w-[120px] h-[180px] flex-shrink-0 overflow-hidden rounded shadow-md border">
            <CanvasBookImage title={book.title} author={book.author} />
          </div>

          {/* Book info */}
          <div className="flex-1 space-y-2">
            <p className="text-sm text-gray-700">
              <strong>Publisher:</strong> {book.publisher}, {book.year}
            </p>
            <p className="text-sm text-gray-700">
              <strong>ISBN:</strong> {book.isbn}
            </p>
            <div className="flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                👍 {book.likes}
              </span>
              <span className="text-sm text-gray-600">
                {book.reviews.length} Review{book.reviews.length !== 1 && "s"}
              </span>
            </div>

            <div className="space-y-2 mt-3">
              {book.reviews.map((r, i) => (
                <div key={i} className="border-l-4 border-gray-300 pl-3">
                  <p className="text-gray-800 text-sm mb-1">"{r.review}"</p>
                  <p className="text-xs text-gray-500 italic">
                    — {r.reviewer}, {new Date(r.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
