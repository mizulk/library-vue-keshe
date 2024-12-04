<script setup>
const [content, modelModifiers] = defineModel({
  set(value) {
    return modelModifiers.trim ? value.trim() : value;
  },
});
defineProps({
  placeholder: String,
  type: {
    type: String,
    default: "text",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <input
    class="i-input"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    v-model="content"
  />
</template>

<style lang="scss">
.i-input {
  font-size: 17px;
  background-color: #f0f1f2;
  border: 1px #f0f1f2 solid;
  padding: 10px;
  outline: none;
  border-radius: 10px;

  &:disabled {
    cursor: not-allowed;
  }
}
</style>
