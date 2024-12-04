import { Author } from "../author/types";

export interface Follow {
  id: number;
  userId: number;
  author: Author;
}
