<script setup>
import Empty from "../Empty.vue";
import IButton from "../input/IButton.vue";

defineProps({
  amount: {
    type: Number,
    required: true,
  },
});

defineEmits(["balance"]);
</script>

<template>
  <aside class="cart-aside">
    <span class="header">价格统计</span>
    <Empty class="content" v-show="amount == 0" describe="还没有选择商品喔" />
    <div class="content" v-show="amount > 0">
      <span>总计：{{ amount }}</span>
    </div>
    <IButton class="buy-btn" :disabled="amount == 0" @click="$emit('balance')">
      结算
    </IButton>
  </aside>
</template>

<style lang="scss">
.cart-aside {
  width: calc(var(--content-width) - 800px + 10px + 10px);
  height: 300px;
  position: sticky;
  top: 100px;
  margin: 10px 0 0 15px;
  padding: 12px;
  background-color: var(--color-background);
  display: flex;
  flex-direction: column;

  .header {
    font-weight: bold;
    font-size: 20px;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .buy-btn {
    padding: 6px;
  }
}
</style>
