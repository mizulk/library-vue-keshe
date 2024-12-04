<script setup>
import BusinessCard from "@/components/BusinessCard.vue";
import { ref, onMounted } from "vue";
import { delFollow, getFollowByUserId } from "@/api/follow";
import { useRoute } from "vue-router";
import { Toast } from "@/components/toast";
import { useUserStore } from "@/stores/user";

/**@typedef {import('@/api/follow/types').Follow} Follow */

const route = useRoute();
const authors = ref([]);
const userStore = useUserStore();

/**@type {import("vue").Ref<Follow[]> */
const follows = ref([]);

onMounted(() => {
  getFollowByUserId(route.params.id).then((result) => {
    if (result.data.data.length != 0) {
      follows.value = result.data.data;
    }
  });
});
function onFollowClick(authorId) {
  delFollow(userStore.getLoginUser.id, authorId)
    .then((result) => {
      if (result.data.code == 200) Toast.success("取消关注成功");
    })
    .catch((e) => {
      Toast.danger("取消关注失败");
    });
}
</script>

<template>
  <div class="follow-author">
    <section v-if="authors.length != 0" class="list">
      <BusinessCard
        class="item"
        v-for="item in follows"
        :key="item.id"
        :img="item.author.img"
        :name="item.author.name"
        :brief="item.author.brief"
        :to="`/author/${item.author.id}`"
        :is-follow="true"
        @followClick="onFollowClick"
        :id="item.id"
        :hide-follow-btn="
          userStore.isUserLogin && $route.params.id != userStore.getLoginUser.id
        "
      ></BusinessCard>
    </section>
    <section v-else class="no-result">该用户暂时没有关注作者</section>
  </div>
</template>

<style lang="scss" scoped>
.follow-author {
  height: 100%;
  background-color: var(--color-background);
  .list {
    height: 100%;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(3, 1fr);
    overflow-y: scroll;

    .item {
      width: calc(100% - 180px);
    }
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
