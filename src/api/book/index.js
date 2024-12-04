import request from "@/request";

/**@typedef {import("./types").Book} Book */
/**
 * @template T
 * @typedef {import("@/request/types").ResponseResult<T>} ResponseResult<T>
 */

/**
 * @param {number} id
 * @returns {ResponseResult<Book>}
 */
export function getBookById(id) {
  return request.get(`/books/${id}`);
}

/**
 * @returns {ResponseResult<Book[]>}
 */
export function getBooks() {
  return request.get("/books");
}

/**
 * @param {string} type
 * @returns {ResponseResult<Book[]>}
 */
export function getBookByType(type) {
  return request.get("/books", {
    params: { type },
  });
}

/**
 * @param {string} name
 * @returns {ResponseResult<Book[]>}
 */
export function getBooksByAuthor(name) {
  return request.get("/books", {
    params: { author: name },
  });
}

/**
 * @param {string} keyword
 * @returns {ResponseResult<Book[]>}
 */
export function searchBook(keyword) {
  return request.get("/books", {
    params: { keyword },
  });
}

/**
 * @param {number[]} ids
 * @returns {ResponseResult<Book[]>}
 */
export function getBookByIds(ids) {
  return request.get("/books", {
    params: { ids },
  });
}

/**
 * @param {Book} book
 * @returns {ResponseResult<undefined>}
 */
export function updateBook(book) {
  return request.put("/books", book);
}
