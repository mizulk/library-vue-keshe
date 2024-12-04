<script setup>
import Book from "@/components/Book.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getCollectionsByUserId } from "@/api/collection";

/**@typedef {import('@/api/collection/types').Collection} Collection */

const route = useRoute();

/**@type {import("vue").Ref<Collection[]>} */
const collections = ref([]);

onMounted(() => {
  getCollectionsByUserId(route.params.id).then((result) => {
    collections.value = result.data.data;
  });
});
</script>

<template>
  <div class="my-collection">
    <section v-if="collections.length != 0" class="list">
      <Book v-for="item in collections" :key="item.id" :data="item.book" />
    </section>
    <section v-else class="no-result">该用户暂时没有收藏书籍</section>
  </div>
</template>

<style lang="scss" scoped>
.my-collection {
  height: 100%;
  background: var(--color-background);

  .list {
    height: 100%;
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    row-gap: 6px;
    overflow-y: scroll;
  }

  .no-result {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
  }
}
</style>
