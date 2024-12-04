import { h, render } from "vue";
import DialogVue from "./Dialog.vue";

/**@param {import("./types").DislogOption} options */
function dialog(options) {
  const container = document.createDocumentFragment();

  const vm = h(DialogVue, {
    ...options,
    onDestroy() {
      render(null, container);
    },
  });

  render(vm, container);
  document.body.appendChild(container);
}

export const Dialog = {
  confirm(msg) {
    return new Promise((resolve, reject) => {
      dialog({
        message: msg,
        onConfirm() {
          resolve();
        },
        onCancel() {
          reject();
        },
      });
    });
  },
};

export default dialog;
