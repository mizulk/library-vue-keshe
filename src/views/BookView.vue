<script setup>
import ReturnPrev from "@/components/ReturnPrev.vue";
import IconLikeOff from "@/components/icons/IconLikeOff.vue";
import IconLikeOn from "@/components/icons/IconLikeOn.vue";
import IconShare from "@/components/icons/IconShare.vue";
import IconStarOff from "@/components/icons/IconStarOff.vue";
import IconStarOn from "@/components/icons/IconStarOn.vue";
import CommentView from "@/components/CommentView.vue";
import WriteComment from "@/components/WriteComment.vue";
import ILink from "@/components/input/ILink.vue";
import IButton from "@/components/input/IButton.vue";
import INumberInput from "@/components/input/INumberInput.vue";

import dayjs from "dayjs";
import toast, { Toast } from "@/components/toast";
import useClipboard from "vue-clipboard3";

import { ref } from "vue";
import { getBookById } from "@/api/book";
import { addComment, getCommentsByBookId } from "@/api/comment";
import { useUserStore } from "@/stores/user";
import { useCartStore } from "@/stores/cart";
import {
  addCollection,
  deleteCollections,
  getCollectionByUserIdAndBookId,
} from "@/api/collection";
import { updateBook } from "@/api/book";
import { addLike, deleteLike, getLikeByUserIdAndBookId } from "@/api/like";
import { addCartItem } from "@/api/cart";
import { Dialog } from "@/components/dailog";

/**
 * @template T
 * @typedef {import("vue").Ref<T>} Ref<T>
 */

const props = defineProps(["id"]);

const { toClipboard } = useClipboard();

const userStore = useUserStore();
const cartStore = useCartStore();

/**@type {Ref<import("@/api/book/types").Book>} */
const bookInfo = ref({ img: "" });
/**@type {Ref<import("@/api/comment/types").Comment>} */
const comments = ref([]);
/**@type {Ref<import("@/api/collection/types").Collection>} */
const collection = ref({});
/**@type {Ref<import("@/api/like/types").Like>} */
const like = ref({});
const isCollected = ref(false);
const isLiked = ref(false);
const count = ref(1);

async function onShareBtnClick() {
  try {
    await toClipboard(bookInfo.value.name);
    Toast.success("复制分享连接成功，快去分享吧！");
    bookInfo.value.share++;
    _updateBook();
  } catch (e) {
    Toast.warning("复制分享连接失败，请重试");
  }
}

function onCollectBtnClick() {
  if (!userStore.isUserLogin) {
    Toast.info("请登录");
    return;
  }
  if (isCollected.value) {
    Dialog.confirm("你已经收藏过了哦, 是否要取消收藏？")
      .then(() => {
        deleteCollections([collection.value.id])
          .then((_result) => {
            Toast.success("已取消收藏");
            isCollected.value = false;
          })
          .catch((_e) => {
            Toast.danger("取消收藏失败");
          });
      })
      .catch(() => {
        Toast.info("已取消");
      });
    return;
  }
  addCollection(userStore.getLoginUser.id, bookInfo.value.id)
    .then((result) => {
      if (result.data.code == 200) {
        Toast.success("收藏成功");
        isCollected.value = true;
        bookInfo.value.collect++;
        _updateBook();
      } else {
        Toast.danger("收藏失败");
      }
    })
    .catch(error);
}

function onLikeBtnClick() {
  if (!userStore.isUserLogin) {
    Toast.info("请登录");
    return;
  }
  if (isLiked.value) {
    Dialog.confirm("你已经点赞过了哦, 是否要撤销点赞？")
      .then(() => {
        deleteLike(like.value.id)
          .then(() => {
            Toast.success("已撤销点赞");
            isLiked.value = false;
          })
          .catch(() => {
            Toast.danger("撤销点赞失败");
          });
      })
      .catch(() => {
        Toast.info("已取消");
      });
    return;
  }
  addLike(userStore.getLoginUser.id, bookInfo.value.id)
    .then((result) => {
      if (result.data.code == 200) {
        Toast.success("点赞成功");
        isLiked.value = true;
        bookInfo.value.likes++;
        _updateBook();
      } else {
        Toast.danger("点赞失败");
      }
    })
    .catch(error);
}

function onPublishClick(content) {
  let comment = {
    bookId: bookInfo.value.id,
    user: userStore.getLoginUser,
    content,
    createTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    like: 0,
  };
  addComment(comment)
    .then((result) => {
      if (result.data.code == 200) {
        toast({ message: "评论成功", type: "success" });
        comments.value.push(comment);
        bookInfo.value.comments++;
        _updateBook();
      } else toast({ message: "评论失败", type: "danger" });
    })
    .catch(error);
}

