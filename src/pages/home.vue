<template>
  <div class="home-container px-30">
    <van-swipe class="banner-box" :autoplay="3000" :show-indicators="false">
      <van-swipe-item
        class="banner-item"
        v-for="banner in banners"
        :key="banner.carouselId"
      >
        <img class="img" :src="banner.carouselPic" alt="" />
      </van-swipe-item>
    </van-swipe>
    <van-notice-bar
      :scrollable="false"
      mode="link"
      color="#ffffff"
      @click.stop="handleToNoticeList"
      background="linear-gradient( 90deg, rgba(39,39,43,0) 0%, rgba(145,96,255,0.5) 33%, rgba(94,117,255,0.5) 66%, rgba(39,39,43,0) 100%)"
      class="notice-bar"
      left-icon="volume-o"
    >
      <van-swipe
        class="notice-swipe"
        vertical
        :autoplay="3000"
        :touchable="false"
        :show-indicators="false"
      >
        <van-swipe-item v-for="notice in notify" :key="notice.noticeId">{{
          notice.message
        }}</van-swipe-item>
      </van-swipe>
      <template #left-icon>
        <img
          class="notice-left-icon"
          src="@/assets/images/icons/notice.svg"
          alt=""
        />
      </template>
    </van-notice-bar>
    <div class="rental-container">
      <div class="head">
        <div class="title">{{ $t("home.rentalTitle") }}</div>
        <div @click="toRentalRecords" class="record">
          <div class="txt">{{ $t("home.rentalRecord") }}</div>
          <img src="@/assets/images/icons/record.svg" alt="" />
        </div>
      </div>
      <div class="rental-bg">
        <img src="@/assets/images/rental-bg.png" alt="" />
      </div>
      <div class="edit-container">
        <div class="balance-box">
          <div class="left">{{ $t("home.balanceKey") }}</div>
          <div class="right">
            <div class="balance van-ellipsis">{{ balance }}&nbsp;USDT</div>
            <div @click="toRecharge" class="button borderColorActive">
              {{ $t("home.balanceBtn") }}
            </div>
          </div>
        </div>
        <van-divider class="divider" />
        <div class="input-box">
          <van-field
            class="c-input"
            v-model="fee"
            type="digit"
            label=""
            autocomplete="off"
            :border="false"
            clearable
            center
            :placeholder="$t('home.balancePlaceholder')"
          />
          <div class="unit">USDT</div>
        </div>
        <div class="expect-box">
          <div class="top">
            <div class="left">{{ $t("home.expectTitle") }}</div>
            <div class="right">
              {{ BigNumber(expectPrice).div(100) }} POR ({{
                $t("home.expectValue")
              }}
              {{ expectPrice }} USDT)
            </div>
          </div>
          <div class="ini">{{ expectIni }} INI</div>
        </div>
        <div class="rental-power-btn">
          <CButton :disabled="disabledFee" @click="rentalPower">{{
            $t("home.expectBtn")
          }}</CButton>
        </div>
      </div>
    </div>

    <ul class="link-list">
      <li v-for="link in links" :key="link.url">
        <a :href="link.url" target="_blank">
          <img :src="link.icon" alt="" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, computed, watch } from "vue";
import { useDebounceFn } from "@vueuse/core";
import { links } from "@/config";
import BigNumber from "bignumber.js";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import {
  purchaseComputingPower,
  getProjectedRevenue,
  getBanners,
  getNotices,
} from "@/api/rental";
import { getAssetDetail } from "@/api/trade";
import { showLoadingToast } from "vant";
const balance = ref(0);
const fee = ref();
const expectPrice = ref(0);
const expectIni = ref(0);
const router = useRouter();
const notify = ref([]);
const banners = ref([]);
const { t, locale } = useI18n();

watch(
  locale,
  async () => {
    const bannerRes = await getBanners();
    banners.value = bannerRes.data;
    const res = await getNotices();
    notify.value = res.data;
  },
  {
    immediate: true,
  }
);
const disabledFee = computed(() => {
  return (
    new BigNumber(fee.value).lt(100) ||
    !new BigNumber(fee.value).modulo(10).isZero() ||
    BigNumber(fee.value).gt(10000)
  );
});
const initData = async () => {
  const loadinbgToast = showLoadingToast({
    message: t("loadingText"),
    duration: 0,
  });
  try {
    const assetRes = await getAssetDetail(1);
    balance.value = assetRes.data.balance;
  } catch (error) {
    console.log("🚀 ~ onBeforeMount ~ error:", error);
  } finally {
    loadinbgToast.close();
  }
};
onBeforeMount(async () => {
  initData();
});
watch(
  fee,
  useDebounceFn(async (newVal) => {
    try {
      if (newVal) {
        const res = await getProjectedRevenue({
          powerUSDT: newVal,
        });
        expectPrice.value = res.data.usdt;
        expectIni.value = res.data.iniNums;
      } else {
        expectPrice.value = 0;
        expectIni.value = 0;
      }
    } catch (error) {
      console.log("🚀 ~ watch ~ error:", error);
    }
  }, 200)
);

