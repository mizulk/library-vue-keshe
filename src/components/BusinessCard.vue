<script setup>
import Avatar from "@/components/Avatar.vue";
import IButton from "@/components/input/IButton.vue";

defineEmits(["followClick"]);

defineProps({
  img: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  brief: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  btnPosition: {
    type: String,
    default: "bottom",
  },
  isFollow: {
    type: Boolean,
    default: false,
  },
  id: {
    type: Number,
    required: true,
  },
  hideFollowBtn: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="business-card">
    <div class="left">
      <RouterLink :to="to">
        <Avatar :img="img" size="100px" />
      </RouterLink>
    </div>
    <div class="right">
      <RouterLink :to="to">
        <h2 class="name">{{ name }}</h2>
      </RouterLink>
      <p class="brief">
        {{ brief }}
      </p>
      <IButton
        v-if="!hideFollowBtn"
        class="follow-btn"
        @click="$emit('followClick', id, isFollow)"
      >
        {{ isFollow ? "已关注" : "关注" }}
      </IButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.business-card {
  width: 440px;
  height: 220px;
  padding: 25px 0 25px 54px;
  display: flex;
  align-items: center;

  > .right {
    margin-left: 20px;

    .name {
      transition: color 0.2s;
      &:hover {
        color: var(--c-bright-blue);
      }
    }

    .brief {
      text-indent: 2em;
      margin: 10px 0;
      overflow: hidden;
      height: 42px;
    }

    .follow-btn {
      padding: 4px 20px;
    }
  }
}
</style>
