import request from "@/request";

/**@typedef {import("./types").User} User*/
/**
 * @template T
 * @typedef {import("@/request/types").ResponseResult<T>} ResponseResult<T>
 */

/**
 * @param {number} userId
 * @param {string} password
 * @returns {ResponseResult<string>}
 */
export function login(userId, password) {
  return request.post("/users/login", { id: userId, password });
}

/**
 * @returns {ResponseResult<User[]>}
 */
export function getUsers() {
  return request.get("/users");
}

/**
 * @param {number} id
 * @returns {ResponseResult<User>}
 */
export function getUserById(id) {
  return request.get(`/users/${id}`);
}

/**
 * @param {string} keyword
 * @returns {ResponseResult<User[]>}
 */
export function searchUsers(keyword) {
  return request.get("/users", {
    params: { keyword },
  });
}

/**
 * @param {User} data
 * @returns {ResponseResult<User>}
 */
export function register(data) {
  return request.post("/users/register", data);
}

/**
 * @param {User} data
 * @returns {ResponseResult<undefined>}
 */
export function updateUser(data) {
  return request.put("/users", data);
}
