<template>
  <van-button
    :class="classNames"
    @click="handleClick"
    :loading="loading"
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
const emit = defineEmits(["click"]);
const classNames = computed(() => {
  return {
    active: disabled,
  };
});
const handleClick = () => {
  if (disabled) return;
  emit("click");
};
</script>
<style lang="scss" scoped>
.c-button {
min-width: 280px;
  min-height: 70px;
  border-radius: 40px 40px 40px 40px;
  border: 4px solid;
  box-sizing: border-box;
  background-color: #37394e;
  border-color: rgba(145, 96, 255, 1);
  &.active {
    border-color: #626176;
  }
}
</style>
