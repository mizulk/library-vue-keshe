<script setup>
import Avatar from "../Avatar.vue";
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { getAuthor } from "@/api/author";

const authorList = ref([]);

onMounted(() => {
  getAuthor(6).then((result) => {
    authorList.value = result.data.data;
  });
});
</script>

<template>
  <div class="author-list">
    <ul class="author-list-body">
      <li v-for="item in authorList" :key="item.id" class="author-list-item">
        <RouterLink class="link" :to="`/author/${item.id}`">
          <div class="author-img-wrapper">
            <Avatar :img="item.img" size="80px" />
          </div>
          <span class="text"> {{ item.name }} </span>
        </RouterLink>
      </li>
      <li class="author-list-item">
        <RouterLink class="link" to="/author-list">
          <span class="text">查看更多...</span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.author-list {
  height: 160px;
  &-body {
    height: 100%;
    display: flex;
    background-color: var(--color-background);
  }

  &-item {
    flex: 1 0;
    height: 100%;
    transition: background 0.3s;
    cursor: pointer;

    &:hover {
      background-color: var(--color-background-hover);
    }

    &:active {
      background-color: var(--color-background-active);
    }

    .author-img-wrapper {
      width: 80px;
      height: 80px;
      background-color: var(--color-background);
      border-radius: 50%;
      overflow: hidden;

      .author-img {
        width: 80px;
        height: 80px;
      }
    }

    .text {
      display: inline-block;
      width: 100%;
      font-size: 18px;
      text-align: center;
      margin-top: 10px;
    }

    .link {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
