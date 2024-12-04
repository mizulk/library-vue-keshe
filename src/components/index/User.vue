<script setup>
import Avatar from "../Avatar.vue";
import IButton from "../input/IButton.vue";

import { ref } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const isLogin = ref(userStore.isUserLogin);
const loginUser = ref(userStore.getLoginUser);

function onLogoutClick() {
  userStore.logout();
  isLogin.value = false;
}
</script>

<template>
  <div class="user">
    <template v-if="isLogin">
      <div class="user-info-wrapper">
        <Avatar :img="loginUser.img" size="80px" />
        <div class="user-name">{{ loginUser.name }}</div>
      </div>
      <div class="user-btn-wrapper">
        <IButton
          class="btn"
          type="default"
          @click="$router.push({ path: `/user/${loginUser.id}/collection` })"
        >
          个人中心
        </IButton>
        <IButton type="default" class="btn" @click="onLogoutClick">
          退出登录
        </IButton>
      </div>
    </template>
    <template v-else>
      <div class="text">你还没有登录呢</div>
      <div class="user-btn-wrapper">
        <IButton class="btn" type="default" @click="$router.push('/login')">
          登录
        </IButton>
        <IButton class="btn" type="default" @click="$router.push('/register')">
          注册
        </IButton>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.user {
  width: 256px;
  background-color: violet;

  &-info-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 70%;

    > .user-img-wrapper {
      width: 100px;
      height: 100px;
      background-color: #fff;
      border-radius: 50%;
    }

    > .user-name {
      font-size: 20px;
    }
  }

  .text {
    height: 70%;
    font-size: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-btn-wrapper {
    display: flex;
    flex-direction: column;
    height: 30%;

    > .btn {
      flex: 1;
      margin: 10px;
      font-size: 18px;
    }
  }
}
</style>
