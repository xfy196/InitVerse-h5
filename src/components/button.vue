<template>
  <div :class="sizeClass" class="button-bg">
    <div class="button">
      <div class="button-text">
        <slot> </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const { border, size } = defineProps({
  border: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "small",
  },
});
const sizeClass = computed(() => {
  return [size === "small" ? "small" : "large", border ? "border" : ""];
});
</script>
<style lang="scss" scoped>
.button-bg {
  border-radius: 40px 40px 40px 40px;
  background: rgba(98, 97, 118, 1);
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  .button {
    border-radius: 40px 40px 40px 40px;
    background-color: #363446;
    .button-text {
      color: #ffffff;
      text-align: center;
    }
  }
  &.small {
    width: 100px;
    height: 50px;
    .button {
      width: 96px;
      height: 46px;
      .button-text {
        font-size: 26px;
        line-height: 46px;
      }
    }
  }
  &.border {
    background-image: linear-gradient(
      121deg,
      rgba(145, 96, 255, 1),
      rgba(255, 255, 255, 1),
      rgba(94, 117, 255, 1)
    );
  }
  &.large {
    width: 280px;
    height: 56px;
    .button {
      width: 272px;
      height: 48px;
      .button-text {
        font-size: 30px;
        line-height: 48px;
      }
    }
  }
}
</style>
