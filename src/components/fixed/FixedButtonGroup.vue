<script setup>
import CartButton from "./CartButton.vue";
import ReturnTopButton from "./ReturnTopButton.vue";
import { computed } from "vue";

const childItemCount = 2;

const getHeight = computed(() => {
  return childItemCount * 80 + (childItemCount - 1) * 20 + "px";
});
</script>

<template>
  <div class="fixed-btn-group" :style="{ height: getHeight }">
    <CartButton class="fixed-btn-item" />
    <ReturnTopButton class="fixed-btn-item" />
  </div>
</template>

<style lang="scss">
.fixed-btn-group {
  position: fixed;
  right: 144px;
  bottom: 100px;
  width: 80px;
  height: calc(80px + 20px + 80px);

  .fixed-btn-item:not(:last-child) {
    margin-bottom: 20px;
  }
}
</style>
