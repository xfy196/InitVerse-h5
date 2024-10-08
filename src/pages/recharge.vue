<template>
  <div class="container">
    <Back />
    <div class="title">{{ $t("recharge.title") }}</div>
    <div class="tips">{{ $t("recharge.tips") }}</div>
    <div class="address-container">
      <div class="tabs">
        <div class="tab-item" :class="{ active: tab === 'BSC' }" @click="changeTab('BSC')">
          BSC(BEP20)
        </div>
        <div class="tab-item" :class="{ active: tab === 'Tron' }" @click="changeTab('Tron')">
          Tron(TRC20)
        </div>
      </div>
      <van-divider />
      <div class="address-content">
        <div class="address-title">
          <div class="address-title-text">
            {{ $t("recharge.receiveAddress") }}
          </div>
          <div class="address-title-copy">
            <img v-if="isSupported" @click.stop="handleCopy(address)" src="@/assets/images/icons/copy.svg" alt="" />
          </div>
        </div>
        <div class="address">{{ address }}</div>
        <div class="qrcode">
          <img v-if="imgUrl" :src="imgUrl" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Back from "@/components/back.vue";
import qrcode from "qrcode";
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useClipboard } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
const { copy, isSupported } = useClipboard();
const imgUrl = ref("");
const tab = ref("BSC");
const userStore = useUserStore();
const { t } = useI18n();
const address = ref("");
const { userInfo } = storeToRefs(userStore);

onMounted(async () => {
  changeTab(tab.value);
});
const generateQR = async (text) => {
  try {
    return await qrcode.toDataURL(text);
  } catch (err) {
    console.error(err);
  }
};
const changeTab = async (value) => {
  tab.value = value;
  if (tab.value === "BSC") {
    address.value = userInfo.value.bnbAddress;
  } else {
    address.value = userInfo.value.tronAddress;
  }
  console.log("🚀 ~ changeTab ~ address.value:", address.value);
  imgUrl.value = address.value ? await generateQR(address.value) : "";
  console.log("🚀 ~ changeTab ~ imgUrl.value:", imgUrl.value);
};
const handleCopy = async (value) => {
  await copy(value);
  showToast({
    message: t("recharge.copySuccess"),
  });
};
</script>
<style lang="scss" scoped>
.container {
  padding: 0 30px 30px;

  .title {
    font-weight: 500;
    font-size: 34px;
    color: #ffffff;
    margin-top: 30px;
    text-align: center;
  }

  .tips {
    font-weight: 400;
    font-size: 28px;
    color: #aeaec3;
    text-align: center;
    margin-top: 10px;
  }

  .address-container {
    margin-top: 30px;
    width: 690px;
    height: 709px;
    background: linear-gradient(223deg, #353342 0%, #383b52 100%);
    border-radius: 20px 20px 20px 20px;
    padding: 30px;

    .tabs {
      display: flex;
      justify-content: center;

      .tab-item {
        margin-right: 20px;
        min-width: 190px;
        height: 50px;
        width: 142px;
        font-size: 26px;
        color: #ffffff;
        border: 2px solid #626176;
        border-radius: 40px;
        display: flex;
        align-items: center;
        justify-content: center;

        &.active {
          color: #9160ff;
          border-color: #9160ff;
        }
      }
    }

    .address-content {
      .address-title {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .address-title-text {
          font-weight: 400;
          font-size: 28px;
          color: #ffffff;
          height: 50px;
        }

        .address-title-copy {
          img {
            width: 44px;
            height: 44px;
          }
        }
      }

      .address {
        font-weight: 400;
        font-size: 28px;
        color: #ffffff;
        line-height: 33px;
        word-break: break-all;
      }

      .qrcode {
        width: 329px;
        height: 329px;
        background: #ffffff;
        margin: 0 auto;
        margin-top: 30px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
