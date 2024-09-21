<template>
  <div class="container">
    <Back />
    <div class="title">{{ $t("assetsDetail.title") }}</div>
    <div class="assets-detail-tabs">
      <van-tabs
        scrollspy
        title-inactive-color="#AEAEC3"
        background="transparent"
        swipe-threshold="2"
        v-model:active="active"
        @change="onChange"
      >
        <van-tab
          v-for="tab in tabs"
          :title="tab.title"
          :name="tab.name"
          :key="tab.name"
        >
        </van-tab>
      </van-tabs>
      <van-list
        :offset="100"
        :loading-text="$t('loadingText')"
        :finished="finished"
        :finished-text="$t('finishedText')"
        @load="onLoad"
        v-model:loading="loading"
      >
        <div class="list-content" v-if="list.length > 0">
          <div class="item" v-for="(item, index) in list" :key="index">
            <div class="top">
              <div
                :class="{
                  red: item.changeType == 1,
                  green: item.changeType == 2,
                }"
                class="value"
              >
                {{ item.changeType == 1 ? "+" : "-" }}{{ item.changeAmount }}
              </div>
              <div class="time">{{ item.createTime }}</div>
            </div>
            <div class="bottom">
              <div class="form">{{ item.sourceTag }}</div>
              <div class="detail">{{ item.changeSource }}</div>
            </div>
          </div>
        </div>
        <van-empty
          v-if="!list.length && !loading"
          class="empty"
          :image="EmptyBg"
          :image-size="['6.32rem', '2.28rem']"
          :description="$t('retanlRecords.empty')"
        />
      </van-list>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import Back from "../components/back.vue";
import EmptyBg from "@/assets/images/empty.png";
import { getAssetRecords } from "@/api/assets";
const finished = ref(false);
const loading = ref(false);
const pageNo = ref(1);
const pageSize = ref(10);
const { t } = useI18n();
const list = ref([]);
const tabs = computed(() => {
  return [
    {
      title: t("assetsDetail.recharge"),
      name: "recharge",
    },
    {
      title: t("assetsDetail.usdtStatic"),
      name: "static-usdt",
    },
    {
      title: t("assetsDetail.usdtDynamic"),
      name: "dynamic-usdt",
    },
    {
      title: t("assetsDetail.iniUnlock"),
      name: "ini-unlocked",
    },
    {
      title: t("assetsDetail.iniLock"),
      name: "ini-locked",
    },
  ];
});
const active = ref("recharge");
watch(active, (val, oldVal) => {
  if (val !== oldVal) {
    list.value = [];
  }
});
const onChange = async (val) => {
  active.value = val;
  try {
    let res = null;
    loading.value = true;
    finished.value = false;
    if(val === 'recharge') {
      res = await getAssetRecords(1, {
        pageNo: pageNo.value,
        pageSize: pageSize.value,
      });
    } else if (val === "static-usdt") {
      res = await getAssetRecords(2, {
        pageNo: pageNo.value,
        pageSize: pageSize.value,
      });
    } else if (val === "dynamic-usdt") {
      res = await getAssetRecords(3, {
        pageNo: pageNo.value,
        pageSize: pageSize.value,
      });
    } else if (val === "ini-unlocked") {
      res = await getAssetRecords(4, {
        pageNo: pageNo.value,
        pageSize: pageSize.value,
      });
    } else if (val === "ini-locked") {
      res = await getAssetRecords(5, {
        pageNo: pageNo.value,
        pageSize: pageSize.value,
      });
    }

    list.value.push(
      ...res.rows
    );
    loading.value = false;
    if (list.value.length >= res.total) {
      finished.value = true;
    }
  } catch (error) {
    console.log("🚀 ~ onChange ~ error:", error);
  }
};
const onLoad = async () => {
  onChange(active.value);
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 30px;
  .empty {
    margin-top: 120px;
  }
  .title {
    font-weight: 500;
    font-size: 34px;
    color: #ffffff;
    line-height: 40px;
    margin-top: 30px;
    text-align: center;
  }
  .assets-detail-tabs {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    flex: 1;
    .van-list {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: auto;
    }
    .list-content {
      padding: 0 30px;
      .item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: linear-gradient(223deg, #353342 0%, #383b52 100%);
        border-radius: 20px 20px 20px 20px;
        margin-top: 20px;
        padding: 0 30px;
        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 56px;
          .value {
            font-weight: 400;
            font-size: 30px;
            line-height: 35px;
            &.red {
              color: #ed5c42;
            }
            &.green {
              color: #2abb93;
            }
          }
          .time {
            font-weight: 400;
            font-size: 24px;
            color: #aeaec3;
            line-height: 28px;
          }
        }
        .bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 56px;

          .form {
            font-weight: 400;
            font-size: 24px;
            color: #ffffff;
            line-height: 28px;
          }
          .detail {
            font-weight: 400;
            font-size: 24px;
            color: #ffffff;
            line-height: 28px;
          }
        }
      }
    }
    :deep(.van-tabs) {
      .van-tabs__wrap {
        .van-tabs__nav {
          .van-tabs__line {
            background: linear-gradient(180deg, #9160ff 0%, #5e75ff 100%);
          }
          .van-tab--active {
            background: linear-gradient(90deg, #9160ff 0%, #5e75ff 100%);
            background-clip: text;
            color: transparent; /* 确保文本颜色为透明 */
          }
        }
      }
    }
  }
}
</style>
