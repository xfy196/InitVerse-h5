<script setup>
import { computed, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
const route = useRoute();
const userStore = useUserStore();
const layout = computed(() => route?.meta?.layout);
onBeforeMount(async () => {
  await userStore.updateUserInfo();
});
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<style scoped></style>
