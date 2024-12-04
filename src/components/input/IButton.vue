<script setup>
defineEmits(["click"]);

defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "primary",
    validator(value, _props) {
      return ["success", "warning", "danger", "primary", "default"].includes(
        value,
      );
    },
  },
  round: {
    type: Boolean,
    default: false,
  },
  tag: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    :class="['i-button', type, { round, tag }]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss">
@use "sass:color";
@use "@/assets/style/color.scss" as *;

.i-button {
  box-sizing: border-box;
  font-size: 18px;
  padding: 2px 10px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vt-c-white);
  transition: all 0.1s;

  &.round {
    border-radius: 20px;
  }

  @each $name, $color in $type-color {
    &.#{$name} {
      border: 1px $color solid;
      background-color: $color;
      &:not(:disabled):hover {
        border: 1px color.adjust($color, $lightness: 20%) solid;
        background-color: color.adjust($color, $lightness: 20%);
      }
      &:not(:disabled):active {
        border: 1px color.adjust($color, $lightness: -10%) solid;
        background-color: color.adjust($color, $lightness: -10%);
      }
      &:disabled {
        border: 1px color.adjust($color, $lightness: 40%) solid;
        background-color: color.adjust($color, $lightness: 40%);
      }
    }
  }

  &.default {
    background-color: var(--vt-c-white);
    border: 1px #dcdfe6 solid;
    color: #606266;
    &:not(:disabled):hover {
      color: #409eff;
      background-color: #ecf5ff;
      border: 1px #c6e2ff solid;
    }
    &:not(:disabled):active {
      color: #409eff;
      border: 1px #409eff solid;
      background-color: #ecf5ff;
    }
    &:disabled {
      color: #a8abb2;
      border: 1px #e4e7ed solid;
    }
  }

  &:disabled {
    cursor: not-allowed;
  }
}
</style>
