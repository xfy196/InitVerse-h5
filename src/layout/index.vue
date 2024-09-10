<template>
  <div class="layout-container">
    <Head />
    <div class="main-container">
      <div class="main">
          <RouterView />
      </div>
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
  .main-container {
    padding-bottom: 16px;
    box-sizing: border-box;
    overflow: hidden;
    .main {
      height: calc(100vh - 133px - 126px);
      box-sizing: border-box;
      overflow: auto;
    }
  }
}
</style>
