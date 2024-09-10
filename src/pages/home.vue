<template>
  <div class="home-container">
    <van-swipe :show-indicators="false">
      <van-swipe-item>
        <img class="img" src="@/assets/images/banner.png" alt="" />
      </van-swipe-item>
    </van-swipe>
    <van-notice-bar
      mode="link"
      color="#ffffff"
      background="linear-gradient(to right, #9160ff 0%, #7d68ff 44%, #706eff 46%, #5e75ff 100%)"
      class="notice-bar"
      left-icon="volume-o"
      text="关于开启算力租赁活动的通知"
    >
      <template #left-icon>
        <img class="notice-left-icon" src="@/assets/images/notice.svg" alt="" />
      </template>
    </van-notice-bar>
  </div>
</template>

<script setup>

</script>
<style lang="scss" scoped>
.home-container {
  .img {
    width: 100%;
  }
  .notice-bar {
    .notice-left-icon {
      width: 31px;
      height: 27px;
    }
  }
}
</style>
