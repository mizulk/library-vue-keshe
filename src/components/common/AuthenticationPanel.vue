<script setup>
defineProps({
  height: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="authentication-panel">
    <div class="authentication-panel-background" :style="{ height }">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
.authentication-panel {
  position: relative;
  height: calc(100vh - 96px);
  min-height: 500px;
  background-color: var(--color-background);
  &::after,
  &::before {
    content: "";
    display: table;
  }
  &-background {
    background: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%) no-repeat;
    margin: 180px 0;
  }
}
</style>
