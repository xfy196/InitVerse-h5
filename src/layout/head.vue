<template>
  <van-nav-bar :border="false" class="nav-bar" left-arrow>
    <template #left>
      <img class="logo" src="@/assets/images/logo.svg" alt="" />
    </template>
    <template #right>
      <img
        @click="logout"
        class="icon"
        src="@/assets/images/logout.svg"
        alt=""
      />
      <img
        @click="changeLang"
        class="icon"
        src="@/assets/images/lang.svg"
        alt=""
      />
    </template>
  </van-nav-bar>
  <van-action-sheet
    v-model:show="showLangSelect"
    :actions="actions"
    @select="onSelectLang"
  />
</template>

<script setup>
import {ref } from "vue";
import { useI18n } from "vue-i18n";
import { useStorage } from "@vueuse/core";
const { locale } = useI18n();
const showLangSelect = ref(false);
const lang = useStorage("lang", "zh");
const actions = [
  { name: "English", value: "en" },
  { name: "简体中文", value: "zh" },
];

const onSelectLang = (item) => {
  lang.value = item.value;
  locale.value = item.value;
  showLangSelect.value = false;
};
const logout = () => {
  // TODO 退出登录
};
const changeLang = () => {
  showLangSelect.value = true;
};
</script>
<style lang="scss" scoped>
.nav-bar {
  height: 133px;
  background-color: rgba(255, 255, 255, 0);
  .logo {
    width: 224px;
    height: 45px;
    margin-left: 12px;
  }
  .icon {
    width: 48px;
    height: 48px;
    margin-right: 20px;
  }
  :deep(.van-nav-bar__content) {
    height: 100%;
  }
}
</style>
