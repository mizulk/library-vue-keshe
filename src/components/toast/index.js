import { h, render } from "vue";
import ToastVue from "./Toast.vue";

const instances = [];

/**@param {import('./types').ToastOption} options*/
function toast(options) {
  let top = 20;

  instances.forEach((vm) => {
    top += vm.el.offsetHeight + 16 || 16;
  });

  const container = document.createDocumentFragment();

  const vm = h(ToastVue, {
    ...options,
    top,
    onClose() {
      close(vm);
    },
    onDestroy() {
      render(null, container);
    },
  });

  render(vm, container);
  document.body.appendChild(container);

  instances.push(vm);
}

function close(vm) {
  const index = instances.findIndex((ins) => ins === vm);
  if (index === -1) return;

  instances.splice(index, 1);

  for (let start = index; start < instances.length; start++) {
    const cpn = instances[start].component;
    cpn.props.top -= vm.el.offsetHeight + 16;
  }
}

["info", "danger", "success", "warning"].forEach((type) => {
  toast[type] = (options) => {
    options.type = type;
    return toast(options);
  };
});

/**@type {import("./types").Toast} */
export const Toast = {
  info(msg) {
    toast({ message: msg, type: "info" });
  },
  warning(msg) {
    toast({ message: msg, type: "warning" });
  },
  success(msg) {
    toast({ message: msg, type: "success" });
  },
  danger(msg) {
    toast({ message: msg, type: "danger" });
  },
};

export default toast;
