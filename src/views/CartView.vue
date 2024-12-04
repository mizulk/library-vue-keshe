<script setup>
import CartItem from "@/components/cart/CartItem.vue";
import CartAside from "@/components/cart/CartAside.vue";
import IButton from "@/components/input/IButton.vue";
import ICheckBox from "@/components/input/ICheckBox.vue";
import Empty from "@/components/Empty.vue";

import { ref, reactive, onMounted } from "vue";
import { useCartStore } from "@/stores/cart";
import { useCollectionStore } from "@/stores/collection";
import { deleteCarts } from "@/api/cart";
import { Toast } from "@/components/toast";
import dialog from "@/components/dailog";

const cartStore = useCartStore();
const collectionStore = useCollectionStore();

const totalCost = ref(0);

const selectState = reactive({
  selectAll: false,
  indeterminate: false,
});

function onSelectAllChange(isCheck) {
  cartStore.items.forEach((item) => {
    item.checked = isCheck;
  });
  if (!isCheck) totalCost.value = 0;
  else updataTotalCost();
}

function onChange(_isCheck, _count) {
  updataTotalCost();
}

function updataTotalCost() {
  totalCost.value = 0;
  cartStore.items.forEach((item) => {
    if (item.checked) totalCost.value += item.book.price * item.count;
  });
  updateSelectAllState();
}

function updateSelectAllState() {
  let selectAll = true;
  let indeterminate = false;
  cartStore.items.forEach((item) => {
    selectAll &= item.checked;
    indeterminate |= item.checked;
  });
  selectState.selectAll = Boolean(selectAll);
  selectState.indeterminate = Boolean(indeterminate);
}

function onBalance() {
  dialog({
    title: "结算",
    message: "结算",
    onConfirm: doBuy,
    closeOnClickModel: false,
  });
}

function doBuy() {
  let ids = [];
  cartStore.items.forEach((item) => {
    if (item.checked) ids.push(item.id);
  });
  console.log(ids);
  deleteCarts(ids)
    .then((_result) => {
      Toast.success("购买成功");
      cartStore.updateData();
    })
    .catch((_e) => {
      Toast.danger("购买失败");
    });
}

onMounted(() => {
  cartStore.updateData();
  collectionStore.updateData();
});
</script>

<template>
  <main class="cart-view">
    <section class="cart-header">
      <header class="cart-header-title">我的购物车</header>
      <main class="cart-header-text">全部商品({{ cartStore.amount }})</main>
      <footer class="cart-header-option">
        <ICheckBox
          text="全选"
          @change="onSelectAllChange"
          v-model="selectState.selectAll"
          :indeterminate="selectState.indeterminate"
        />
        <IButton class="btn" type="danger">删除</IButton>
      </footer>
    </section>
    <section class="cart-content">
      <main>
        <CartItem
          v-if="cartStore.hasItem"
          v-for="cart in cartStore.items"
          :key="cart.id"
          :data="cart"
          @change="onChange"
          v-model:num="cart.count"
          v-model:isCheck="cart.checked"
        />
        <Empty v-else style="width: 820px; height: 740px; margin: 10px 0" />
      </main>
      <CartAside :amount="totalCost" @balance="onBalance" />
    </section>
  </main>
</template>

<style lang="scss" scoped>
.cart {
  &-header {
    width: 820px;

    &-title {
      font-size: 32px;
      font-weight: bold;
    }
    &-text {
      font-size: 22px;
      margin: 20px 0;
    }
    &-option {
      display: flex;
      padding-bottom: 5px;
      border-bottom: 2px var(--vt-c-divider-light-1) solid;

      .btn {
        margin-left: 20px;
      }
    }
  }

  &-content {
    display: flex;
  }
}
</style>
