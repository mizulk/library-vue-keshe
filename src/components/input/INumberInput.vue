<script setup>
import { computed } from "vue";

const props = defineProps({
  size: {
    type: String,
    default: "medium",
    validator(value, _props) {
      return ["small", "medium", "large"].includes(value);
    },
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  step: {
    type: Number,
    default: 1,
  },
  min: {
    type: Number,
    validator(value, props) {
      if (props.max) return value < props.max;
      else return true;
    },
  },
  max: {
    type: Number,
    validator(value, props) {
      if (props.min) return value > props.min;
      else return true;
    },
  },
});

const [model, modifiers] = defineModel({
  type: Number,
  set(value) {
    if (value == "") return 0;
    if (modifiers.positive && value < 0) return 0;
    if (modifiers.negative && value > 0) return 0;
    return value;
  },
});

const emit = defineEmits(["change"]);

const isModelMax = computed(() => {
  if (!props.max) return false;
  return model.value == props.max;
});

const isModelMin = computed(() => {
  if (!props.min) return false;
  return model.value == props.min;
});

function onBlur() {
  if (props.min && model.value < props.min) model.value = props.min;
  if (props.max && model.value > props.max) model.value = props.max;

  emit("change", model.value);
}

function inc() {
  if (props.max) model.value += model.value >= props.max ? 0 : props.step;
  else model.value += props.step;
  emit("change", model.value);
}

function dec() {
  if (props.min) model.value -= model.value <= props.min ? 0 : props.step;
  else model.value -= props.step;
  emit("change", model.value);
}
</script>

<template>
  <div class="i-number-input" :class="size">
    <button class="btn dec" :disabled="isModelMin || disabled" @click="dec">
      -
    </button>
    <input
      class="number-input"
      :max="max"
      :min="min"
      :disabled="disabled"
      @blur="onBlur"
      type="number"
      v-model="model"
    />
    <button class="btn inc" :disabled="isModelMax || disabled" @click="inc">
      +
    </button>
  </div>
</template>

<style lang="scss">
.i-number-input {
  display: flex;

  // $name, $width , $height
  $sizes:
    "small" 28px 22px,
    "medium" 34px 28px,
    "large" 40px 34px;

  @each $name, $width, $height in $sizes {
    &.#{$name} {
      .btn,
      .number-input {
        width: $width;
        height: $height;
      }
    }
  }

  .btn,
  .number-input {
    box-sizing: border-box;
    border: 1px #dcdfe6 solid;

    &:disabled {
      cursor: not-allowed;
    }
  }

  .btn {
    box-sizing: border-box;
    font-size: 18px;
    cursor: pointer;

    $btn-border-radius: 6px;
    &.inc {
      border-left: none;
      border-radius: 0 $btn-border-radius $btn-border-radius 0;
    }

    &.dec {
      border-right: none;
      border-radius: $btn-border-radius 0 0 $btn-border-radius;
    }
  }

  .number-input {
    text-align: center;
    outline: none;
  }
}
</style>
