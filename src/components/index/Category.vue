<script setup>
import { ref } from "vue";
const curShow = ref(-1);
const types = ["文学类", "历史类", "艺术类", "外语类"];
</script>

<template>
  <ul class="category" @mouseleave="curShow = -1">
    <li
      v-for="(item, index) in types"
      :key="index"
      class="category-item"
      @mouseenter="curShow = i"
    >
      <RouterLink
        class="link"
        :to="{ path: '/category', query: { type: item } }"
      >
        {{ item }}
      </RouterLink>
      <Transition name="fade">
        <div class="panel" v-show="curShow == index">{{ item }}</div>
      </Transition>
    </li>
    <li class="category-item">
      <RouterLink class="link" to="/category">查看更多</RouterLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@import url("@/assets/style/animation.scss");

$category-width: 208px;
$category-height: 352px;

.category {
  width: $category-width;
  height: $category-height;
  position: relative;
  background: #fff;

  &-item {
    font-size: 24px;
    height: calc($category-height / 5);
    line-height: calc($category-height / 5);
    padding: 0 20px;
    box-sizing: content-box;
    transition: background 0.3s;
    cursor: pointer;

    &:hover {
      background-color: #d8d8d8;
    }

    $category-panel-width: 400px;
    .panel {
      width: $category-panel-width;
      height: $category-height;
      background-color: #fff;
      position: absolute;
      right: -$category-panel-width - 12px;
      top: 0;
      z-index: 1;
    }

    > .link {
      display: block;
      width: 100%;
    }
  }
}
</style>
