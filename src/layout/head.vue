<template>
  <van-nav-bar :border="false" class="nav-bar" left-arrow>
    <template #left>
      <img
        class="logo"
        @click="goHome"
        src="@/assets/images/icons/logo.svg"
        alt=""
      />
    </template>
    <template #right>
      <img
        v-if="showLogout"
        @click="logout"
        class="icon"
        src="@/assets/images/icons/logout.svg"
        alt=""
      />
      <img
        @click="changeLang"
        class="icon"
        src="@/assets/images/icons/lang.svg"
        alt=""
      />
    </template>
  </van-nav-bar>
  <van-action-sheet
    class="lang-box"
    v-model:show="showLangSelect"
    :actions="actions"
    @select="onSelectLang"
  />
</template>

<script setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useStorage } from "@vueuse/core";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
const { locale } = useI18n();
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const showLangSelect = ref(false);
const lang = useStorage("lang", "zh");
const actions = [
  { name: "English", value: "en" },
  { name: "简体中文", value: "zh" },
];
const showLogout = computed(
  () => !["/login", "/register", "/forget"].includes(route.path)
);
const onSelectLang = (item) => {
  lang.value = item.value;
  locale.value = item.value;
  showLangSelect.value = false;
};
const logout = () => {
  userStore.logout();
};
const changeLang = () => {
  showLangSelect.value = true;
};
const goHome = () => {
  router.push("/");
};
</script>
<style lang="scss" scoped>
.nav-bar {
  height: 108px;
  background-color: transparent;
  .logo {
    width: 224px;
    height: 45px;
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
