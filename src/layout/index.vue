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
  width: 100%;
  height: 100%;
  padding-bottom: 126px;
}
</style>
