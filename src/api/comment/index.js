import request from "@/request";

/**@typedef {import("./types").Comment} Comment */

/**
 * @template T
 * @typedef {import("@/request/types").ResponseResult<T>} ResponseResult<T>
 */

/**
 * @param {number} id
 * @returns {ResponseResult<Comment[]>}
 */
export function getCommentsByBookId(id) {
  return request.get("/comments", {
    params: { bookId: id },
  });
}

/**
 * @param {number} id
 * @returns {ResponseResult<Comment[]>}
 */
export function getCommentsByUserId(id) {
  return request.get("/comments", {
    params: { userId: id },
  });
}

/**
 * @param {Comment} comment
 * @returns {ResponseResult<undefined>}
 */
export function addComment(comment) {
  return request.post("/comments", comment);
}

/**
 * @param {Comment} comment
 * @returns {ResponseResult<undefined>}
 */
export function updateComment(comment) {
  return request.put("/comments", comment);
}
