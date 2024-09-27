<template>
  <div class="container">
    <Back />
    <div class="wrapper">
      <div class="head">{{ $t("noticeList.title") }}</div>
      <div class="content">
        <ul class="notice-box">
          <li
            @click.stop="handleToDetail(notice)"
            class="notice-item"
            v-for="notice in notices"
            :key="notice.noticeId"
          >
            <div class="left">
              <div :class="{ istop: notice.istop === '1' }" class="message">
                <div class="txt van-ellipsis">
                  {{ notice.title }}
                </div>
              </div>
              <div class="date">{{ notice.pushTime }}</div>
            </div>
            <div class="right">
              <van-icon size="0.4rem" color="#ffffff" name="arrow" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getNoticeList } from "@/api/rental";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import Back from "../components/back.vue";
import { useI18n } from "vue-i18n";
import { showLoadingToast } from "vant";
const router = useRouter();
const notices = ref([]);
const { t, locale } = useI18n();

watch(
  locale,
  async () => {
    const loadinbgToast = showLoadingToast({
      message: t("loadingText"),
      duration: 0,
    });
    try {
      const res = await getNoticeList();
      console.log("🚀 ~ res:", res);
      notices.value = res.rows;
    } catch (error) {
      console.log("🚀 ~ onBeforeMount ~ error:", error);
    } finally {
      loadinbgToast.close();
    }
  },
  {
    immediate: true,
  }
);
const handleToDetail = (data) => {
  router.push({
    path: "/notice-detail",
    query: {
      id: data.noticeId,
    },
  });
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
  padding: 0 30px;
  .wrapper {
    flex: 1;
    overflow: auto;
    box-sizing: border-box;

    .head {
      font-size: 34px;
      color: #ffffff;
      line-height: 40px;
      text-align: center;
    }
    .content {
      .notice-box {
        .notice-item {
          padding: 0 30px;
          width: 100%;
          height: 144px;
          background: linear-gradient(223deg, #353342 0%, #383b52 100%);
          border-radius: 20px 20px 20px 20px;
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .left {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            .message {
              font-weight: 400;
              font-size: 28px;
              color: #ffffff;
              line-height: 33px;
              position: relative;

              .txt {
                width: 500px;
              }
            }
            .istop {
              margin-left: 24px;
              &::before {
                content: "";
                display: block;
                position: absolute;
                left: -24px;
                top: 10px;
                width: 12px;
                height: 12px;
                background: #ed5c42;
                border-radius: 100%;
              }
            }
            .date {
              font-weight: 400;
              font-size: 28px;
              color: #aeaec3;
              line-height: 33px;
            }
          }
          .right {
            margin-left: 64px;
          }
        }
      }
    }
  }
}
</style>
