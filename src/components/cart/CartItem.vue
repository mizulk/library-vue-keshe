<script setup>
import ICheckBox from "../input/ICheckBox.vue";
import INumberInput from "../input/INumberInput.vue";
import ILink from "../input/ILink.vue";
import IButton from "../input/IButton.vue";

import { computed } from "vue";
import { deleteCartItemById } from "@/api/cart";
import { Toast } from "../toast";
import { useCartStore } from "@/stores/cart";
import { useUserStore } from "@/stores/user";
import { addCollection } from "@/api/collection";
import { useCollectionStore } from "@/stores/collection";

const cartStore = useCartStore();
const userStore = useUserStore();
const collectionStore = useCollectionStore();

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const num = defineModel("num", { type: Number, required: true });
const checked = defineModel("isCheck", { type: Number, required: true });

defineEmits(["change"]);

const isCollection = computed(() => {
  return (
    collectionStore.items.find((item) => item.book.id == props.data.book.id) !=
    undefined
  );
});

function onCollectionClick() {
  addCollection(userStore.getLoginUser.id, props.data.book.id)
    .then((_result) => {
      Toast.success("添加成功");
    })
    .catch((_e) => {
      Toast.danger("添加失败");
    });
  collectionStore.updateData();
}

function onDeleteClick() {
  deleteCartItemById(props.data.id)
    .then((_result) => {
      Toast.success("删除成功！");
      cartStore.deleteCart(props.data.id);
    })
    .catch((_e) => {
      Toast.danger("删除失败！");
    });
}
</script>

<template>
  <div class="cart-item">
    <ICheckBox
      size="large"
      v-model="checked"
      @change="$emit('change', checked, num)"
    />
    <RouterLink
      :to="`/book/${data.book.id}`"
      style="display: flex; align-items: center"
    >
      <img class="book-img" :src="data.book.img" alt="1-1" />
      <div class="book-info">
        <ILink class="book-name">{{ data.book.name }}</ILink>
        <ILink class="book-author" :to="`/author/${data.book.author.id}`">
          {{ data.book.author.name }}
        </ILink>
        <ILink class="book-publisher">{{ data.book.publisher }}</ILink>
      </div>
      <div class="book-price">￥ {{ data.book.price }}</div>
    </RouterLink>
    <INumberInput
      :min="1"
      :max="10"
      v-model="num"
      @change="$emit('change', checked, num)"
    ></INumberInput>
    <div class="cart-item-option">
      <IButton
        style="margin-bottom: 14px"
        @click="onCollectionClick"
        :disabled="isCollection"
      >
        加入收藏
      </IButton>
      <IButton type="danger" @click="onDeleteClick">删除</IButton>
    </div>
  </div>
</template>

<style lang="scss">
.cart-item {
  height: 176px;
  width: 800px;
  align-items: center;
  background-color: var(--vt-c-white);
  padding: 10px 10px;
  margin: 10px 0;
  display: flex;
  justify-content: center;

  .book {
    &-img {
      width: 176px;
      height: 176px;
    }
    &-info {
      width: 200px;
      height: 176px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      margin-left: 50px;
    }
    &-name {
      font-size: 24px;
      font-weight: bold;
    }
    &-price {
      color: #f74d00;
      width: 100px;
    }
  }

  &-option {
    display: flex;
    flex-direction: column;
    margin-left: 30px;
  }
}
</style>
