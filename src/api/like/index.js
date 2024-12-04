import request from "@/request";

/**@typedef {import("./types").Like} Like */
/**
 * @template T
 * @typedef {import("@/request/types").ResponseResult<T>} ResponseResult<T>
 */

/**
 * @param {number} id
 * @returns {ResponseResult<Like[]>}
 */
export function getLikeByUserId(id) {
  return request.get("/likes", {
    params: { userId: id },
  });
}

/**
 * @param {number} userId
 * @param {number} bookId
 * @returns {ResponseResult<Like[]>}
 */
export function getLikeByUserIdAndBookId(userId, bookId) {
  return request.get("/likes", {
    params: { userId, bookId },
  });
}

/**
 * @param {number} userId
 * @param {number} bookId
 * @returns {ResponseResult<undefined>}
 */
export function addLike(userId, bookId) {
  return request.post("/likes", { userId, bookId });
}

/**
 * @param {number} id
 * @returns {ResponseResult<undefined>}
 */
export function deleteLike(id) {
  return request.delete(`/likes/${id}`);
}
