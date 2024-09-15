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
            :loading-text="$t('loadingText')"
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import Back from "../components/back.vue";
import EmptyBg from "@/assets/images/empty.png";
import { getAssetRecords } from "@/api/assets";
const finished = ref(true);
const loading = ref(false);
const pageNo = ref(1)
const pageSize = ref(10)
const { t } = useI18n();
const list = ref([]);
const tabs = computed(() => {
  return [
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
const active = ref("static-usdt");
onMounted(() => {
  
  onChange(active.value)
});
const onChange = async (val) => {
  active.value = val;
  try {
    loading.value = true;
  finished.value = false;
    let res = null;
    if(val === "static-usdt") {
      res = await getAssetRecords(2, {
        pageNo: pageNo.value,
        pageSize: pageSize.value
      });
    }else if(val === "dynamic-usdt") {
      res = await getAssetRecords(3, {
        pageNo: pageNo.value,
        pageSize: pageSize.value
      });
    }else if(val === "ini-unlocked") {
      res = await getAssetRecords(4, {
        pageNo: pageNo.value,
        pageSize: pageSize.value
      });
    }else if(val === "ini-locked") {
      res = await getAssetRecords(5, {
        pageNo: pageNo.value,
        pageSize: pageSize.value
      });
    }
    list.value = res.data;
    
  } catch (error) {
    console.log("🚀 ~ onChange ~ error:", error)
  }finally {
    loading.value = false;
    finished.value = true;
  }
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
