<template>
  <van-button
    :class="classNames"
    :loading="loading"
    :disabled="disabled"
    class="c-button"
    type="primary"
  >
    <slot></slot>
  </van-button>
</template>

<script setup>
import { computed } from "vue";
const { disabled } = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
const classNames = computed(() => {
  return {
    active: !disabled,
  };
});
</script>
<style lang="scss" scoped>
.c-button {
  min-width: 280px;
  height: 70px;
  border-radius: 40px 40px 40px 40px;
  border: 4px solid;
  box-sizing: border-box;
  background-color: #37394e;
  border-color: #626176;
  &.active {
    border-color: rgba(145, 96, 255, 1);
  }
}
</style>
