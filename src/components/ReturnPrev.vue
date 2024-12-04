<script setup>
import IconReturn from "@/components/icons/IconReturn.vue";
</script>

<template>
  <section class="return-prev">
    <div class="btn-retrun" @click="$router.go(-1)">
      <IconReturn width="64" />
      <span class="text">返回上一级</span>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.return-prev {
  background-color: var(--color-background);
  padding: 10px 0;
  .btn-retrun {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    padding: 0 30px;

    &:hover {
      color: var(--c-bright-blue);
      > .svg-icon {
        fill: var(--c-bright-blue);
      }
    }
    > .text {
      margin-left: 20px;
      font-size: 26px;
    }
  }
}
</style>
