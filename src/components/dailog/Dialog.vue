<script setup>
import IButton from "../input/IButton.vue";

const visiable = defineModel({ type: Boolean, default: true });

const props = defineProps({
  title: {
    type: String,
    default: "消息",
  },
  message: {
    type: String,
    required: true,
  },
  closeOnClickModal: {
    type: Boolean,
    default: true,
  },
  option: {
    type: String,
    default: "cancel-confirm",
    validator(value) {
      return ["confirm", "cancel-confirm"].includes(value);
    },
  },
  onConfirm: {
    type: Function,
    default: () => {},
  },
  onCancel: {
    type: Function,
    default: () => {},
  },
  onClose: {
    type: Function,
    default: () => {},
  },
  onDestroy: Function,
});

function onConfirmClick() {
  closeDialog();
  props.onConfirm();
}

function onCancelClick() {
  closeDialog();
  props.onCancel();
}

function closeDialog() {
  visiable.value = false;
}

function onModalClick() {
  if (props.closeOnClickModal) {
    closeDialog();
    props.onCancel();
  }
}
</script>

<template>
  <Transition
    @before-leave="onClose"
    @after-leave="onDestroy"
    name="dialog-fade"
  >
    <div v-show="visiable" class="dialog-wrapper" @click="onModalClick">
      <div class="dialog">
        <section class="dialog-header">
          <h1>{{ title }}</h1>
        </section>
        <section class="dialog-message">
          <slot>
            <p>{{ message }}</p>
          </slot>
        </section>
        <section class="dialog-footer">
          <slot name="footer">
            <IButton
              v-if="option.includes('confirm')"
              class="btn"
              @click="onConfirmClick"
              >确认</IButton
            >
            <IButton
              v-if="option.includes('cancel')"
              class="btn"
              @click="onCancelClick"
              type="default"
            >
              取消
            </IButton>
          </slot>
        </section>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.dialog {
  width: 480px;
  background-color: var(--color-background);
  border-radius: 10px;
  padding: 20px;
  transition: all 0.3s;

  &-wrapper {
    position: fixed;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 98;
    top: 0;
    right: 0;
  }

  &-header {
    font-size: 20px;
  }

  &-message {
    margin: 16px 0;
  }

  &-footer {
    display: flex;
    flex-direction: row-reverse;

    .btn {
      margin: 0 10px;
      padding: 5px 10px;
    }
  }
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  transform: translateX(-50%) translateY(-20px);
  opacity: 0;
}
</style>
