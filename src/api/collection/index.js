import request from "@/request";

/**@typedef {import("./types").Collection} Collection */

/**
 * @template T
 * @typedef {import("@/request/types").ResponseResult<T>} ResponseResult<T>
 */

/**
 * @param {number} id
 * @returns {ResponseResult<Collection[]>}
 */
export function getCollectionsByUserId(id) {
  return request.get("/collections", {
    params: { userId: id },
  });
}

/**
 * @param {number} userId
 * @param {number} bookId
 * @returns {ResponseResult<Collection[]>}
 */
export function getCollectionByUserIdAndBookId(userId, bookId) {
  return request.get("/collections", {
    params: { userId, bookId },
  });
}

/**
 * @param {number} userId
 * @param {number} bookId
 * @returns {ResponseResult<undefined>}
 */
export function addCollection(userId, bookId) {
  return request.post("/collections", { userId, book: { id: bookId } });
}

/**
 * @param {number[]} ids
 * @returns {ResponseResult<undefined>}
 */
export function deleteCollections(ids) {
  return request.delete(`/collections/${ids.join(",")}`);
}
