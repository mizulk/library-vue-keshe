import request from "@/request";

/**@typedef {import("./types").Follow} Follow */

/**
 * @template T
 * @typedef {import("@/request/types").ResponseResult<T>} ResponseResult<T>
 */

/**
 *
 * @param {Follow} follow
 * @returns {ResponseResult<undefined>}
 */
export function addFollow(follow) {
  return request.post("/follows", follow);
}

/**
 * @param {number} userId
 * @param {number} authorId
 * @returns {ResponseResult<undefined>}
 */
export function delFollow(userId, authorId) {
  return request.delete("/follows", {
    params: { userId, authorId },
  });
}

/**
 * @param {number} id
 * @returns {ResponseResult<Follow[]>}
 */
export function getFollowByUserId(id) {
  return request.get("/follows", {
    params: { userId: id },
  });
}
