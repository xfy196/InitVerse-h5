<template>
    <div>
      <van-icon @click="back" size="0.5rem" color="#ffffff" name="arrow-left" />
      <span>返回</span>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const back = () => {
  router.back();
};
</script>
<style lang="scss" scoped>
</style>