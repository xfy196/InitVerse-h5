<template>
  <van-overlay v-model:show="show" @click.stop="handleClose">
    <div class="wrapper">
      <div class="form" @click.stop>
        <van-icon
          name="cross"
          color="#ffffff"
          class="close-icon"
          @click.stop="handleClose"
        />
        <div class="title">{{ $t("transfer.title") }}</div>
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
            @update:value="handleUpdateValue"
            :label="''"
            :placeholder="$t('transfer.placeholder')"
            v-model:value="value"
            type="digit"
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
          <div class="left">{{ $t("transfer.expected") }}</div>
          <div class="right van-ellipsis">{{ expectedIni }} INI</div>
        </div>
        <div class="expected">
          <div class="left">{{ $t("transfer.balanceLabel") }}</div>
          <div class="right van-ellipsis">{{ balanceIni }} INI</div>
        </div>
        <div class="withdrawal-btn">
          <CButton
            :loading="loading"
            @click.stop="handleWithdrawal"
            :disabled="disabled"
            >划转</CButton
          >
        </div>
      </div>
    </div>
  </van-overlay>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import CInput from "@/components/c-input.vue";
import { postTransfer, getWithdrawalNeedINI } from "@/api/assets";
import { getAssetDetail } from "@/api/trade";
import { useI18n } from "vue-i18n";
import BigNumber from "bignumber.js";
import {useDebounceFn} from "@vueuse/core"
const { t } = useI18n();
const show = defineModel("show", { default: false });
const emit = defineEmits(["refresh"]);
const value = ref("");
const loading = ref(false);
const expectedIni = ref(0);
const balance = ref(0);
const balanceIni = ref(0);
const disabled = computed(() => {
  return !value.value || !expectedIni.value;
});
const {  assetType } = defineProps({
  assetType: {
    default: 1,
    type: Number,
  },
});
const handleClose = () => {
  show.value = false;
};
const handleMaxNum = () => {
  value.value = balance.value;
  handleUpdateValue(value.value)
};
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
      balanceIni.value = iniRes.data.balance;
      loadinbgToast.close();
    } else {
      balance.value = 0;
    }
  },
  {
    immediate: true,
  }
);
const handleWithdrawal = async () => {
  try {
    loading.value = true;
    const res = await postTransfer({
      outNum: value.value,
      assetType
    });
    showToast({
      message: res.msg,
      duration: 1000,
      onClose: () => {
        show.value = false;
        emit("refresh");
      }
    })
  } catch (error) {
  } finally {
    loading.value = false;
  }
};
const handleUpdateValue = useDebounceFn(async (val) => {
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
      margin-top: 20px;
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
