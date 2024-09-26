<template>
  <div class="container">
    <div class="profile">
      <div class="label">{{ $t("my.profile") }}</div>
      <div class="profile-id">
        {{ userInfo.uid }}
        <img
          v-if="isSupported"
          @click="handleCopy(userInfo.uid)"
          class="copy-icon"
          src="@/assets/images/icons/copy.svg"
          alt=""
        />
      </div>
    </div>
    <van-divider class="divider"></van-divider>
    <div class="level-box">
      <div class="top" v-if="userInfo.groupLevel > 0 || userInfo.nodeLevel > 0">
        <div class="stars">
          <img
            v-for="i in userInfo.groupLevel"
            :key="i"
            src="@/assets/images/icons/star.svg"
            alt=""
          />
        </div>
        <div class="level-icon">
          <img
            v-if="userInfo.nodeLevel === 1"
            src="@/assets/images/icons/level1.svg"
            alt=""
          />
          <img
            v-else-if="userInfo.nodeLevel === 2"
            src="@/assets/images/icons/level2.svg"
            alt=""
          />
          <img
            v-else-if="userInfo.nodeLevel === 3"
            src="@/assets/images/icons/level3.svg"
            alt=""
          />
          <img
            v-else
            src="@/assets/images/icons/no-level.svg"
            alt=""
          />
        </div>
      </div>
      <div class="bottom">
        <div class="vip-level">
          {{ $t("my.vipLevel") }}：V{{ userInfo.groupLevel }}
        </div>
        <div class="node-level">
          {{ $t("my.nodeLevel") }}：<span
            v-if="userInfo.nodeLevel === 1"
            class="level-text"
            >{{ $t("my.goldNode") }}</span
          >
          <span v-else-if="userInfo.nodeLevel === 2" class="level-text">{{
            $t("my.kingNode")
          }}</span>
          <span v-else-if="userInfo.nodeLevel === 3" class="level-text">{{
            $t("my.emperorNode")
          }}</span>
          <span v-else>{{ $t("my.noNode") }}</span>
        </div>
      </div>
    </div>
    <div class="setting-box">
      <div class="cell-box">
        <div class="cell-item">
          <div class="label">{{ $t("my.withdrawalAddress") }}</div>
          <div class="right" @click="handleSetWithdrawalAddress">
            <div v-if="!userInfo.withdrawalAddress" class="status">
              {{ $t("my.notSet") }}
            </div>
            <div v-else class="status">
              {{ $t("my.modifyWithdrawalAddress") }}
            </div>
            <van-icon
              class="icon"
              color="#ffffff"
              size="0.503rem"
              name="arrow"
            />
          </div>
        </div>
        <van-divider
          style="margin: 0; border-color: rgba(39, 39, 43, 1)"
        ></van-divider>
        <div class="cell-item">
          <div class="label">{{ $t("my.transactionPassword") }}</div>
          <div class="right" @click="handleSetTransactionPassword">
            <div v-if="!userInfo.safePwd" class="status">
              {{ $t("my.notSet") }}
            </div>
            <div v-else class="status">{{ $t("my.modifySafePassword") }}</div>
            <van-icon
              class="icon"
              color="#ffffff"
              size="0.503rem"
              name="arrow"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 我的团队 -->
    <div class="my-team">
      <div class="title">
        {{ $t("my.myTeam") }}
        <span class="sub-title">({{ $t("my.direct") }})</span>
      </div>
      <div class="cell-box" style="margin-top: 20px">
        <div class="cell-item">
          <div class="label">{{ $t("my.userID") }}</div>
          <div class="right">
            <div class="status">{{ $t("my.teamPower") }}</div>
          </div>
        </div>
        <van-divider
          style="margin: 0; border-color: rgba(39, 39, 43, 1)"
        ></van-divider>
        <div
          class="cell-item"
          v-for="(item, index) in groupList"
          :key="item.userId"
        >
          <div class="label van-ellipsis">
            U{{ item.userId }}
            <div v-if="index === 0" class="region">{{$t("my.region")}}</div>
          </div>
          <div class="right">
            <div class="status">{{ item.groupPower }} USDT</div>
            <img class="icon" src="@/assets/images/icons/power.svg" alt="" />
          </div>
        </div>
        <van-divider
          style="margin: 0; border-color: rgba(39, 39, 43, 1)"
        ></van-divider>
        <div class="cell-item">
          <div class="label">
            {{ $t("my.myCommunity") }}：{{ $t("my.totalPerformance")
            }} {{ totalPower }} USDT（{{ $t("my.quarters")
            }} {{ groupTotalPower }}USDT）
          </div>
        </div>
      </div>
    </div>
    <!-- 邀请好友 -->
    <div class="invite-friend">
      <div class="title">{{ $t("my.inviteFriend") }}</div>
      <div class="cell-box">
        <div class="cell-item">
          <div class="label">{{ $t("my.inviteCode") }}</div>
          <div class="right">
            <div class="status">{{ userInfo.shareCode }}</div>
            <img
              @click="handleCopy(userInfo.shareCode)"
              class="icon"
              src="@/assets/images/icons/copy.svg"
              alt=""
            />
          </div>
        </div>
        <van-divider
          style="margin: 0; border-color: rgba(39, 39, 43, 1)"
        ></van-divider>
        <div class="cell-item">
          <div class="invite-link van-ellipsis">
            {{ invideUrl }}
          </div>
          <div @click="handleCopy(invideUrl)" class="copy-link">
            {{ $t("my.copyLink") }}
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
      <div class="title">{{ $t("my.socialLink") }}</div>
      <div class="cell-box">
        <template v-for="(link, index) in links" :key="link.url">
          <div class="cell-item">
            <div class="label">
              <img class="icon" :src="link.icon" alt="" />
              <span class="van-ellipsis"
                >{{ index === links.length - 1 ? $t("my.officialEmail") : ""
                }}{{ link.url }}</span
              >
            </div>
            <div class="right">
              <img
                class="icon"
                v-if="isSupported"
                @click="handleCopy(link.url)"
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
import { links } from "@/config";
import { computed, onMounted, ref } from "vue";
import ModifyTransactionPassword from "./components/modify-transaction-password.vue";
import ModifyTransactionAddress from "./components/modify-transaction-address.vue";
import { useI18n } from "vue-i18n";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
import { showToast } from "vant";
import { getGroupList } from "@/api/user";
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
const { t } = useI18n();
const invideUrl = computed(
  () => `${import.meta.env.VITE_SITE_DOMAIN}/invite/${userInfo.value.shareCode}`
);
const groupList = ref([]);
const totalPower = ref(0);
const groupTotalPower = ref(0);
const { copy, isSupported } = useClipboard();
const showModifyTransactionPassword = ref(false);
const showModifyTransactionAddress = ref(false);
const handleSetWithdrawalAddress = () => {
  showModifyTransactionAddress.value = true;
};
const handleSetTransactionPassword = () => {
  showModifyTransactionPassword.value = true;
};
const handleCopy = async (text) => {
  try {
    await copy(text);
    showToast(t('copySuccessText'));
  } catch (error) {
    console.log("🚀 ~ handleCopy ~ error:", error);
  }
};
onMounted(async () => {
  const loadingToast = showLoadingToast({
    message: t("loadingText"),
    duration: 0,
  });
  try {
    await userStore.updateUserInfo();
    const res = await getGroupList();
    totalPower.value = res.data.groupPower;
    groupTotalPower.value = res.data.minRegionComputingPower;
    groupList.value = res.data.groupRelationList;
  } catch (error) {
    console.log("🚀 ~ onMounted ~ error:", error);
  } finally {
    loadingToast.close();
  }
});
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
        display: flex;
        align-items: center;
        justify-content: space-between;
        .level-text {
          font-weight: 400;
          font-size: 28px;
          color: #ffffff;
          line-height: 33px;
          margin-right: 8px;
        }
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
  .setting-box {
    .cell-box {
      margin-top: 58px;
    }
  }
  .my-team {
    margin-top: 38px;
    .cell-item {
      &:not(:first-child) {
        .label {
          display: flex;
          align-items: center;
          .region {
            width: 64px;
            height: 34px;
            background: #00c377;
            border-radius: 0px 0px 0px 0px;
            font-weight: 400;
            font-size: 20px;
            color: #ffffff;
            line-height: 34px;
            text-align: center;
            margin-left: 8px;
          }
        }
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
    margin-top: 30px;
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
