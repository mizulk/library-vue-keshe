<script setup>
import IconEmpty from "./icons/IconEmpty.vue";

defineProps({
  describe: {
    type: String,
    default: "没有物品喔",
  },
});
</script>

<template>
  <div class="empty">
    <slot>
      <IconEmpty width="128" />
    </slot>
    <span style="padding: 20px 60px">{{ describe }}</span>
  </div>
</template>

<style lang="scss">
.empty {
  background-color: var(--color-background);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
