import { Book } from "../book/types";

export interface Cart {
  id: number;
  count: number;
  checked: number;
  createTime: string;
  updateTime: string;
  userId: number;
  book: Book;
}
