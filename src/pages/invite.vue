<template>
  <div>invite</div>
</template>

<script setup>
// 邀请的中转页面制作邀请码的保存
import { useRoute } from "vue-router";
const route = useRoute();
console.log(route.params.code);
</script>
<style lang="scss" scoped>
</style>