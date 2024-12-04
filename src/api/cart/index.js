import request from "@/request";

/**@typedef {import("./types").Cart} Cart*/
/**
 * @template T
 * @typedef {import("@/request/types").ResponseResult<T>} ResponseResult<T>
 */

/**
 * @param {number} userId
 * @returns {ResponseResult<Cart[]>}
 */
export function getCartItemsByUserId(userId) {
  return request.get("/carts", {
    params: { userId },
  });
}

/**
 * @param {Cart} cartItem
 * @returns {ResponseResult<undefined>}
 */
export function addCartItem(cartItem) {
  return request.post("/carts", cartItem);
}

/**
 * @param {Cart} cartItem
 * @returns {ResponseResult<undefined>}
 */
export function updateCartItem(cartItem) {
  return request.put("/carts", cartItem);
}

/**
 * @param {number} id
 * @returns {ResponseResult<undefined>}
 */
export function deleteCartItemById(id) {
  return request.delete(`/carts/${id}`);
}

/**
 *
 * @param {number[]} ids
 * @returns {ResponseResult<undefined>}
 */
export function deleteCarts(ids) {
  return request.delete(`/carts/${ids.join(",")}`);
}
