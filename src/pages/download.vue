<script setup>
import {ref} from "vue";
import { links } from "@/config";
const appDownloadUrl = ref(import.meta.env.VITE_APP_DOWNLOAD_URL);

</script>

<template>
  <div class="container">
    <div class="wrapper">
      <div class="logo">
        <img src="@/assets/images/big_logo.png" alt="" />
      </div>
      <div class="app-name">
        InitVerse <br />
        Hyper-CP Plan
      </div>
      <div class="download-btn"><a :href="appDownloadUrl">Download</a></div>
      <img class="notice-bg" src="@/assets/images/download_bg.png" alt="" />
      <div class="content">
        <img
          class="down-arrow"
          src="@/assets/images/icons/down-arrow.svg"
          alt=""
        />
        <div class="title">initverse network</div>
        <div class="sub-title">
          Build and launch your dApp in a few clicks !
        </div>
        <div class="article">
          From concept to deployment, low-code solutions simplify frontend and
          smart contract development, making the process easy and customizable.
        </div>
      </div>
      <ul class="infos">
        <li class="info-item">
          <img src="@/assets/images/icons/down-icon1.svg" alt="" />
          <div>10 Mins From concept to deployment</div>
        </li>
        <li class="info-item">
          <img src="@/assets/images/icons/down-icon2.svg" alt="" />
          <div>100% Data Ownership</div>
        </li>
        <li class="info-item">
          <img src="@/assets/images/icons/down-icon3.svg" alt="" />
          <div>$100 Average development cost</div>
        </li>
      </ul>
      <ul class="link-list">
      <li v-for="link in links" :key="link.url">
        <a :href="link.url" target="_blank">
          <img :src="link.icon" alt="" />
        </a>
      </li>
    </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .wrapper {
      flex: 1;
      overflow: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-self: center;
      background: url(@/assets/images/download-big-bg.png) no-repeat center;
      background-size: cover;
      padding-bottom: 130px;
    .logo {
      display: flex;
      width: 160px;
      height: 160px;
      justify-content: center;
      margin-top: 82px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .app-name {
      text-align: center;
      font-weight: bold;
      font-size: 48px;
      color: #ffffff;
      line-height: 56px;
      margin-top: 48px;
    }
    .download-btn {
      display: flex;
      justify-content: center;
      width: 400px;
      height: 78px;
      background: linear-gradient(270deg, #5e75ff 0%, #9160ff 100%);
      border-radius: 60px 60px 60px 60px;
      text-align: center;
      line-height: 78px;
      font-weight: 500;
      font-size: 32px;
      margin-top: 70px;
      a {
          color: #ffffff;
      }
    }
    .notice-bg {
      width: 100%;
      height: 833px;
      margin-top: 40px;
    }
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 72px;
      .down-arrow {
        width: 60px;
        height: 60px;
      }
      .title {
        font-weight: bold;
        font-size: 48px;
        line-height: 56px;
        text-align: center;
        background: linear-gradient(90deg, #9160ff 0%, #5e75ff 100%);
        background-clip: text;
        color: transparent; /* 确保文本颜色为透明 */
      }
      .sub-title {
        font-weight: 400;
        font-size: 32px;
        color: #ffffff;
        line-height: 38px;
        text-align: center;
        margin-top: 30px;
      }
      .article {
        font-weight: 400;
        font-size: 28px;
        color: #9090b7;
        line-height: 33px;
        text-align: center;
        margin-top: 30px;
      }
    }
    .infos {
        width: 100%;
      margin-top: 40px;
      padding: 0 30px;
      .info-item {
        display: flex;
        align-items: center;
        margin-top: 30px;
        img {
          width: 70px;
          height: 70px;
        }
        div {
          font-weight: 400;
          font-size: 30px;
          color: #9090b7;
          line-height: 35px;
          text-align: left;
          margin-left: 20px;
        }
      }
    }
    .link-list {
        margin-top: 180px;
        display: flex;
        li {
            margin-left: 60px;
            &:first-child{
                margin-left: 0;
            }
        }
    }
  }
}
</style>
