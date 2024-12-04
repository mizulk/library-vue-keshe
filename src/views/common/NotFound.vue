<script setup>
import IButton from "@/components/input/IButton.vue";
</script>

<template>
  <div class="not-fonud">
    404NotFound
    <IButton class="return-btn" @click="$router.go(-1)">返回上一层</IButton>
  </div>
</template>

<style lang="scss" scoped>
.not-fonud {
  height: calc(100vh - 96px);
  min-height: 500px;
  font-size: 64px;
  background-color: var(--color-background);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .return-btn {
    margin-top: 30px;
    padding: 10px 20px;
  }
}
</style>
