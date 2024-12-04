<script setup>
import Avatar from "@/components/Avatar.vue";
import { useUserStore } from "@/stores/user";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { getUserById } from "@/api/user";

const userStore = useUserStore();
const route = useRoute();

const user = ref({ img: "" });

const menuOption = [
  { name: "收藏", to: "collection" },
  { name: "关注的作者", to: "author" },
];

if (userStore.isUserLogin && userStore.getLoginUser.id == route.params.id) {
  user.value = userStore.getLoginUser;
} else {
  getUserById(route.params.id).then((result) => {
    user.value = result.data.data;
  });
}
</script>

<template>
  <div class="user-view">
    <section class="user-info">
      <div class="left">
        <Avatar size="100px" :img="user.img" />
      </div>
      <div class="right">
        <h2 class="user-name">{{ user.name }}</h2>
        <p class="user-sign">{{ user.sign }}</p>
      </div>
    </section>
    <section class="user-main">
      <aside class="user-aside">
        <div
          v-for="(item, index) in menuOption"
          :key="index"
          :class="['menu-item', { active: $route.meta.title == item.name }]"
        >
          <RouterLink class="text" :to="`/user/${route.params.id}/${item.to}`">
            {{ item.name }}
          </RouterLink>
        </div>
      </aside>
      <main class="router-view-wrapper">
        <RouterView></RouterView>
      </main>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.user {
  $user-info-height: 208px;
  &-info {
    display: flex;
    height: $user-info-height;
    margin-bottom: 16px;
    background: var(--color-background);

    > .left {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 200px;
    }

    > .right {
      padding: 64px 0 0 64px;
      flex: 1;
      .user-name {
        font-size: 32px;
        margin-bottom: 18px;
      }

      .user-sign {
        font-size: 22px;
      }
    }
  }
  &-main {
    width: 100%;
    height: calc(100vh - 96px - $user-info-height - 10px);
    display: flex;
    .user-aside {
      height: 100%;
      width: 200px;
      background: var(--color-background);
    }

    $menu-item-height: 72px;
    .menu-item {
      width: 100%;
      height: $menu-item-height;
      font-size: 20px;

      &:hover {
        color: var(--c-bright-blue);
        background-color: var(--color-background-hover);
      }

      &.active > .text {
        color: var(--c-bright-blue);
      }

      .text {
        height: 100%;
        width: 100%;
        text-align: center;
        line-height: $menu-item-height;
        display: inline-block;
      }
    }

    .router-view-wrapper {
      margin-left: 16px;
      flex: 1 0;
    }
  }
}
</style>
