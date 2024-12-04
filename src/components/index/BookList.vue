<script setup>
import Book from "../Book.vue";
import { ref, onMounted } from "vue";
import { getBooks } from "@/api/book";

const books = ref([]);

onMounted(() => {
  getBooks().then((result) => {
    books.value = result.data.data;
  });
});
</script>

<template>
  <div class="book-list">
    <Book v-for="item in books" :key="item.id" :data="item"></Book>
  </div>
</template>

<style lang="scss" scoped>
.book-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr 1fr;
  row-gap: 10px;
  column-gap: 10px;
}
</style>
