<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  imgs: {
    type: Array,
    required: true,
  },
  duration: {
    type: Number,
    default: 3000,
  },
  autoPlay: {
    type: Boolean,
    default: true,
  },
});

let timer;

const curActive = ref(0);
const isMouseEnter = ref(false);

function step(value) {
  curActive.value += value;

  if (curActive.value >= props.imgs.length) {
    curActive.value = 0;
    return;
  }

  if (curActive.value < 0) {
    curActive.value = props.imgs.length - 1;
  }
}

function onMouseEnter() {
  isMouseEnter.value = true;
  stop();
}

function onMouseLeave() {
  isMouseEnter.value = false;
  play();
}

function play() {
  if (props.autoPlay) {
    timer = setInterval(() => {
      step(1);
    }, props.duration);
  }
}

function stop() {
  if (timer) clearInterval(timer);
}

onMounted(() => {
  play();
});

onUnmounted(() => {
  stop();
});
</script>

<template>
  <div class="carousel" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <ul class="carousel-body">
      <li
        v-for="(item, index) in imgs"
        :key="index"
        :class="['carousel-item', { active: curActive === index }]"
      >
        <img class="image" :src="item" alt="" />
      </li>
    </ul>
    <div
      class="carousel-btn prev"
      @click="step(-1)"
      :style="{ opacity: isMouseEnter ? 1 : 0 }"
    >
      &lt;
    </div>
    <div
      class="carousel-btn next"
      @click="step(1)"
      :style="{ opacity: isMouseEnter ? 1 : 0 }"
    >
      &gt;
    </div>
    <div class="carousel-indicator">
      <span
        v-for="(_item, index) in imgs"
        :key="index"
        :class="{ active: curActive === index }"
        @click="curActive = index"
      ></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$carousel-width: 656px;
$carousel-height: 352px;

.carousel {
  width: $carousel-width;
  height: $carousel-height;
  background-color: red;
  position: relative;

  &-body {
    width: 100%;
    height: 100%;
    background-color: #aaa;
  }

  &-item {
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0;
    transition: opacity 0.5s linear;

    &.active {
      opacity: 1;
    }

    .image {
      width: 100%;
      height: 100%;
    }
  }

  &-indicator {
    position: absolute;
    left: 12px;
    bottom: 12px;

    span {
      display: inline-block;
      width: 18px;
      height: 18px;
      background-color: rgba($color: #000, $alpha: 0.2);
      border-radius: 50%;
      cursor: pointer;
      transition: background 0.5s;

      ~ span {
        margin-left: 10px;
      }

      &.active {
        background-color: #fff;
      }
    }
  }

  $carousel-btn-height: 44px;
  &-btn {
    display: inline-block;
    width: 32px;
    height: $carousel-btn-height;
    background-color: rgba($color: #000, $alpha: 0.2);
    font-size: 30px;
    color: #ddd;
    text-align: center;
    position: absolute;
    top: calc($carousel-height / 2 - $carousel-btn-height / 2);
    transition: opacity 0.5s linear;
    cursor: pointer;
    user-select: none;

    &.prev {
      left: 0;
      border-radius: 0 50% 50% 0;
    }

    &.next {
      right: 0;
      border-radius: 50% 0 0 50%;
    }

    &:hover {
      background-color: rgba($color: #000, $alpha: 0.6);
    }
  }
}
</style>
