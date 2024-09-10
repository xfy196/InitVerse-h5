<template>
  <van-nav-bar :border="false" class="nav-bar" left-arrow>
    <template #left>
      <van-icon v-if="showBack" @click="back" size="0.6rem" color="#ffffff" name="arrow-left" />
      <img class="logo" src="@/assets/images/logo.png" alt="" />
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
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useStorage } from "@vueuse/core";
import { useRoute } from "vue-router";
const { locale } = useI18n();
const router = useRouter();
const showLangSelect = ref(false);
const lang = useStorage("lang", "zh");
const route = useRoute()
const actions = [
  { name: "English", value: "en" },
  { name: "简体中文", value: "zh" },
];
const showBack = computed(() => !['/', '/rental-power'].includes(route.path))
const back = () => {
  router.back();
};
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
    width: 196px;
    height: 40px;
    margin-left: 12px;
  }
  .icon {
    width: 38px;
    height: 38px;
    margin-right: 12px;
  }
  :deep(.van-nav-bar__content) {
    height: 100%;
  }
}
</style>
