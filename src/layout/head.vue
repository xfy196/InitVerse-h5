<template>
  <van-nav-bar class="nav-bar" left-arrow>
    <template #left>
      <img class="logo" src="@/assets/images/logo.png" alt=""/>
    </template>
  </van-nav-bar>

</template>

<script setup>
</script>
<style lang="scss" scoped>
.nav-bar {
  background-color: #000;
  height: 133px;
    .logo {
      width: 196px;
      height: 40px;
    }
    :deep(.van-nav-bar__content){
      height: 100%;
    }
}
</style>