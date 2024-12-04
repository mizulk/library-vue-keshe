import { Book } from "../book/types";

export interface Collection {
  id: number;
  userId: number;
  book: Book;
}
