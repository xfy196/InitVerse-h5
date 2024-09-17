<template>
  <van-overlay v-model:show="show" @click.stop="handleClose">
    <div class="wrapper">
      <div class="form" v-if="!passwordLock" @click.stop>
        <van-icon
          name="cross"
          color="#ffffff"
          class="close-icon"
          @click.stop="handleClose"
        />
        <div class="title">
          USDT<span v-if="withdrawalType === 'static'">{{
            $t("withdrawal.static")
          }}</span
          ><span v-if="withdrawalType === 'dynamic'">{{
            $t("withdrawal.dynamic")
          }}</span
          >{{ $t("withdrawal.title") }}
        </div>
        <!-- 静态展示 toptip -->
        <div v-if="withdrawalType === 'static'" class="top-tip">
          <div class="tip">{{ $t("withdrawal.staticTip") }}</div>
        </div>
        <!-- 余额 -->
        <div class="balance">
          <div class="label">{{ $t("withdrawal.balanceLabel") }}</div>
          <div class="value">
            {{ balance }} USDT
            <img src="@/assets/images/icons/power.svg" alt="" />
          </div>
        </div>
        <van-divider class="divider" />
        <div class="input-box">
          <CInput
            :label="$t('withdrawal.passwordLabel')"
            :type="passwordVisible ? 'text' : 'password'"
            :placeholder="$t('withdrawal.passwordPlaceholder')"
            v-model:value="safePassword"
          >
            <template #right-icon>
              <van-icon
                :name="passwordVisible ? 'eye-o' : 'closed-eye'"
                @click="passwordVisible = !passwordVisible"
              />
            </template>
          </CInput>
        </div>
        <div class="input-box">
          <CInput
            @update:value="handleUpdateWithdrawalNum"
            :label="$t('withdrawal.numLabel')"
            v-model:value="value"
            type="digit"
            :placeholder="$t('withdrawal.numPlaceholder')"
            :border="false"
            clearable
          >
            <template #button>
              <div @click.stop="handleMaxNum" class="max">Max</div>
            </template>
            <template #unit>
              <div class="unit">USDT</div>
            </template>
          </CInput>
        </div>
        <div class="expected">
          <div class="left">{{ $t("withdrawal.expectedLabel") }}</div>
          <div class="right van-ellipsis">{{ expectedIni }} INI</div>
        </div>
        <div class="expected">
          <div class="left">{{ $t("withdrawal.balanceLabel") }}</div>
          <div class="right van-ellipsis">{{ expectedIni }} INI</div>
        </div>
        <div class="withdrawal-btn">
          <CButton @click.stop="handleWithdrawal" :disabled="disabled">{{
            $t("withdrawal.withdrawalBtn")
          }}</CButton>
        </div>
        <div class="tips">
          <div v-if="value > balance" class="not-enough-tip">
            {{ $t("withdrawal.notEnoughTip") }}
          </div>
          <div v-else class="tip">{{ $t("withdrawal.tip") }}</div>
        </div>
      </div>
      <PasswordLock v-else @close="handleClose" />
    </div>
  </van-overlay>
</template>

<script setup>
import { computed, nextTick, ref, watch } from "vue";
import CInput from "@/components/c-input.vue";
import PasswordLock from "./password-lock.vue";
import { getWithdrawalNeedINI, postWithdrawal } from "@/api/assets";
import { useDebounceFn } from "@vueuse/core";
import BigNumber from "bignumber.js";
import { getAssetDetail } from "@/api/trade";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const { withdrawalType, assetType, userAssetId } = defineProps({
  withdrawalType: {
    type: String,
    // 静态提现 动态提现 dynamic
    default: "",
  },
  assetType: {
    default: 1,
    type: Number,
  },
  userAssetId: {
    default: 0,
    type: Number,
  },
});
const show = defineModel("show", { default: false });
const value = ref();
const safePassword = ref("");
const passwordVisible = ref(false);
const passwordLock = ref(false);
const balance = ref(0);
const expectedIni = ref(0);
const disabled = computed(() => {
  return !value.value || !safePassword.value || !expectedIni.value;
});

watch(
  show,
  async (newVal) => {
    if (newVal) {
      const loadinbgToast = showLoadingToast({
        message: t("loadingText"),
        duration: 0,
      });
      const res = await getAssetDetail(assetType);
      balance.value = res.data.balance;
      const iniRes = await getAssetDetail(4);
      expectedIni.value = iniRes.data.balance;
      loadinbgToast.close();
    } else {
      balance.value = 0;
    }
  },
  {
    immediate: true,
  }
);

const handleClose = () => {
  show.value = false;
};
const handleMaxNum = () => {
  value.value = balance.value;
};
const handleWithdrawal = async () => {
  try {
    const res = await postWithdrawal({
      userAssetId,
      outNum: value.value,
      safePassWord: safePassword.value,
    });
    console.log("🚀 ~ handleWithdrawal ~ res:", res);
  } catch (error) {
    console.log("🚀 ~ handleWithdrawal ~ error:", error);
  }
};
const handleUpdateWithdrawalNum = useDebounceFn(async (val) => {
  if (new BigNumber(val).gt(new BigNumber(balance.value))) {
    nextTick(() => {
      handleMaxNum();
    });
  } else if (new BigNumber(val).isZero() || val === "") {
    nextTick(() => {
      value.value = "";
      expectedIni.value = 0;
    });
  } else {
    const res = await getWithdrawalNeedINI({
      num: value.value,
    });
    expectedIni.value = res.data.num;
  }
}, 100);
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .form {
    padding: 30px;
    width: 670px;
    background: linear-gradient(223deg, #353342 0%, #383b52 100%);
    border-radius: 20px 20px 20px 20px;
    position: relative;
    .close-icon {
      position: absolute;
      top: 32px;
      right: 32px;
      font-size: 32px;
    }
    .title {
      font-weight: 500;
      font-size: 32px;
      color: #ffffff;
      line-height: 38px;
      text-align: center;
    }
    .top-tip {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
      font-weight: 400;
      font-size: 26px;
      color: #5e75ff;
      line-height: 30px;
      .tip {
        color: #5e75ff;
      }
    }
    .balance {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 40px;
      .label {
        font-weight: 400;
        font-size: 28px;
        color: #ffffff;
        line-height: 33px;
      }
      .value {
        display: flex;
        align-items: center;
        font-weight: 400;
        font-size: 28px;
        color: #ffffff;
        line-height: 33px;
        img {
          width: 40px;
          height: 40px;
          margin-left: 8px;
        }
      }
    }
    .divider {
      margin-top: 20px;
      margin-bottom: 0px;
      border-color: #27272b;
    }
    .input-box {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .max {
        font-weight: 400;
        font-size: 24px;
        color: #ffffff;
        line-height: 28px;
      }
      .unit {
        font-weight: 400;
        font-size: 28px;
        color: #ffffff;
        line-height: 33px;
        margin-left: 20px;
      }
    }
    .expected {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
      .left {
        font-weight: 400;
        font-size: 24px;
        color: #aeaec3;
        line-height: 28px;
      }
      .right {
        font-weight: 400;
        font-size: 24px;
        color: #aeaec3;
        line-height: 28px;
      }
    }
    .withdrawal-btn {
      display: flex;
      justify-content: center;
      margin-top: 40px;
      align-items: center;
    }
    .tips {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      font-weight: 400;
      font-size: 24px;
      line-height: 28px;
      .tip {
        color: #aeaec3;
      }
      .not-enough-tip {
        color: #ed5c42;
      }
    }
  }
}
</style>
