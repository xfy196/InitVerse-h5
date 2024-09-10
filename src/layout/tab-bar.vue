<template>
  <van-tabbar
    :border="false"
    route
    active-color="white"
    inactive-color="#AEAEC3"
    class="tababar"
  >
    <van-tabbar-item
      to="/rental-power"
      :icon="isActive(['/rental-power', '/']) ? tabIcon1Active : tabIcon1"
      >{{ $t("tab.tab1") }}</van-tabbar-item
    >
    <van-tabbar-item
      to="/transaction"
      :icon="isActive(['/transaction']) ? tabIcon2Active : tabIcon2"
      >{{ $t("tab.tab2") }}</van-tabbar-item
    >
    <van-tabbar-item
      to="/assets"
      :icon="isActive(['/assets']) ? tabIcon3Active : tabIcon3"
      >{{ $t("tab.tab3") }}</van-tabbar-item
    >
    <van-tabbar-item
      to="/my"
      :icon="isActive(['/my']) ? tabIcon4Active : tabIcon4"
      >{{ $t("tab.tab4") }}</van-tabbar-item
    >
  </van-tabbar>
</template>

<script setup>
import tabIcon1 from "@/assets/images/icons/tab1.svg";
import tabIcon2 from "@/assets/images/icons/tab2.svg";
import tabIcon3 from "@/assets/images/icons/tab3.svg";
import tabIcon4 from "@/assets/images/icons/tab4.svg";
import tabIcon1Active from "@/assets/images/icons/tab1-active.svg";
import tabIcon2Active from "@/assets/images/icons/tab2-active.svg";
import tabIcon3Active from "@/assets/images/icons/tab3-active.svg";
import tabIcon4Active from "@/assets/images/icons/tab4-active.svg";
import { useRoute } from "vue-router";
const route = useRoute();
const isActive = (paths) => {
  return paths.includes(route.path);
};
</script>
<style lang="scss" scoped>
.tababar {
  border-top-left-radius: 36px;
  border-top-right-radius: 36px;
  height: 126px;
  overflow: hidden;
  background: $tab-bg;
  .van-tabbar-item--active {
    background-color: rgba(255, 255, 255, 0);
  }
  :deep(.van-icon__image) {
    height: 56px;
    width: 56px;
  }
  :deep(.van-tabbar-item__text) {
    margin-top: 6px;
    font-size: 20px;
  }
}
</style>
