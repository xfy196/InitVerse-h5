<template>
  <van-tabbar
    route
    safe-area-inset-bottom
    inactive-color="white"
    active-color="white"
    class="tababar"
  >
    <van-tabbar-item to="/rental-power" :icon="tabIcon1"
      >算力租凭</van-tabbar-item
    >
    <van-tabbar-item to="/transaction" :icon="tabIcon2">交易</van-tabbar-item>
    <van-tabbar-item to="/assets" :icon="tabIcon3">资产</van-tabbar-item>
    <van-tabbar-item to="/my" :icon="tabIcon4">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import tabIcon1 from "@/assets/images/tab1.svg";
import tabIcon2 from "@/assets/images/tab2.svg";
import tabIcon3 from "@/assets/images/tab3.svg";
import tabIcon4 from "@/assets/images/tab4.svg";
</script>
<style lang="scss" scoped>

.tababar {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: 1.92rem;
  overflow: hidden;
  background: $tab-bg;
  .van-tabbar-item--active {
    background-color: $tab-bg;
  }
  :deep(.van-icon__image){

    height: 0.65rem;
  }
  :deep(.van-tabbar-item__text){

    margin-top: 0.24rem;
  }
}
</style>
