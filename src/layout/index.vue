<template>
  <div class="layout-container">
    <Head />
    <div>
      <RouterView />
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
  height: calc(100vh);
  padding-bottom: 126px;
  background: linear-gradient(180deg, purple 0%, #000000 100%);
}
</style>
