<template>
  <div class="container">
    <Back />
    <div class="title">资产明细</div>
    <div class="assets-detail-tabs">
      <van-tabs
        title-inactive-color="#AEAEC3"
        background="transparent"
        v-model:active="active"
        @change="onChange"
      >
        <van-tab
          v-for="tab in tabs"
          :title="tab.title"
          :name="tab.name"
          :key="tab.name"
        >
          <van-list
            :finished="finished"
            v-model:loading="loading"
          >
          <template
          v-if"list.length > 0"
          
          >
          </template>
          <van-empty
            v-if="!list.length && !loading"
            class="empty"
            :image="EmptyBg"
            :image-size="['6.32rem', '2.28rem']"
            :description="$t('retanlRecords.empty')"
          />
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Back from "../components/back.vue";
import EmptyBg from "@/assets/images/empty.png";
const finished = ref(true);
const loading = ref(false);
const list = ref([]);
const tabs = ref([
  {
    title: "USDT静态",
    name: "static-usdt",
  },
  {
    title: "USDT 动态",
    name: "dynamic-usdt",
  },
  {
    title: "INI已解锁",
    name: "ini-unlocked",
  },
  {
    title: "INI锁定",
    name: "ini-locked",
  },
]);
const active = ref(0);
onMounted(() => {
  loading.value = true;
  finished.value = false;
  new Promise((resolve) => {
    setTimeout(() => {
      loading.value = false;
      finished.value = true;
      resolve();
    }, 2000);
  });
});
const onChange = (index) => {
  active.value = index;
};
</script>
<style lang="scss" scoped>
.container {
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
    margin-top: 30px;
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
