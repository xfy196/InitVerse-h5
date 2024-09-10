<template>
  <div class="layout-container">
    <Head />
    <div class="main">
      <RouterView />
    </div>
    <TabBar />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
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
    height: calc(100vh - 133px);
    box-sizing: border-box;
    padding-bottom: 142px;
    overflow: auto;
  }
}
</style>
