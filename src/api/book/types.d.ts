import { Author } from "../author/types";

export interface Book {
	id: number;
  name: string;
  author: Author;
  publisher: string;
  brief: string;
  collect: number;
  comments: number;
  likes: number;
  share: number;
  type: string;
  typeId: number;
  views: number;
  price: number;
  img: string;
}