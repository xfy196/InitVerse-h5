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

        <div class="title">{{ $t("my.setWithdrawalAddress") }}</div>
        <div class="address-type">
          <div class="address-type-text">地址类型</div>
          <van-radio-group
            @change="handleChangeAddressType"
            class="radio-group"
            icon-size="0.48rem"
            checked-color="#5e75ff"
            v-model="withdrawalAddressType"
            direction="horizontal"
          >
            <van-radio name="bsc">BSC</van-radio>
            <van-radio name="tron">Tron</van-radio>
          </van-radio-group>
        </div>
        <c-input
          v-model:value="newAddress"
          :label="$t('my.withdrawalAddress')"
          type="text"
          :placeholder="$t('my.placeholderWithdrawalAddress')"
        />
        <c-input
          v-model:value="code"
          :label="$t('my.code')"
          :placeholder="$t('my.placeholderCode')"
        >
          <template #button>
            <div @click="sendEmail" v-if="!countDownTime" class="get-code-btn">
              {{ $t("my.getCode") }}
            </div>
            <div v-else class="count-down-text">
              <van-count-down
                @finish="handleCountDownFinish"
                format="sss"
                :time="countDownTime"
              />{{ $t("register.afterGetCode") }}
            </div>
          </template>
        </c-input>
        <div class="submit-btn-container">
          <c-button
            :loading="loading"
            @click.stop="handleSubmit"
            :disabled="!code || !newAddress"
            >{{ $t("my.submit") }}</c-button
          >
        </div>
      </div>
    </div>
  </van-overlay>
</template>

<script setup>
import { nextTick, ref, watch } from "vue";
import { sendEmailGetCode } from "@/api/user";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
import CInput from "@/components/c-input.vue";
import { putUserWithdrawalAddress } from "@/api/user";
import { showSuccessToast } from "vant";

const code = ref("");
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
const newAddress = ref("");
const withdrawalAddressType = ref("");
const show = defineModel("show", { default: false });
const countDownTime = ref(0);
const loading = ref(false);
const handleClose = () => {
  show.value = false;
};

const handleCountDownFinish = () => {
  countDownTime.value = 0;
};
const sendEmail = async () => {
  try {
    await sendEmailGetCode({
      type: "MODIFY_WITHDRAWAL_ADDRESS",
    });
    countDownTime.value = 60 * 1000;
  } catch (error) {
    console.log("🚀 ~ sendEmail ~ error:", error);
  }
};
const handleChangeAddressType = (val) => {
  newAddress.value = "";
};
const handleSubmit = async () => {
  try {
    loading.value = true;
    const res = await putUserWithdrawalAddress({
      withdrawalAddress: newAddress.value,
      emailCode: code.value,
      withdrawalAddressType: withdrawalAddressType.value,
    });
    await userStore.updateUserInfo();
    showSuccessToast(res.msg);
    show.value = false;
  } catch (error) {
    console.log("🚀 ~ handleSubmit ~ error:", error);
  } finally {
    loading.value = false;
  }
};
watch(show, (val) => {
  if (val) {
    code.value = "";
    nextTick(() => {
      newAddress.value = userInfo.value.withdrawalAddress;
    });
    withdrawalAddressType.value = userInfo.value.withdrawalAddressType ?? "bsc";
  } else {
    code.value = "";
    nextTick(() => {
      newAddress.value = "";
    });
    withdrawalAddressType.value = "";
  }
});
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
      text-align: center;
      font-size: 32px;
      color: #ffffff;
      line-height: 38px;
      margin-bottom: 20px;
    }
    .address-type {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      margin-bottom: 20px;
      .address-type-text {
        font-size: 30px;
        color: #ffffff;
        line-height: 35px;
      }
      .radio-group {
        margin-top: 12px;
        font-size: 28px;
      }
    }
    .get-code-btn {
      font-size: 24px;
      color: #ffffff;
      line-height: 1;
      background: linear-gradient(90deg, #9160ff 0%, #5e75ff 100%);
      border-radius: 20px 20px 20px 20px;
      padding: 8px 20px;
      &.disabled {
        opacity: 0.5;
      }
    }
    .count-down-text {
      font-size: 26px;
      color: #ffffff;
      line-height: 30px;
      display: flex;
      .van-count-down {
        font-size: 26px;
        color: #ffffff;
        line-height: 30px;
      }
    }
    .submit-btn-container {
      margin-top: 30px;
      display: flex;
      justify-content: center;
      .c-button {
        height: 56px;
      }
    }
  }
}
</style>