getBookById(props.id)
  .then((result) => {
    bookInfo.value = result.data.data;
    bookInfo.value.views++;
    _updateBook();

    if (userStore.isUserLogin) {
      getCollectionByUserIdAndBookId(
        userStore.getLoginUser.id,
        bookInfo.value.id,
      )
        .then((result) => {
          if (result.data.data.length != 0) {
            collection.value = result.data.data[0];
            isCollected.value = true;
          }
        })
        .catch(error);
      getLikeByUserIdAndBookId(userStore.getLoginUser.id, bookInfo.value.id)
        .then((result) => {
          if (result.data.data.length != 0) {
            like.value = result.data.data[0];
            isLiked.value = true;
          }
        })
        .catch(error);
    }
  })
  .catch(error);

updateComment();

function error(e, msg = "请求发生错误：") {
  if (e.response.status != 401) Toast.danger(msg + e);
}

function updateComment() {
  getCommentsByBookId(props.id)
    .then((result) => {
      comments.value = result.data.data;
    })
    .catch(error);
}

function _updateBook() {
  let { id, likes, collect, share, comments, views } = bookInfo.value;
  updateBook({ id, likes, collect, share, comments, views }).catch(error);
}

function addToCart() {
  if (!userStore.isUserLogin) {
    Toast.info("请登录！");
    return;
  }
  addCartItem({
    userId: userStore.getLoginUser.id,
    book: { id: props.id },
    count: count.value,
  })
    .then((_result) => {
      Toast.success("添加成功！");
      cartStore.updateData();
    })
    .catch((e) => {
      error(e, "添加失败");
    });
}
</script>

<template>
  <div class="book-view">
    <ReturnPrev />
    <div class="book-view-main">
      <div class="left">
        <img :src="bookInfo.img" alt="" />
      </div>
      <div class="right">
        <h1 class="title">{{ bookInfo.name }}</h1>
        <div class="author">
          <ILink
            :to="bookInfo.author.id ? `/author/${bookInfo.author.id}` : '/404'"
          >
            {{ bookInfo.author.name }}
          </ILink>
        </div>
        <div class="content">{{ bookInfo.brief }}</div>
        <div class="btn-panel">
          <IButton
            type="default"
            class="btn"
            @click="onShareBtnClick(bookInfo)"
          >
            <IconShare width="64" />
            <span class="value">{{ bookInfo.share }}</span>
          </IButton>
          <IButton type="default" class="btn" @click="onCollectBtnClick">
            <IconStarOn v-if="isCollected" width="50" />
            <IconStarOff v-else width="50" />
            <span class="value">{{ bookInfo.collect }}</span>
          </IButton>
          <IButton type="default" class="btn" @click="onLikeBtnClick">
            <IconLikeOn v-if="isLiked" width="50" />
            <IconLikeOff v-else width="50" />
            <span class="value">{{ bookInfo.likes }}</span>
          </IButton>
          <span class="book-price">单价：￥ {{ bookInfo.price }}</span>
          <INumberInput size="large" v-model="count" :min="1" />
          <IButton class="btn add-to-cart" @click="addToCart"
            >加入购物车</IButton
          >
        </div>
      </div>
    </div>
    <div class="book-view-footer">
      <div class="comment-title">评论({{ bookInfo.comments }})</div>
      <WriteComment @publish-click="onPublishClick" />
      <CommentView
        v-for="item in comments"
        :key="item.id"
        :comment="item"
      ></CommentView>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.book-view {
  width: 100%;
  background-color: var(--color-background);

  &-main {
    width: 100%;
    padding: 0 0 20px 0;
    display: flex;

    > .left > img {
      width: 336px;
    }

    .right {
      flex: 1 0;
      margin: 0 100px 0 40px;
      display: flex;
      flex-direction: column;

      > .title {
        font-size: 30px;
        margin: 30px 0 10px 0;
      }

      > .author {
        font-size: 20px;
      }

      > .content {
        text-indent: 2em;
        margin: 20px 0 10px 0;
        flex: 1;
        font-size: 17px;
        line-height: 1.5em;
      }

      > .btn-panel {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        row-gap: 20px;
        justify-items: center;
        align-items: center;

        .btn {
          padding: 10px 20px;
          border-radius: 20px;
          height: 70px;
          width: 140px;

          &.add-to-cart {
            height: 48px;
          }
        }

        .book-price {
          color: var(--c-red);
          font-size: 24px;
        }

        .value {
          font-size: 22px;
          margin-left: 14px;
        }
      }
    }
  }

  &-footer {
    padding: 40px 80px;

    .comment-title {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 26px;
    }
  }
}
</style>
