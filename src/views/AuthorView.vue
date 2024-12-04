<script setup>
import ReturnPrev from "@/components/ReturnPrev.vue";
import SubTitle from "@/components/SubTitle.vue";
import Avatar from "@/components/Avatar.vue";
import Book from "@/components/Book.vue";
import toast, { Toast } from "@/components/toast";

import { onMounted, ref } from "vue";
import { getBooksByAuthor } from "@/api/book";
import { getAuthorById } from "@/api/author";
const props = defineProps({
  id: Number,
});

const author = ref();
const books = ref([]);

getAuthorById(props.id)
  .then((result) => {
    author.value = result.data.data;
  })
  .catch((err) => {
    Toast.danger(err.toString());
  });

onMounted(() => {
  getBooksByAuthor(author.value.name)
    .then((result) => {
      books.value = result.data.data;
    })
    .catch((err) => {
      Toast.danger(err.toString());
    });
});
</script>

<template>
  <div class="author-view">
    <ReturnPrev />
    <section class="author-info">
      <div class="left">
        <Avatar size="100px" :img="author.img" />
      </div>
      <div class="right">
        <h2 class="author-name">{{ author.name }}</h2>
        <p class="author-brief">{{ author.brief }}</p>
      </div>
    </section>
    <SubTitle title="相关书籍"></SubTitle>
    <section class="author-relative-book">
      <Book v-for="item in books" :key="item.id" :data="item"></Book>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.author {
  $author-info-height: 208px;
  &-info {
    display: flex;
    height: $author-info-height;
    margin-bottom: 16px;
    background: var(--color-background);

    > .left {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 200px;
    }

    > .right {
      padding: 12px 0 0 64px;
      flex: 1;
      .author-name {
        font-size: 28px;
        margin-bottom: 14px;
      }

      .author-brief {
        text-indent: 2em;
        font-size: 18px;
      }
    }
  }

  &-relative-book {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, 1fr);
    column-gap: 10px;
    row-gap: 10px;
  }
}
</style>
