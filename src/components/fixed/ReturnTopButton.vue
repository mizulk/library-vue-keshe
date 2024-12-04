<script setup>
import IconReturnTop from "../icons/IconReturnTop.vue";
function scrollTop() {
  document.documentElement.scrollTop = 0;
}
</script>

<template>
  <IconReturnTop class="return-top" @click="scrollTop"></IconReturnTop>
</template>

<style lang="scss">
@use "@/assets/style/mixin.scss" as *;

$return-top-size: 48px;
.return-top {
  @include fixed-button($return-top-size);
}
</style>
