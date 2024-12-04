<script setup>
import IInput from "@/components/input/IInput.vue";
import IButton from "@/components/input/IButton.vue";
import ICheckBox from "@/components/input/ICheckBox.vue";
import ILink from "@/components/input/ILink.vue";
import Dialog from "@/components/dailog/Dialog.vue";
import AuthenticationPanel from "@/components/common/AuthenticationPanel.vue";

import { ref, reactive } from "vue";
import { Toast } from "@/components/toast";
import { register, updateUser } from "@/api/user";
import { useRouter } from "vue-router";

const router = useRouter();

const userInfo = reactive({
  id: -1,
  userName: "",
  password: "",
  repPassword: "",
  sign: "",
});

const isAgree = ref(false);
const isDialogVisible = ref(false);

function onRegisterClick() {
  if (userInfo.userName == "") {
    Toast.warning("请输入用户名");
  } else if (userInfo.password == "") {
    Toast.warning("请输入密码");
  } else if (userInfo.repPassword == "") {
    Toast.warning("请重复输入密码");
  } else if (userInfo.repPassword != userInfo.password) {
    Toast.warning("两次输入的密码不一致");
  } else if (!isAgree.value) {
    Toast.warning("请同意用户协议");
  } else {
    register({
      name: userInfo.userName,
      password: userInfo.password,
    })
      .then((result) => {
        if (result.data.code == 200) {
          userInfo.id = result.data.data.id;
          isDialogVisible.value = true;
        }
      })
      .catch((e) => {
        Toast.danger("注册失败！" + e.toString());
      });
  }
}
function onConfirmClick() {
  updateUser({
    id: userInfo.id,
    sign: userInfo.sign,
    img: "0.png",
  })
    .then((result) => {
      if (result.data.code == 200) {
        isDialogVisible.value = false;
        Toast.success("注册成功！三秒后跳转登录界面");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    })
    .catch((e) => {
      Toast.danger("注册失败！" + e.toString());
    });
}
</script>

<template>
  <AuthenticationPanel height="600px">
    <section class="register-wrapper">
      <h1 class="register-title">欢迎注册</h1>
      <div class="input-wrapper">
        <div class="register-input-item">
          用户名：
          <IInput
            class="register-input"
            v-model="userInfo.userName"
            placeholder="请输入你的用户名"
          />
        </div>
        <div class="register-input-item">
          密码：
          <IInput
            class="register-input"
            v-model="userInfo.password"
            placeholder="请输入你的密码"
            type="password"
          />
        </div>
        <div class="register-input-item">
          验证密码：
          <IInput
            class="register-input"
            v-model="userInfo.repPassword"
            placeholder="请再输入你的密码"
            type="password"
          />
        </div>
      </div>
      <div class="register-agreement">
        <ICheckBox text="同意使用条约" v-model="isAgree" />
      </div>
      <div class="register-link-wrapper">
        已经有账号了！<ILink to="/login" type="primary">点我去登录</ILink>。
      </div>
      <div class="register-btn-wrapper">
        <IButton class="register-btn" @click="onRegisterClick">注册</IButton>
      </div>
    </section>
    <Dialog
      v-model="isDialogVisible"
      :closeOnClickModal="false"
      :title="`欢迎${userInfo.userName}, 请完善你的信息：`"
      option="confirm"
      @confirm="onConfirmClick"
    >
      <p>你的账号为：{{ userInfo.id }}</p>
      <p>请牢记！</p>
      <br />
      <p>
        签名：
        <IInput v-model="userInfo.sign" placeholder="请输入你的签名" />
      </p>
    </Dialog>
  </AuthenticationPanel>
</template>

<style lang="scss" scoped>
.register {
  &-wrapper {
    width: 360px;
    height: 300px;
    position: absolute;
    right: 60px;
    top: 30%;

    .register-title {
      font-size: 32px;
      margin-bottom: 30px;
    }

    .input-wrapper {
      display: flex;
      flex-direction: column;

      .register-input {
        margin: 10px 10px 10px 0;
        flex: 1;
      }

      .register-input-item {
        display: flex;
        flex-direction: column;
      }
    }

    .register-agreement,
    .register-link-wrapper {
      margin-top: 10px;
    }

    .register-btn-wrapper {
      display: flex;
      margin-top: 20px;

      .register-btn {
        flex: 1;
        padding: 10px;
      }
    }
  }
}
</style>
