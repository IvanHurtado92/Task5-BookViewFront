import type { Review } from "./Review";

export interface Book {
  index: number;
  title: string;
  author: string;
  publisher: string;
  year: number;
  isbn: string;
  likes: number;
  reviews: Review[];
}