<script setup>
import IconSearch from "@/components/icons/IconSearch.vue";
import IInput from "@/components/input/IInput.vue";
import IButton from "@/components/input/IButton.vue";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const router = useRouter();

const searchContent = ref(route.query.keyword);
const searchTypeOption = [
  { path: "book", name: "图书" },
  { path: "author", name: "作者" },
  { path: "user", name: "用户" },
];
function search() {
  let path = "";
  switch (route.name) {
    case "图书搜索":
      path = "book";
      break;
    case "作者搜索":
      path = "author";
      break;
    case "用户搜索":
      path = "user";
      break;
  }
  router.push({ path, query: { keyword: searchContent.value } });
}
</script>

<template>
  <div class="search-view">
    <section class="search-wrapper">
      <IInput
        class="search-input"
        v-model="searchContent"
        placeholder="搜索一下，我不到啊"
      />
      <IButton class="search-btn" @click="search">
        <IconSearch fill="#fff" width="26px" />
        <span class="text">搜索</span>
      </IButton>
    </section>
    <section class="search-type">
      <ul class="search-type-wrapper">
        <li
          v-for="(item, index) in searchTypeOption"
          :key="index"
          :class="[
            'search-type-item',
            { active: $route.meta.title.includes(item.name) },
          ]"
        >
          <RouterLink
            :to="{
              path: `/search/${item.path}`,
              query: { keyword: searchContent },
            }"
          >
            <span class="text">{{ item.name }}</span>
          </RouterLink>
        </li>
      </ul>
    </section>
    <!-- TODO: 搜索筛选 -->
    <section class="search-filter"></section>
    <section class="search-result-wrapper">
      <RouterView></RouterView>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.search {
  &-view {
    background-color: var(--color-background);
  }

  &-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;

    .search-input {
      width: 460px;
    }

    .search-btn {
      height: 40px;
      margin-left: 20px;
    }
  }

  &-type {
    &-wrapper {
      padding: 0 60px;
      display: flex;
    }

    &-item {
      font-size: 18px;
      padding: 10px;
      margin: 0 20px;

      &.active {
        border-bottom: 2px var(--c-bright-blue) solid;
        .text {
          color: var(--c-bright-blue);
        }
      }
    }
  }

  &-filter {
    height: 60px;
  }
}
</style>
