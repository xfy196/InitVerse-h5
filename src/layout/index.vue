<template>
  <div class="layout-container">
    <AppDownload v-if="(route.path === '/' || route.path === '/rental-power') && !isClient" />
    <Head />
    <div class="main">
      <RouterView />
    </div>
    <TabBar />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from "vue";
import { useUserStore } from "@/stores/user";
import Head from "./head.vue";
import TabBar from "./tab-bar.vue";
import { useRoute } from "vue-router";
import { useSettingStore } from "@/stores/setting";
const route = useRoute();
const userStore = useUserStore();
const settingStore = useSettingStore();
onBeforeMount(async () => {
  await userStore.updateUserInfo();
  await settingStore.updateSetting();
});
const isClient = computed(() => window?.isClient ?? false)
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
