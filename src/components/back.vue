<template>
  <div class="back-container">
    <div class="back-btn" @click.stop="back">
      <van-icon size="0.4rem" color="#ffffff" name="arrow-left" />
      <span class="back-text">{{ $t('back.title') }}</span>
    </div>
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
.back-container {
  display: flex;
  align-items: center;
  padding: 0 30px;
  height: 54px;
  .back-btn {
    display: flex;
    align-items: center
  }
  .back-text {
    font-weight: 400;
    font-size: 28px;
    color: #ffffff;
    line-height: 28px;
    margin-left: 20px;
  }
}
</style>
