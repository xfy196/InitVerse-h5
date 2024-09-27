<template>
  <div class="container">
    <Back />
    <div class="wrapper">
      <div class="title">{{ $t("noticeDetail.title") }}</div>
      <div class="content">
        <div class="title">{{ data.title }}</div>
        <div v-html="data.content" class="message"></div>
        <div class="date">{{ data.pushTime }}</div>
        <div class="footer">InitVerse</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import Back from "../components/back.vue";
import { getNoticeDetail } from "@/api/rental";
import { useI18n } from "vue-i18n";
const route = useRoute();
const { locale, t } = useI18n();
const data = ref({
  title: "",
  content: "",
  pushTime: "",
});
watch(
  locale,
  async () => {
    const loadinbgToast = showLoadingToast({
      message: t("loadingText"),
      duration: 0,
    });
    try {
      const res = await getNoticeDetail(route.query.id);
      data.value = res.data;
    } catch (error) {
      console.log("🚀 ~ watch ~ error:", error);
    } finally {
      loadinbgToast.close();
    }
  },
  {
    immediate: true,
  }
);
</script>
<style lang="scss" scoped>
.container {
  padding: 0 30px;
  height: calc(100vh - 124px);
  display: flex;
  flex-direction: column;
  .wrapper {
    flex: 1;
    overflow: auto;
    .title {
      font-weight: 500;
      font-size: 34px;
      color: #ffffff;
      line-height: 40px;
      text-align: center;
    }
    .content {
      background: linear-gradient(223deg, #353342 0%, #383b52 100%);
      border-radius: 20px 20px 20px 20px;
      padding: 30px;
      margin-top: 22px;
      .message {
        margin-top: 30px;
        font-weight: 400;
        font-size: 28px;
        color: #aeaec3;
        line-height: 33px;
      }
      .date {
        margin-top: 200px;
        font-weight: 400;
        font-size: 28px;
        color: #aeaec3;
        line-height: 33px;
        text-align: right;
      }
      .footer {
        font-weight: 400;
        font-size: 30px;
        color: #ffffff;
        line-height: 35px;
        text-align: right;
      }
    }
  }
}
</style>
