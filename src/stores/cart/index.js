import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getCartItemsByUserId } from "@/api/cart";
import { useUserStore } from "../user";
import { Toast } from "@/components/toast";

/**@typedef {import("@/api/cart/types").Cart} CartItem*/

export const useCartStore = defineStore(
  "cart",
  () => {
    const userStore = useUserStore();

    /**@type {import('vue').Ref<CartItem[]>} */
    const items = ref([]);

    const hasItem = computed(() => items.value.length > 0);

    const amount = computed(() => items.value.length);

    function updateData() {
      if (!userStore.isUserLogin) return;
      getCartItemsByUserId(userStore.getLoginUser.id)
        .then((result) => {
          items.value = result.data.data;
        })
        .catch((/**@type {import('axios').AxiosError}*/ e) => {
          if (e.response.status != 401) Toast.danger("无法获取购物车内容");
        });
    }

    function deleteCart(cartId) {
      items.value = items.value.filter((item) => item.id != cartId);
    }

    function logout() {
      items.value = [];
    }

    return {
      //state
      items,
      // getter
      amount,
      hasItem,
      // action
      updateData,
      deleteCart,
      logout,
    };
  },
  {
    persist: true,
  },
);
