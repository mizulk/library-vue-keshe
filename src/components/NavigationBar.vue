<script setup>
import IconSearch from "@/components/icons/IconSearch.vue";
import IButton from "./input/IButton.vue";
import IInput from "./input/IInput.vue";

import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const router = useRouter();
const searchContent = ref("");

function onSearchClick() {
  router.push({
    path: "/search/book",
    query: { keyword: searchContent.value },
  });
}
</script>

<template>
  <div class="navigation-bar">
    <div class="navigation-wrapper">
      <RouterLink to="/index">
        <section class="logo-wrapper">
          <img class="logo" src="@/assets/Logo.png" alt="" />
          <div class="name">阅读•时光</div>
        </section>
      </RouterLink>
      <nav class="top-nav">
        <div class="nav-item">
          <RouterLink class="text" to="/index">首页</RouterLink>
        </div>
        <div class="nav-item">
          <RouterLink class="text" to="/category">图书分类</RouterLink>
        </div>
        <div class="nav-item">
          <RouterLink class="text" to="/author-list">作者列表</RouterLink>
        </div>
      </nav>
      <section
        class="search-wrapper"
        :style="{
          visibility: $route.meta.hiddenSearchBar ? 'hidden' : 'visible',
        }"
      >
        <IInput
          class="search-input"
          placeholder="搜索一下吧"
          v-model.trim="searchContent"
        />
        <IButton class="search-btn" @click="onSearchClick">
          <IconSearch fill="#fff" width="26px" />
          <span class="text">搜索</span>
        </IButton>
      </section>
      <section class="user-wrapper">
        <RouterLink
          v-if="userStore.isUserLogin"
          :to="`/user/${userStore.getLoginUser.id}/collection`"
        >
          用户中心
        </RouterLink>
        <RouterLink v-else to="/login">登录</RouterLink>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$header-height: 60px;

.navigation-bar {
  height: $header-height;
  font-size: 26px;
  margin-bottom: 10px;
  position: sticky;
  top: 0;
  z-index: 97;
  background-color: #fff;

  .navigation-wrapper {
    height: $header-height;
    display: flex;
    width: 1200px;
    margin: 0 auto;
    text-wrap: nowrap;
  }

  .logo-wrapper {
    height: $header-height;
    display: flex;
    align-items: center;
    cursor: pointer;

    .logo {
      margin-left: 30px;
      border-radius: 50%;
      width: $header-height;
    }

    .name {
      margin-left: 20px;
      user-select: none;
    }
  }

  .top-nav {
    width: 500px;
    height: $header-height;
    display: flex;
    margin: 0 10px;

    .nav-item {
      flex: 1 0;
      height: $header-height;
      line-height: $header-height;
      text-align: center;
      transition: background 0.3s;

      &:hover {
        background: var(--color-background-hover);
        cursor: pointer;
      }

      .text {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
  }

  .search {
    &-wrapper {
      display: flex;
      margin: 12px 0;
    }
    &-input {
      width: 300px;
      font-size: 20px;
      margin-right: 10px;
    }
    &-btn {
      .text {
        margin-left: 8px;
      }
    }
  }

  .user {
    &-wrapper {
      height: $header-height;
      display: flex;
      align-items: center;
      transition: background 0.3s;
      padding: 0 20px;
      margin: 0 10px;
      cursor: pointer;

      &:hover {
        background: var(--color-background-hover);
      }
    }
  }
}
</style>
