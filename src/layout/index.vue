<template>
  <Head />
  <div>
    <RouterView />
  </div>
  <TabBar />
</template>

<script setup lang="ts">
import Head from "./head.vue";
import TabBar from "./tab-bar.vue";
</script>
<style lang="scss" scoped></style>
