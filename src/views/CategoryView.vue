<script setup>
import Book from "@/components/Book.vue";

import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getBookByType } from "@/api/book";
import { Toast } from "@/components/toast";

const route = useRoute();
if (!route.query.type) route.query.type = "文学类";
const books = ref([]);

const types = ["文学类", "历史类", "艺术类", "外语类"];

watch(
  () => route.query.type,
  (newValue, _oldValue) => {
    getData(newValue);
  },
);

onMounted(() => {
  getData(route.query.type);
});

function getData(type) {
  getBookByType(type)
    .then((result) => {
      books.value = result.data.data;
    })
    .catch((e) => {
      Toast.danger("获取图书失败：" + e.toString());
    });
}
</script>

<template>
  <div class="category-view">
    <aside class="category-aside">
      <div
        v-for="(item, index) in types"
        :key="index"
        :class="['type-item', { active: $route.query.type == item }]"
      >
        <RouterLink
          :to="{ path: '/category', query: { type: item } }"
          class="text"
          >{{ item }}</RouterLink
        >
      </div>
    </aside>
    <main class="category-main">
      <div v-if="books.length != 0" class="book-list">
        <Book v-for="item in books" :key="item.id" :data="item"></Book>
      </div>
      <div v-else class="no-result">
        <span>没有相关的书籍哦。</span>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.category {
  &-view {
    width: 100%;
    display: flex;
    height: calc(100vh - 90px);
    min-height: 700px;
  }

  $category-aside-width: 192px;
  &-aside {
    width: $category-aside-width;
    height: 100%;
    flex-shrink: 0;
    background-color: var(--color-background);

    $type-item-height: 72px;
    .type-item {
      width: 100%;
      height: $type-item-height;
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
        line-height: $type-item-height;
        display: inline-block;
      }
    }
  }

  &-main {
    flex-grow: 1;
    height: 100%;
    background-color: var(--color-background);
    margin-left: 16px;

    > .book-list {
      height: 100%;
      overflow-y: scroll;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(3, 1fr);
      align-items: start;
      row-gap: 10px;
      justify-items: center;
    }

    > .no-result {
      height: 100%;
      font-size: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