const rentalPower = async () => {
  try {
    const res = await purchaseComputingPower({
      powerUSDT: fee.value,
    });
    showSuccessToast({
      message: res.msg,
      onClose: () => {
        router.push("/property");
      },
    });
  } catch (error) {
    console.log("🚀 ~ rentalPower ~ error:", error);
  }
};

const handleToNoticeList = () => {
  console.log(1111);
  router.push({
    path: "/notice-list",
  });
};

const toRentalRecords = () => {
  router.push("/rental-records");
};
const toRecharge = () => {
  router.push("/recharge");
};
</script>
<style lang="scss" scoped>
.home-container {
  .banner-box {
    border-radius: 20px;
    overflow: hidden;
    height: 320px;
    .banner-item {
      .img {
        width: 100%;
      }
    }
  }
  .notice-bar {
    height: 64px;
    margin-top: 30px;
    .notice-swipe {
      height: 64px;
      line-height: 64px;
    }
    .notice-left-icon {
      width: 40px;
      height: 40px;
      margin-right: 12px;
    }
    // .van-swipe-item{
    //   height: 64px;
    // }
  }
  .rental-container {
    width: 690px;
    background: linear-gradient(223deg, #353342 0%, #383b52 100%);
    border-radius: 20px 20px 20px 20px;
    margin: 0 auto;
    margin-top: 40px;
    padding: 30px;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-weight: 600;
        font-size: 40px;
        color: #ffffff;
        line-height: 47px;
      }
      .record {
        display: flex;
        align-items: center;
        .txt {
          font-weight: 400;
          font-size: 28px;
          color: #aeaec3;
          line-height: 33px;
          text-align: center;
        }
        img {
          margin-left: 18px;
          width: 36px;
          height: 36px;
        }
      }
    }
    .rental-bg {
      display: flex;
      justify-content: center;
      margin: 50px 0 0 0;
      img {
        width: 434px;
        height: 140px;
      }
    }
    .edit-container {
      margin-top: 30px;
      .balance-box {
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          font-size: 28px;
          color: #ffffff;
          line-height: 33px;
        }
        .right {
          display: flex;
          align-items: center;
          .balance {
            font-size: 28px;
            color: #ffffff;
            line-height: 33px;
          }
          .button {
            margin-left: 12px;
            min-width: 100px;
            min-height: 50px;
            border-radius: 40px 40px 40px 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid;
            font-size: 26px;
            color: #ffffff;
            padding: 0 24px;
            line-height: 30px;
            background-color: #37394e;
          }
        }
      }
      .divider {
        margin-top: 20px;
        border-color: #27272b;
      }
      .input-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .unit {
          margin-left: 20px;
          font-size: 28px;
          color: #ffffff;
        }
      }
      .expect-box {
        margin-top: 20px;
        .top {
          display: flex;
          justify-content: space-between;
          .left {
            font-size: 24px;
            color: #aeaec3;
            line-height: 28px;
          }
          .right {
            font-size: 24px;
            color: #aeaec3;
            line-height: 28px;
          }
        }
        .ini {
          margin-top: 20px;
          font-size: 24px;
          color: #aeaec3;
          line-height: 28px;
          text-align: right;
        }
      }
      .rental-power-btn {
        margin-top: 30px;
        display: flex;
        justify-content: center;
        .button {
          min-width: 280px;
          min-height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 40px 40px 40px 40px;
          border: 4px solid #626176;
          font-weight: 400;
          font-size: 30px;
          color: #ffffff;
          line-height: 35px;
          background-color: #37394e;
        }
      }
    }
  }
  .link-list {
    display: flex;
    margin-top: 30px;
    margin-bottom: 40px;
    justify-content: center;
    li {
      margin-left: 40px;
      &:first-child {
        margin-left: 0;
      }
      img {
        width: 40px;
      }
    }
  }
}
</style>
