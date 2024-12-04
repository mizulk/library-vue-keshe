<script setup>
import NavigationBar from "./components/NavigationBar.vue";
import FixedButtonGroup from "./components/fixed/FixedButtonGroup.vue";
</script>

<template>
  <NavigationBar></NavigationBar>
  <div class="router-wrapper">
    <RouterView></RouterView>
  </div>
  <FixedButtonGroup />
</template>

<style lang="scss">
.router-wrapper {
  width: var(--content-width);
  min-width: var(--content-width);
  margin: 0 auto;
}
</style>
