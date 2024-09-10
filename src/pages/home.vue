<template>
  <div class="home-container px-30">
    <van-swipe :show-indicators="false">
      <van-swipe-item>
        <img class="img" src="@/assets/images/banner.png" alt="" />
      </van-swipe-item>
    </van-swipe>
    <van-notice-bar
      mode="link"
      color="#ffffff"
      background="linear-gradient( 90deg, rgba(39,39,43,0) 0%, rgba(145,96,255,0.5) 33%, rgba(94,117,255,0.5) 66%, rgba(39,39,43,0) 100%)"
      class="notice-bar"
      left-icon="volume-o"
      text="关于开启算力租赁活动的通知"
    >
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
        <div class="title">算力租赁</div>
        <div class="record">
          <div class="txt">租赁记录</div>
          <img src="@/assets/images/icons/copy.svg" alt="" />
        </div>
      </div>
      <div class="rental-bg">
        <img src="@/assets/images/rental-bg.png" alt="" />
      </div>
      <div class="edit-container">
        <div class="balance-box">
          <div class="left">可用余额</div>
          <div class="right">
            <div class="balance van-ellipsis">111111&nbsp;USDT</div>
            <Button border class="button">充值</Button>
          </div>
        </div>
        <van-divider class="divider" />
        <div class="input-box">
          <input
            type="number"
            class="input"
            v-model="fee"
            placeholder="最小投资金额为100，且金额需为10的倍数"
          />
          <!-- <van-field
            class="c-input"
            v-model="fee"
            type="digit"
            label=""
            :border="false"
            clearable
            center
            placeholder="最小投资金额为100，且金额需为10的倍数"
          /> -->
          <div class="unit">USDT</div>
        </div>
        <div class="expect-box">
          <div class="top">
            <div class="left">预计得到</div>
            <div class="right">1POR (价值: 100 USDT)</div>
          </div>
          <div class="ini">--INI</div>
        </div>
        <div class="rental-power-btn">
          <Button size="large" class="button">租赁算力</Button>
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
import { ref } from "vue";
import x from "@/assets/images/icons/x.svg";
import twitter from "@/assets/images/icons/twitter.svg";
import discord from "@/assets/images/icons/discord.svg";
import email from "@/assets/images/icons/email.svg";
import { useClipboard } from "@vueuse/core";
import Button from "../components/button.vue";
const fee = ref();
const links = ref([
  {
    icon: x,
    url: "https://x.com/zj_nft_game",
  },
  {
    icon: twitter,
    url: "https://x.com/zj_nft_game",
  },
  {
    icon: discord,
    url: "https://x.com/zj_nft_game",
  },
  {
    icon: email,
    url: "https://x.com/zj_nft_game",
  },
]);
</script>
<style lang="scss" scoped>
.home-container {
  .img {
    width: 100%;
  }
  .notice-bar {
    height: 64px;
    .notice-left-icon {
      width: 40px;
      height: 40px;
      margin-right: 12px;
    }
  }
  .rental-container {
    width: 690px;
    height: 686px;
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
      }
    }
  }
  .link-list {
    display: flex;
    margin-top: 30px;
    margin-bottom: 80px;
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
