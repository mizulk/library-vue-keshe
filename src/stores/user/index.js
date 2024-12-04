import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useCartStore } from "../cart";

export const useUserStore = defineStore(
  "user",
  () => {
    const cartStore = useCartStore();

    /**@type {import("vue").Ref<import("@/api/user/types").User> | null} */
    const loginUser = ref(null);
    /**@type {import("vue").Ref<string> | null} */
    const token = ref(null);

    const isUserLogin = computed(() => {
      return loginUser.value != null;
    });

    const getLoginUser = computed(() => {
      return loginUser.value;
    });

    /**
     * @param {string} jwt
     */
    function setLoginUser(jwt) {
      token.value = jwt;

      let claims = jwt.split(".")[1];
      let user = JSON.parse(window.atob(claims));
      user.sign = decodeURI(user.sign);
      user.name = decodeURI(user.name);
      loginUser.value = user;
    }

    function logout() {
      token.value = null;
      loginUser.value = null;
      cartStore.logout();
    }

    return {
      token,
      loginUser,
      //getter
      isUserLogin,
      getLoginUser,
      // action
      setLoginUser,
      logout,
    };
  },
  {
    persist: true,
  },
);
