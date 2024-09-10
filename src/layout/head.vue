<template>
  <van-nav-bar :border="false" class="nav-bar" left-arrow>
    <template #left>
      <img class="logo" src="@/assets/images/logo.png" alt=""/>
    </template>
  </van-nav-bar>

</template>

<script setup>
</script>
<style lang="scss" scoped>
.nav-bar {
  height: 133px;
  background-color: rgba(255,255,255, 0);
    .logo {
      width: 196px;
      height: 40px;
    }
    :deep(.van-nav-bar__content){
      height: 100%;
    }
}
</style>