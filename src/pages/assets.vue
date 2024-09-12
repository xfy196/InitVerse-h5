<template>
  <div>assets</div>
</template>

<script setup>
import { getAssets } from "@/api/assets"
import { onMounted } from "vue";
onMounted(async () => {
  const res = await getAssets();
  console.log("🚀 ~ onMounted ~ res:", res)
});
</script>
<style lang="scss" scoped>
</style>