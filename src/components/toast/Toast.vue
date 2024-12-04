<script setup>
import { ref, onMounted } from "vue";
import IconInfo from "../icons/IconInfo.vue";
import IconWarning from "../icons/IconWarning.vue";
import IconSuccess from "../icons/IconSuccess.vue";
import IconError from "../icons/IconError.vue";

const props = defineProps({
  type: {
    type: String,
    default: "info",
    validator(value) {
      return ["info", "danger", "success", "warning"].includes(value);
    },
  },
  top: {
    type: Number,
    default: 100,
  },
  message: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default: 3000,
  },
  onDestroy: Function,
  onClose: Function,
});
const visiable = ref(false);

function close() {
  visiable.value = false;
}

onMounted(() => {
  visiable.value = true;
  setTimeout(close, props.duration);
});
</script>

<template>
  <Transition
    @before-leave="onClose"
    @after-leave="onDestroy"
    name="toast-fade"
  >
    <div
      v-show="visiable"
      class="toast"
      :class="type"
      :style="{ top: `${top}px` }"
    >
      <IconInfo width="18" v-if="type === 'info'" />
      <IconWarning width="18" v-else-if="type === 'warning'" />
      <IconSuccess width="18" v-else-if="type === 'success'" />
      <IconError width="18" v-else-if="type === 'danger'" />
      <span class="text">{{ message }}</span>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.toast {
  position: fixed;
  left: 50%;
  z-index: 99;
  transform: translateX(-50%);
  font-size: 20px;
  padding: 8px 20px;
  border-radius: 8px;
  transition: all 0.3s;
  display: flex;
  align-items: center;

  > .text {
    margin-left: 10px;
  }

  // $name $color $bg-color $boder-color
  $toast-color:
    "info" #909399 #f4f4f5 #f4f4f5,
    "danger" #f56e6e #fef0f0 #fde2e2,
    "success" #67c23a #f0f9eb #e1f3d8,
    "warning" #e6a23c #fdf6ec #fbf0e1;

  @each $name, $color, $bg-color, $border-color in $toast-color {
    &.#{$name} {
      color: $color;
      background: $bg-color;
      border: $border-color 1px solid;
      > .svg-icon {
        fill: $color;
      }
    }
  }
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  transform: translateX(-50%) translateY(-20px);
  opacity: 0;
}
</style>
