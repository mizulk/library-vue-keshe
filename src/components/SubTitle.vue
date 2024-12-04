<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="sub-title">
    <div class="left">
      <div class="color-bar"></div>
      <div class="title">{{ title }}</div>
    </div>
    <div class="right">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
.sub-title {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  justify-content: space-between;

  > .left {
    display: flex;
    .color-bar {
      border-left: 5px skyblue solid;
      margin-right: 5px;
      border-radius: 10px;
    }

    .title {
      font-size: 28px;
    }
  }
}
</style>
