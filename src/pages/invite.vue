<template>
</template>

<script setup>
// 邀请的中转页面制作邀请码的保存
import { useRoute } from "vue-router";
import { useStorage } from "@vueuse/core";
import { useRouter } from "vue-router"; 
const route = useRoute();
const router = useRouter();
const inviteCode = useStorage("inviteCode", route.params.code);
inviteCode.value = route.params.code || '';
router.replace("/register");
</script>
<style lang="scss" scoped>
</style>