<script setup>
import Book from "@/components/Book.vue";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { searchBook } from "@/api/book";
import { Toast } from "@/components/toast";

const route = useRoute();

const books = ref([]);

watch(
  () => route.query.keyword,
  (value) => {
    getData(value);
  },
);
getData(route.query.keyword);
function getData(keyword) {
  searchBook(keyword)
    .then((result) => {
      books.value = result.data.data;
    })
    .catch((e) => {
      Toast.danger(`搜索图书时发生错误：${e.toString()}`);
    });
}
</script>

<template>
  <div class="search-book">
    <Book v-for="item in books" :key="item.id" :data="item" />
  </div>
</template>

<style lang="scss" scoped>
.search-book {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  column-gap: 10px;
  row-gap: 10px;
}
</style>
