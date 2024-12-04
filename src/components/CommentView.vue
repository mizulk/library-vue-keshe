<script setup>
import Avatar from "@/components/Avatar.vue";
import IconLikeOff from "./icons/IconLikeOff.vue";
import toast from "./toast";
import { ref, computed } from "vue";
import { updateComment } from "@/api/comment";

const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
});

const formatDateTime = computed(() => {
  return (dateTime) => {
    if (typeof dateTime == "object")
      return `${dateTime[0]}年${dateTime[1]}月${dateTime[2]}日 ${dateTime[3]}:${dateTime[4]}:${dateTime[5]}`;
    else return dateTime;
  };
});

const like = ref(props.comment.like);

function onCommentLikeClick() {
  like.value++;
  updateComment({ id: props.comment.id, like: like.value }).catch((e) => {
    toast({ message: e, type: "danger" });
  });
}
</script>

<template>
  <div class="comment">
    <RouterLink
      :to="`/user/${comment.user.id}/collection`"
      class="comment-header"
    >
      <Avatar :img="comment.user.img || ''" />
      <span class="user-name">{{ comment.user.name }}</span>
    </RouterLink>
    <div class="comment-main">{{ comment.content }}</div>
    <div class="comment-footer">
      <div class="comment-footer-item btn" @click="onCommentLikeClick">
        <IconLikeOff width="24" class="like" />
        <span class="value">{{ like }}</span>
      </div>
      <div class="comment-footer-item">
        {{ formatDateTime(comment.createTime) }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comment {
  padding: 24px 0;

  &-header {
    display: flex;
    align-items: center;
    &:hover {
      color: var(--c-bright-blue);
    }

    > .avatar-wrapper {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;

      > .avatar {
        width: 100%;
        height: 100%;
      }
    }

    .user-name {
      font-size: 22px;
      margin: 0 24px;
    }
  }

  &-main {
    margin-left: 74px;
    padding: 10px 0;
    font-size: 16px;
    line-height: 1.5em;
  }

  &-footer {
    border-bottom: 1px gray solid;
    margin-left: 74px;
    display: flex;
    align-items: center;

    &-item {
      margin-right: 50px;
      font-size: 14px;
    }

    .btn {
      display: flex;
      align-items: center;
      user-select: none;
      cursor: pointer;
      padding-bottom: 10px;

      .value {
        margin-left: 10px;
      }

      &:hover {
        color: var(--c-bright-blue);
        > .like {
          fill: var(--c-bright-blue);
        }
      }
    }
  }
}
</style>
