import request from "@/request";

/**@typedef {import("./types").Author} Author */

/**
 * @template T
 * @typedef {import("@/request/types").ResponseResult<T>} ResponseResult<T>
 */

/**
 * @param {number} count
 * @returns {ResponseResult<Author[]>}
 */
export function getAuthor(count) {
  return request.get("/authors", {
    params: { limit: count },
  });
}

/**
 * @param {number} id
 * @returns {ResponseResult<Author>}
 */
export function getAuthorById(id) {
  return request.get(`/authors/${id}`);
}

/**
 *
 * @param {string} keyword
 * @returns {ResponseResult<Author[]>}
 */
export function searchAuthor(keyword) {
  return request.get("/authors", {
    params: { keyword },
  });
}

/**
 *
 * @param {number[]} ids
 * @returns {ResponseResult<Author[]>}
 */
export function getAuthorsByIds(ids) {
  return request.get("/authors", { params: { ids } });
}
