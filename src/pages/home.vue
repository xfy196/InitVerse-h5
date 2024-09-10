<template>
  <div class="home-container">
    <van-swipe :show-indicators="false">
      <van-swipe-item>
        <img class="img" src="@/assets/images/banner.png" alt="" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup></script>
<style lang="scss" scoped>
.home-container {
  .img {
    width: 100%;
  }
}
</style>
