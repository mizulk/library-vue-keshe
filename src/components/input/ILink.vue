<script setup>
defineProps({
  to: {
    type: String,
  },
  type: {
    type: String,
    default: "default",
    validator(value, _props) {
      return ["success", "warning", "danger", "primary", "default"].includes(
        value,
      );
    },
  },
});

defineEmits(["click"]);
</script>

<template>
  <RouterLink v-if="to" class="i-link" :class="type" :to="to">
    <slot></slot>
  </RouterLink>
  <span v-else class="i-link" :class="type" @click="$emit('click')">
    <slot></slot>
  </span>
</template>

<style lang="scss">
@use "sass:color";
@use "@/assets/style/color.scss" as *;

.i-link {
  transition: color 0.3s;
  cursor: pointer;

  &.default:hover {
    color: var(--c-bright-blue);
  }

  @each $name, $color in $type-color {
    &.#{$name} {
      color: $color;
      &:hover {
        color: color.adjust($color, $lightness: 20%);
      }
    }
  }
}
</style>
