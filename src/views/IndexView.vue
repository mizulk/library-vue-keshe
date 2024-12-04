<script setup>
import SubTitle from "@/components/SubTitle.vue";
import Category from "@/components/index/Category.vue";
import Carousel from "@/components/index/Carousel.vue";
import User from "@/components/index/User.vue";
import AuthorList from "@/components/index/AuthorList.vue";
import BookList from "@/components/index/BookList.vue";

import carousel_1 from "@/assets/carousel/carousel-5.png";
import carousel_2 from "@/assets/carousel/carousel-2.png";
import carousel_3 from "@/assets/carousel/carousel-6.png";
import carousel_4 from "@/assets/carousel/carousel-4.png";

const carouselImgs = [carousel_1, carousel_2, carousel_3, carousel_4];
</script>

<template>
  <main class="index-view">
    <section class="header-wrapper">
      <Category></Category>
      <Carousel :imgs="carouselImgs"></Carousel>
      <User></User>
    </section>
    <section class="author-list-wrapper">
      <SubTitle title="作者列表" />
      <AuthorList></AuthorList>
    </section>
    <section class="content">
      <SubTitle title="推荐图书" />
      <BookList></BookList>
    </section>
  </main>
</template>

<style lang="scss">
.index-view {
  > .header-wrapper {
    display: flex;
    justify-content: space-between;
  }
  > .author-list-wrapper {
    margin: 10px 0;
  }
  .content {
    width: 100%;
  }
}
</style>
