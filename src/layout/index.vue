<template>
  <div class="layout-container">
    <Head />
    <div>
      <div class="main">
          <RouterView />
      </div>
    </div>
    <TabBar />
  </div>
</template>

<script setup lang="ts">
import Head from "./head.vue";
import TabBar from "./tab-bar.vue";
</script>
<style lang="scss" scoped>
.layout-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(180deg, purple 0%, #000000 100%);
  .main {
    height: calc(100vh - 133px - 126px);
    background-color: rgba(255, 255, 255, 0);
    padding-bottom: 16px;
    box-sizing: border-box;
    overflow: auto;
  }
}
</style>
