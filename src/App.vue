<script setup>
import { computed, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useSettingStore } from "@/stores/setting";
const route = useRoute();
const settingStore = useSettingStore();
const layout = computed(() => route?.meta?.layout);
onBeforeMount(async () => {
  await settingStore.updateSetting();
});
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<style scoped></style>
