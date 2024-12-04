<script setup>
import BusinessCard from "@/components/BusinessCard.vue";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { searchAuthor } from "@/api/author";
import { Toast } from "@/components/toast";

const route = useRoute();
const authors = ref([]);

watch(
  () => route.query.keyword,
  (value) => {
    getData(value);
  },
);

getData(route.query.keyword);
function getData(keyword) {
  searchAuthor(keyword)
    .then((result) => {
      authors.value = result.data.data;
    })
    .catch((e) => {
      Toast.danger(`搜索图书时发生错误：${e.toString()}`);
    });
}
</script>

<template>
  <div class="search-author">
    <BusinessCard
      v-for="item in authors"
      :key="item.id"
      :img="item.img"
      :name="item.name"
      :brief="item.brief"
      :to="`/author/${item.id}`"
      :id="item.id"
    ></BusinessCard>
  </div>
</template>

<style lang="scss" scoped>
.search-author {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
}
</style>
