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
    <div class="rental-container"></div>

    <ul class="link-list">
      <li>
        <a href="https://x.com/zj_nft_game" target="_blank">
          <img src="@/assets/images/x.svg" alt="" />
        </a>
      </li>
      <li>
        <a href="https://x.com/zj_nft_game" target="_blank">
          <img src="@/assets/images/twitter.svg" alt="" />
        </a>
      </li>
      <li>
        <a href="https://x.com/zj_nft_game" target="_blank">
          <img src="@/assets/images/discord.svg" alt="" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup></script>
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
  .rental-container {
    width: 678px;
    height: 583px;
    background-color: #17181b;
    border-radius: 36px;
    margin: 0 auto;
    margin-top: 40px;
  }
  .link-list {
    display: flex;
    // margin-top: 70px;
    // margin-bottom: 54px;
    height: 300px;
    justify-content: center;
    li {
      margin-left: 20px;
      &:first-child {
        margin-left: 0;
      }
      img {
        width: 30px;
        height: 27px;
      }
    }
  }
}
</style>
