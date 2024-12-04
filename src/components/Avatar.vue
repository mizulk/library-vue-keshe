<script setup>
defineProps({
  img: {
    required: true,
  },
  size: {
    type: String,
    default: "50px",
  },
});
</script>

<template>
  <div class="avatar-wrapper" :style="{ width: size, height: size }">
    <img :src="img" alt="" class="avatar" />
  </div>
</template>

<style lang="scss" scoped>
.avatar-wrapper {
  border-radius: 50%;
  overflow: hidden;

  > .avatar {
    width: 100%;
    height: 100%;
  }
}
</style>
