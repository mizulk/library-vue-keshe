import toast from "@/components/toast";

/**
 * @param {string} msg
 * @param {any} error
 */
export function failure(msg, error) {
  toast({ message: msg + error.toString(), type: "danger" });
}

/**
 * @param {string} msg
 */
export function success(msg) {
  toast({ message: msg, type: "success" });
}
