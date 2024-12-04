<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  text: {
    type: String,
  },
  size: {
    type: String,
    default: "medium",
    validator(value, _props) {
      return ["small", "medium", "large"].includes(value);
    },
  },
  indeterminate: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["change"]);

const content = defineModel({ type: Boolean, default: false });

const checkBox = ref(null);

watch([() => props.indeterminate, () => content.value], (value, _oldValue) => {
  checkBox.value.indeterminate = value[0] && !value[1];
});

function onChange() {
  if (!content.value) checkBox.value.indeterminate = false;
  emit("change", content.value);
}
</script>

<template>
  <div class="i-checkbox" :class="[size, { flex: text != undefined }]">
    <input
      type="checkbox"
      id="checkbox"
      ref="checkBox"
      v-model="content"
      @change="onChange"
    />
    <label class="checkbox-lable" for="checkbox">
      <slot>{{ text }}</slot>
    </label>
  </div>
</template>

<style lang="scss">
.i-checkbox {
  .checkbox-lable {
    margin-left: 10px;
    user-select: none;
    font-size: larger;
  }

  // $name, $size
  $sizes:
    "small" 12px,
    "medium" 16px,
    "large" 20px;
  @each $name, $size in $sizes {
    &.#{$name} {
      #checkbox {
        width: $size;
        height: $size;
      }

      .checkbox-lable {
        font-size: $size;
      }
    }
  }

  &.flex {
    display: flex;
    align-items: center;
  }
}
</style>
