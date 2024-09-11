<template>
  <van-overlay v-model:show="show" @click="handleClose">
    <div class="wrapper">
      <div class="form">
        <van-icon name="cross" color="#ffffff" class="close-icon" @click="handleClose" />
        <div class="title">{{ $t("my.setTransactionPassword") }}</div>
        <c-input
          v-model:value="newPassword"
          :label="$t('my.transactionPassword')"
          type="password"
          :placeholder="$t('my.placeholderTransactionPassword')"
        />
        <c-input
          v-model:value="code"
          :label="$t('my.code')"
          :placeholder="$t('my.placeholderCode')"
        >
          <template #button>
            <div v-if="!countDownTime" class="get-code-btn">
              {{ $t("my.getCode") }}
            </div>
            <div v-else class="count-down-text">
              <van-count-down format="sss" :time="countDownTime" />{{
                $t("my.afterGetCode")
              }}
            </div>
          </template>
        </c-input>
        <div class="submit-btn-container">
          <c-button @click="handleSubmit" :disabled="!code || !newPassword">{{
            $t("my.submit")
          }}</c-button>
        </div>
      </div>
    </div>
  </van-overlay>
</template>

<script setup>
import { ref, watch } from "vue";
import CInput from "@/components/c-input.vue";
const { password } = defineProps({
  password: {
    type: String,
    default: "",
  },
});

const code = ref("");
const newPassword = ref("");
const show = defineModel("show", { default: false });
const countDownTime = ref(60 * 1000);
const handleClose = () => {
  show.value = false;
};
const handleSubmit = () => {
  console.log(code.value, newPassword.value);
  show.value = false;
};
watch(show, (val) => {
  if (val) {
    code.value = "";
    newPassword.value = password;
  } else {
    newPassword.value = "";
    code.value = "";
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
    .close-icon{
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
    .get-code-btn {
      font-size: 24px;
      color: #ffffff;
      line-height: 1;
      background: linear-gradient(90deg, #9160ff 0%, #5e75ff 100%);
      border-radius: 20px 20px 20px 20px;
      padding: 8px 20px;
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
