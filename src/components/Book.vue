<script setup>
import IconWatched from "./icons/IconWatched.vue";
import ILink from "./input/ILink.vue";

defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="book">
    <RouterLink :to="`/book/${data.id}`">
      <div class="img-wrapper">
        <img :src="data.img" :alt="data.name" />
      </div>
      <div class="book-info">
        <ILink class="name">{{ data.name }}</ILink>
        <ILink
          class="author"
          :to="data.author.id ? `/author/${data.author.id}` : '/404'"
        >
          {{ data.author.name }}
        </ILink>
        <span class="view">
          <IconWatched width="24" />
          <span class="value">{{ data.views }}</span>
        </span>
        <span class="price">￥ {{ data.price }}</span>
      </div>
    </RouterLink>
  </div>
</template>

<style lang="scss">
$book-width: 176px;
.book {
  width: $book-width;
  padding: 25px 22px;
  background-color: var(--color-background);
  transition: all 0.3s;
  cursor: pointer;

  .img-wrapper {
    width: $book-width;
    height: $book-width;
    > img {
      width: 100%;
      height: 100%;
    }
  }

  .book-info {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
    row-gap: 4px;

    .name {
      font-size: 16px;
      font-weight: bold;
    }
    .author {
      font-size: 14px;
    }

    .view {
      display: flex;
      align-items: center;
      grid-row-start: 1;
      grid-column-start: 2;

      .value {
        margin-left: 2px;
      }
    }

    .price {
      color: var(--c-red);
    }

    .link {
      transition: color 0.3s;
      &:hover {
        color: var(--c-bright-blue);
      }
    }
  }

  &:hover {
    z-index: 2;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    transform: translate3d(0, -2px, 0);
  }
}
</style>
