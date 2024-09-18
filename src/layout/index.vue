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
import { onBeforeMount } from "vue";
import { useUserStore } from "@/stores/user";
import Head from "./head.vue";
import TabBar from "./tab-bar.vue";
const userStore = useUserStore();
onBeforeMount(async () => {
  await userStore.updateUserInfo();
});
</script>
<style lang="scss" scoped>
.layout-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: linear-gradient(215deg, #2b2934 0%, #25283f 40%, #27272b 100%);
  .main {
    padding-bottom: 142px;
    flex: 1;
    box-sizing: border-box;
    overflow: auto;
  }
}
</style>
