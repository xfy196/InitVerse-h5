<template>
  <div class="container">
    <div class="profile">
      <div class="label">我的ID</div>
      <div class="profile-id">
        {{ id }}
        <img
          v-if="isSupported"
          @click="copy(id)"
          class="copy-icon"
          src="@/assets/images/icons/copy.svg"
          alt=""
        />
      </div>
    </div>
    <van-divider class="divider"></van-divider>
    <div class="level-box">
      <div class="top">
        <div class="stars">
          <img src="@/assets/images/icons/star.svg" alt="" />
          <img src="@/assets/images/icons/star.svg" alt="" />
          <img src="@/assets/images/icons/star.svg" alt="" />
        </div>
        <div class="level-icon">
          <img src="@/assets/images/icons/level2.svg" alt="" />
        </div>
      </div>
      <div class="bottom">
        <div class="vip-level">{{ $t('my.vipLevel') }}：V5</div>
        <div class="node-level">{{ $t('my.nodeLevel') }}：V5</div>
      </div>
    </div>
    <div class="cell-box">
      <div class="cell-item">
        <div class="label">{{ $t('my.withdrawalAddress') }}</div>
        <div class="right" @click="handleSetWithdrawalAddress">
          <div class="status">{{ $t('my.notSet') }}</div>
          <van-icon class="icon" color="#ffffff" size="0.503rem" name="arrow" />
        </div>
      </div>
      <van-divider
        style="margin: 0; border-color: rgba(39, 39, 43, 1)"
      ></van-divider>
      <div class="cell-item">
        <div class="label">{{ $t('my.transactionPassword') }}</div>
        <div class="right" @click="handleSetTransactionPassword">
          <div class="status">{{ $t('my.notSet') }}</div>
          <van-icon class="icon" color="#ffffff" size="0.503rem" name="arrow" />
        </div>
      </div>
    </div>
    <!-- 我的团队 -->
    <div class="my-team">
      <div class="title">{{ $t('my.myTeam') }} <span class="sub-title">({{ $t('my.direct') }})</span></div>
      <div class="cell-box" style="margin-top: 20px">
        <div class="cell-item">
          <div class="label">{{ $t('my.userID') }}</div>
          <div class="right">
            <div class="status">{{ $t('my.teamPower') }}</div>
          </div>
        </div>
        <van-divider
          style="margin: 0; border-color: rgba(39, 39, 43, 1)"
        ></van-divider>
        <div class="cell-item">
          <div class="label van-ellipsis">U2432534534</div>
          <div class="right">
            <div class="status">200 USDT</div>
            <img class="icon" src="@/assets/images/icons/power.svg" alt="" />
          </div>
        </div>
        <van-divider
          style="margin: 0; border-color: rgba(39, 39, 43, 1)"
        ></van-divider>
        <div class="cell-item">
          <div class="label van-ellipsis">
            {{ $t('my.myCommunity') }}：7000 USDT（{{ $t('my.totalPower') }}-{{ $t('my.regionPower') }}）
          </div>
        </div>
      </div>
    </div>
    <!-- 邀请好友 -->
    <div class="invite-friend">
      <div class="title">{{ $t('my.inviteFriend') }}</div>
      <div class="cell-box" style="margin-top: 20px">
        <div class="cell-item">
          <div class="label">{{ $t('my.inviteCode') }}</div>
          <div class="right">
            <div class="status">UDA76SS</div>
            <img class="icon" src="@/assets/images/icons/copy.svg" alt="" />
          </div>
        </div>
        <van-divider
          style="margin: 0; border-color: rgba(39, 39, 43, 1)"
        ></van-divider>
        <div class="cell-item">
          <div class="invite-link van-ellipsis">
            http://www.inichain.com/uetsce
          </div>
          <div class="copy-link">
            {{ $t('my.copyLink') }}
            <img
              class="icon"
              src="@/assets/images/icons/copy-white.svg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <div class="social-box">
      <div class="title">{{ $t('my.socialLink') }}</div>
      <div class="cell-box">
        <template v-for="(link, index) in links" :key="link.url">
          <div class="cell-item">
            <div class="label">
              <img class="icon" :src="link.icon" alt="" />
              <span class="van-ellipsis"
                >{{ index === links.length - 1 ? $t('my.officialEmail') : ""
                }}{{ link.url }}</span
              >
            </div>
            <div class="right">
              <img
                class="icon"
                v-if="isSupported"
                @click="copy(link.url)"
                src="@/assets/images/icons/copy.svg"
                alt=""
              />
            </div>
          </div>
          <van-divider
            v-if="index < links.length - 1"
            style="margin: 0; border-color: rgba(39, 39, 43, 1)"
          ></van-divider>
        </template>
      </div>
    </div>
    <ModifyTransactionPassword v-model:show="showModifyTransactionPassword" />
    <ModifyTransactionAddress v-model:show="showModifyTransactionAddress" />
  </div>
