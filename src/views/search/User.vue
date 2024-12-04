<script setup>
import BusinessCard from "@/components/BusinessCard.vue";
import { searchUsers } from "@/api/user";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { Toast } from "@/components/toast";

const route = useRoute();

const users = ref([]);

watch(
  () => route.query.keyword,
  (value) => {
    getData(value);
  },
);
getData(route.query.keyword);
function getData(keyword) {
  searchUsers(keyword)
    .then((result) => {
      users.value = result.data.data;
    })
    .catch((e) => {
      Toast.danger(`搜索用户时发生错误：${e.toString()}`);
    });
}
</script>

<template>
  <div class="search-user">
    <BusinessCard
      v-for="item in users"
      :key="item.id"
      :img="item.img"
      :name="item.name"
      :brief="item.sign"
      :to="`/user/${item.id}/collection`"
      :id="item.id"
    ></BusinessCard>
  </div>
</template>

<style lang="scss" scoped>
.search-user {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
}
</style>
