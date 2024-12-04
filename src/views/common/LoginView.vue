<script setup>
import IInput from "@/components/input/IInput.vue";
import IButton from "@/components/input/IButton.vue";
import ICheckBox from "@/components/input/ICheckBox.vue";
import ILink from "@/components/input/ILink.vue";
import AuthenticationPanel from "@/components/common/AuthenticationPanel.vue";

import { Toast } from "@/components/toast";
import { ref } from "vue";
import { login } from "@/api/user";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useCartStore } from "@/stores/cart";
import { useCollectionStore } from "@/stores/collection";

const router = useRouter();
const isAgree = ref(false);
const account = ref("");
const password = ref("");

const userStore = useUserStore();
const cartStore = useCartStore();
const collectionStore = useCollectionStore();

function onLoginClick() {
  if (!isAgree.value) {
    Toast.danger("请先勾选使用条约");
    return;
  }
  if (account.value == "" || password.value == "") {
    Toast.danger("请输入账或和密码");
    return;
  }
  login(account.value, password.value)
    .then((result) => {
      userStore.setLoginUser(result.data.data);
      Toast.success("登录成功3秒后跳转首页");
      cartStore.updateData();
      collectionStore.updateData();
      setTimeout(() => {
        router.push("/index");
      }, 3000);
    })
    .catch((e) => {
      Toast.danger(`登录时发生异常：${e.toString()}`);
    });
}
</script>

<template>
  <AuthenticationPanel height="500px">
    <section class="login-wrapper">
      <h1 class="login-title">欢迎登录</h1>
      <div class="input-wrapper">
        <div class="login-input-item">
          账号：
          <IInput
            class="login-input"
            v-model="account"
            placeholder="请输入你的账号"
          />
        </div>
        <div class="login-input-item">
          密码：
          <IInput
            class="login-input"
            v-model="password"
            placeholder="请输入你的密码"
            type="password"
          />
        </div>
      </div>
      <div class="login-agreement">
        <ICheckBox text="同意使用条约" v-model="isAgree" />
      </div>
      <div class="login-link-wrapper">
        没有有账号？<ILink to="/register" type="primary">点我去注册</ILink>。
      </div>
      <div class="login-btn-wrapper">
        <IButton class="login-btn" @click="onLoginClick">登录</IButton>
      </div>
    </section>
  </AuthenticationPanel>
</template>

<style lang="scss" scoped>
.login {
  &-wrapper {
    width: 360px;
    height: 300px;
    position: absolute;
    right: 60px;
    top: 30%;

    .login-title {
      font-size: 32px;
      margin-bottom: 30px;
    }

    .input-wrapper {
      display: flex;
      flex-direction: column;

      .login-input {
        margin: 10px 10px 10px 0;
        flex: 1;
      }

      .login-input-item {
        display: flex;
        flex-direction: column;
      }
    }

    .login-agreement,
    .login-link-wrapper {
      margin-top: 10px;
    }

    .login-btn-wrapper {
      display: flex;
      margin-top: 20px;

      .login-btn {
        flex: 1;
        padding: 10px;
      }
    }
  }
}
</style>