</template>

<script setup>
import { useClipboard } from "@vueuse/core";
import x from "@/assets/images/icons/x.svg";
import tg from "@/assets/images/icons/tg.svg";
import discord from "@/assets/images/icons/discord.svg";
import email from "@/assets/images/icons/email.svg";
import { ref } from "vue";
import ModifyTransactionPassword from "./components/modify-transaction-password.vue";
import ModifyTransactionAddress from "./components/modify-transaction-address.vue";
const id = ref("1234567890");
const links = ref([
  {
    icon: x,
    url: "https://x.com/InitVerse",
  },
  {
    icon: tg,
    url: "https://t.me/InitVerseWeb3",
  },
  {
    icon: discord,
    url: "https://discord.com/invite/InitVerse",
  },
  {
    icon: email,
    url: "abc@xxxx.com",
  },
]);
const { copy, isSupported } = useClipboard();
const showModifyTransactionPassword = ref(false);
const showModifyTransactionAddress = ref(false);
const handleSetWithdrawalAddress = () => {
  showModifyTransactionAddress.value = true;
};
const handleSetTransactionPassword = () => {
  showModifyTransactionPassword.value = true;
};
</script>
<style lang="scss" scoped>
.container {
  padding: 30px;
  .profile {
    .label {
      font-size: 24px;
      color: #ffffff;
      line-height: 28px;
    }
    .profile-id {
      font-weight: 600;
      font-size: 40px;
      color: #ffffff;
      line-height: 47px;
      margin-top: 8px;
      .copy-icon {
        width: 36px;
        height: 36px;
      }
    }
  }
  .title {
    font-weight: 500;
    font-size: 32px;
    color: #ffffff;
    line-height: 38px;
    .sub-title {
      font-weight: 400;
      font-size: 26px;
      color: #ffffff;
      line-height: 30px;
    }
  }
  .divider {
    margin-top: 20px;
    margin-bottom: 30px;
    border-color: rgba(59, 56, 79, 1);
  }
  .level-box {
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .stars {
        img {
          width: 32px;
          height: 32px;
        }
      }
      .level-icon {
        img {
          width: 36px;
          height: 36px;
        }
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      .vip-level {
        font-weight: 400;
        font-size: 28px;
        color: #ffffff;
        line-height: 33px;
      }
      .node-level {
        font-weight: 400;
        font-size: 28px;
        color: #ffffff;
        line-height: 33px;
      }
    }
  }
  .my-team {
    margin-top: 38px;
    .cell-item {
      &:not(:first-child) {
        .right {
          .status {
            font-weight: 400;
            font-size: 28px;
            color: #ffffff;
            line-height: 33px;
          }
          .icon {
            width: 40px;
            height: 40px;
          }
        }
      }
      &:last-child {
        .label {
          flex: 1;
        }
      }
    }
  }
  .invite-friend {
    margin-top: 38px;
    .cell-item {
      .right {
        .status {
          font-weight: 500 !important;
          font-size: 28px !important;
          color: #ffffff !important;
          line-height: 33px !important;
        }
      }
      .invite-link {
        width: 438px;
        height: 60px;
        padding: 0 20px;
        box-sizing: border-box;
        border: 2px solid #9160ff;
        border-right: none;
        font-weight: 400;
        font-size: 28px;
        color: #ffffff;
        line-height: 60px;
      }
      .copy-link {
        width: 192px;
        height: 60px;
        background: #9160ff;
        font-weight: 400;
        font-size: 26px;
        color: #ffffff;

        line-height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          margin-left: 10px;
        }
      }
      &:last-child {
        .right {
          .status {
            font-weight: 500;
            font-size: 28px;
            color: #ffffff;
            line-height: 33px;
          }
          .icon {
            margin-left: 10px;
          }
        }
      }
    }
  }
  .social-box {
    margin-top: 30px;
    .cell-item {
      .label {
        flex: auto;
        .icon {
          margin-right: 8px;
        }
      }
    }
  }
  .cell-box {
    width: 690px;
    background: linear-gradient(223deg, #353342 0%, #383b52 100%);
    border-radius: 20px 20px 20px 20px;
    padding: 0 30px;
    margin-top: 20px;
    .cell-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 100px;
      .label {
        display: flex;
        align-items: center;
        font-size: 30px;
        color: #ffffff;
        line-height: 35px;
        flex: 0.6;
      }
      .right {
        display: flex;
        align-items: center;
        flex: 0.4;
        justify-content: flex-end;

        .status {
          font-size: 28px;
          color: #aeaec3;
          line-height: 33px;
        }
        .icon {
          margin-left: 20px;
          width: 36px;
          height: 36px;
        }
      }
    }
  }
}
</style>
