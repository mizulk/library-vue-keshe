<script setup>
import Avatar from "@/components/Avatar.vue";
import IButton from "./input/IButton.vue";
import IInput from "./input/IInput.vue";
import defalutIcon from "@/assets/defaultIcon.png";
import { ref, watch } from "vue";
import { useUserStore } from "@/stores/user";

const emit = defineEmits(["publishClick"]);

const userStore = useUserStore();

const content = ref("");
const isDisabled = ref(true);

watch(content, (newValue, _oldValue) => {
  isDisabled.value = newValue.length <= 0;
});

function onPublishClick() {
  emit("publishClick", content.value);
  content.value = "";
}
</script>

<template>
  <div class="write-comment">
    <Avatar
      :img="userStore.isUserLogin ? userStore.getLoginUser.img : defalutIcon"
    />
    <IInput
      class="comment-input"
      v-model.trim="content"
      :disabled="!userStore.isUserLogin"
      :placeholder="
        userStore.isUserLogin ? '写一下你的看法吧！' : '登录后才能评论喔！'
      "
    />
    <IButton class="publish-btn" :disabled="isDisabled" @click="onPublishClick">
      发布
    </IButton>
  </div>
</template>

<style lang="scss" scoped>
.write-comment {
  display: flex;
  .comment-input {
    font-size: 17px;
    margin: 10px 0 10px 20px;
    flex: 1 0;
    padding: 10px;
  }

  .publish-btn {
    width: 100px;
    margin: 10px;
  }
}
</style>
