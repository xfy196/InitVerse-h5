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
import {useDe} from "@vueuse/core"
import Head from "./head.vue";
import TabBar from "./tab-bar.vue";
onMounted(() => {
  console.log(window.innerHeight)
})
</script>
<style lang="scss" scoped>
.layout-container {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg, purple 0%, #000000 100%);
  .main {
    height: calc(100% - 133px - 126px);
    background-color: rgba(255, 255, 255, 0);
    padding-bottom: 16px;
    box-sizing: border-box;
    overflow: auto;
  }
}
</style>
