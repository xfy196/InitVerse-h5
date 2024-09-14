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
        <div class="title">{{ $t("transferAccount.title") }}</div>
        <div class="input-box">
          <CInput
            :label="$t('transferAccount.passwordLabel')"
            :type="passwordVisible ? 'text' : 'password'"
            :placeholder="$t('transferAccount.passwordPlaceholder')"
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
            label="To:"
            :placeholder="$t('transferAccount.uidPlaceholder')"
            v-model:value="transferUid"
          >
          </CInput>
        </div>
        <div class="input-box">
          <CInput
            :label="$t('transferAccount.numLabel')"
            :placeholder="$t('transferAccount.numPlaceholder')"
            v-model:value="value"
            type="digit"
            :border="false"
            clearable
          >
            <template #button>
              <div @click.stop="handleMaxNum" class="max">Max</div>
            </template>
            <template #unit>
              <div class="unit">INI</div>
            </template>
          </CInput>
        </div>
        <div class="expected">
          <div class="left">{{ $t("transferAccount.balanceLabel") }}</div>
          <div class="right van-ellipsis">200 INI</div>
        </div>
        <div class="withdrawal-btn">
          <CButton @click.stop="handleWithdrawal" :disabled="disabled"
            >{{ $t("transferAccount.withdrawalBtn") }}</CButton
          >
        </div>
      </div>
      <PasswordLock v-else @close="handleClose" />
    </div>
  </van-overlay>
</template>

<script setup>
import { computed, ref } from "vue";
import CInput from "@/components/c-input.vue";
import PasswordLock from "./password-lock.vue";
import { transferAccount } from "@/api/assets";
const show = defineModel("show", { default: false });
const value = ref("");
const safePassword = ref("");
const passwordVisible = ref(false);
const passwordLock = ref(false);
const transferUid = ref("");
const disabled = computed(() => {
  return !value.value || !safePassword.value;
});

const handleClose = () => {
  show.value = false;
};
const handleMaxNum = () => {
  value.value = 200;
};
const handleWithdrawal = async () => {
  try {
    await transferAccount({
      outNum: value.value,
      transferUid: transferUid.value,
      safePwd: safePassword.value,
    });
    show.value = false;
  } catch (error) {
    console.log("🚀 ~ handleWithdrawal ~ error:", error);
  }
};
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
