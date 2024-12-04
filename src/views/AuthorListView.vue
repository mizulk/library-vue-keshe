<script setup>
import BusinessCard from "@/components/BusinessCard.vue";
import ReturnPrev from "@/components/ReturnPrev.vue";
import toast, { Toast } from "@/components/toast";

import { getAuthor } from "@/api/author";
import { ref, onMounted } from "vue";
import { addFollow, delFollow, getFollowByUserId } from "@/api/follow";
import { useUserStore } from "@/stores/user";

/**@typedef {import('@/api/author/types').Author} Author */
/**
 * @template T
 * @typedef {import('vue').Ref<T>} Ref<T>
 */

const userStore = useUserStore();

/**@type {Ref<Author[]>} */
const authors = ref([]);

const follow = ref([]);

onMounted(() => {
  if (userStore.isUserLogin) {
    getFollowByUserId(userStore.getLoginUser.id)
      .then((result) => {
        if (result.data.code == 200)
          result.data.data.forEach((element) => {
            follow.value.push(element.author.id);
          });
      })
      .catch((err) => {
        toast({ message: err, type: "danger" });
      });
  }
  getAuthor()
    .then((result) => {
      authors.value = result.data.data;
    })
    .catch((err) => {
      toast({ message: err, type: "danger" });
    });
});

function onFollowClick(id, isFollow) {
  if (!userStore.isUserLogin) {
    Toast.info("登录了后才能关注喔");
    return;
  }
  if (isFollow) {
    delFollow(userStore.getLoginUser.id, id)
      .then((result) => {
        if (result.data.code == 200) Toast.success("取消关注成功");
      })
      .catch((e) => {
        Toast.danger("取消关注失败");
      });
  } else {
    addFollow({ userId: userStore.getLoginUser.id, authorId: id })
      .then((result) => {
        if (result.data.code == 200) {
          Toast.success("关注成功");
          follow.value.push(id);
        }
      })
      .catch((err) => {
        Toast.danger(err.toString());
      });
  }
}
</script>

<template>
  <div class="author-list-view">
    <ReturnPrev />
    <section class="author-list">
      <BusinessCard
        v-for="item in authors"
        :key="item.id"
        :img="item.img"
        :name="item.name"
        :brief="item.brief"
        :to="`/author/${item.id}`"
        :id="item.id"
        :is-follow="follow.includes(item.id)"
        @follow-click="onFollowClick"
      ></BusinessCard>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.author-list {
  background-color: var(--color-background);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
}
</style>
