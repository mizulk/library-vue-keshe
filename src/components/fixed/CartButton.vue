<script setup>
import IconCart from "../icons/IconCart.vue";
import IconCartFill from "../icons/IconCartFill.vue";
import IconHomeFill from "../icons/IconHomeFill.vue";

import { useCartStore } from "@/stores/cart";
import { useUserStore } from "@/stores/user";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const cartStore = useCartStore();
const userStore = useUserStore();

const selectIcon = computed(() => {
  if (route.path == "/cart") return IconHomeFill;
  return cartStore.hasItem ? IconCartFill : IconCart;
});

const isOnCartView = computed(() => {
  return route.path == "/cart";
});
</script>

<template>
  <RouterLink
    :style="{ visibility: userStore.isUserLogin ? 'visible' : 'hidden' }"
    class="cart-item-fixed"
    :to="isOnCartView ? '/index' : '/cart'"
  >
    <component class="icon" :is="selectIcon"></component>
    <div v-show="cartStore.hasItem && !isOnCartView" class="count">
      {{ cartStore.amount }}
    </div>
  </RouterLink>
</template>

<style lang="scss">
@use "@/assets/style/mixin.scss" as *;

$cart-btn-size: 48px;
.cart-item-fixed {
  @include fixed-button($cart-btn-size);

  .icon {
    width: $cart-btn-size;
    height: $cart-btn-size;
  }

  .count {
    padding: 1px 6px;
    text-align: center;
    color: var(--vt-c-text-dark-1);
    background-color: var(--c-red);
    border-radius: 25px;
    position: absolute;
    top: -10px;
    right: -10px;
  }
}
</style>
