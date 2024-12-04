import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useUserStore } from "../user";
import { getCollectionsByUserId } from "@/api/collection";
import { Toast } from "@/components/toast";

export const useCollectionStore = defineStore("collection", () => {
  const userStore = useUserStore();

  /**@type {import("vue").Ref<import("@/api/collection").Collection[]>} */
  const items = ref([]);

  function updateData() {
    if (!userStore.isUserLogin) return;
    getCollectionsByUserId(userStore.getLoginUser.id)
      .then((result) => {
        items.value = result.data.data;
      })
      .catch((/**@type {import('axios').AxiosError}*/ e) => {
        if (e.response.status != 401) Toast.danger("无法获取收藏列表");
      });
  }

  return {
    //state
    items,
    //getter

    //action
    updateData,
  };
});
