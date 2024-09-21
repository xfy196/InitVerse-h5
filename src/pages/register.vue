<template>
  <div class="register-container">
    <Head />
    <div class="content">
      <div class="title">{{ $t("register.title") }}</div>
      <div class="form">
        <c-input
          :label="$t('register.username')"
          :border="false"
          clearable
          :placeholder="$t('register.placeholderUsername')"
          v-model:value.trim="username"
        />
        <c-input
          :label="$t('register.password')"
          :type="passwordVisible ? 'text' : 'password'"
          :border="false"
          clearable
          :placeholder="$t('register.placeholderPassword')"
          v-model:value.trim="password"
        >
          <template #right-icon>
            <van-icon
              :name="passwordVisible ? 'eye-o' : 'closed-eye'"
              @click="passwordVisible = !passwordVisible"
            />
          </template>
        </c-input>
        <c-input
          :label="$t('register.confirmPassword')"
          clearable
          :type="confirmPasswordVisible ? 'text' : 'password'"
          :border="false"
          :placeholder="$t('register.confirmPassword')"
          v-model:value.trim="confirmPassword"
        >
          <template #right-icon>
            <van-icon
              :name="confirmPasswordVisible ? 'eye-o' : 'closed-eye'"
              @click="confirmPasswordVisible = !confirmPasswordVisible"
            />
          </template>
        </c-input>
        <c-input
          :label="$t('register.inviteCode')"
          clearable
          :border="false"
          :placeholder="$t('register.placeholderInviteCode')"
          v-model:value.trim="shareCode"
        />
        <c-input
          :label="$t('register.email')"
          clearable
          :border="false"
          :placeholder="$t('register.email')"
          v-model:value.trim="email"
        />
        <c-input
          :label="$t('register.code')"
          clearable
          :border="false"
          :maxlength="6"
          :placeholder="$t('register.placeholderCode')"
          v-model:value.trim="emailCode"
        >
          <template #button>
            <div
              v-if="!countDownTime"
              :class="{ disabled: !isEmail(email) }"
              @click="handleGetCode"
              class="get-code-btn"
            >
              {{ $t("register.getCode") }}
            </div>
            <div v-else class="count-down-text">
              <van-count-down @finish="handleCountDownFinish" format="sss" :time="countDownTime" />{{
                $t("register.afterGetCode")
              }}
            </div>
          </template>
        </c-input>

        <div class="submit-btn-container">
          <!-- <van-button class="submit-btn" round type="primary"> 提交 </van-button> -->
          <CButton :loading="loading" @click="handleSubmit" :disabled="validate">
            {{ $t("register.submit") }}
          </CButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Head from "@/layout/head.vue";
import { computed, ref } from "vue";
import { isEmail } from "@/utils/validate";
import { useStorage } from "@vueuse/core";
import { sendEmailGetCode, register } from "@/api/user";
import { showSuccessToast } from "vant";
import { useRouter } from "vue-router";
import {useI18n} from "vue-i18n"
const router = useRouter();
const passwordVisible = ref(false);
const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const confirmPasswordVisible = ref(false);
const shareCode = useStorage("inviteCode", '');
const email = ref("");
const emailCode = ref("");
const countDownTime = ref(0);
const {t} = useI18n()
const loading = ref(false);

const validate = computed(() => {
  console.log(password.value === confirmPassword.value);
  return (
    username.value.length === 0 ||
    password.value.length === 0 ||
    confirmPassword.value.length === 0 ||
    shareCode.value.length === 0 ||
    email.value.length === 0 ||
    emailCode.value.length === 0 ||
    password.value !== confirmPassword.value || !isEmail(email.value)
  );
});

const handleCountDownFinish = () => {
  countDownTime.value = 0;
};
const handleSubmit = async () => {
  if (username.value.length === 0) {
    showToast(t("register.pleaseEnterUsername"));
    return;
  }
  if (password.value.length === 0) {
    showToast(t("register.pleaseEnterPassword"));
    return;
  }
  if (confirmPassword.value.length === 0) {
    showToast(t("register.pleaseEnterConfirmPassword"));
    return;
  }
  if (password.value !== confirmPassword.value) {
    showToast(t("register.passwordNotMatch"));
    return;
  }
  if (shareCode.value.length === 0) {
    showToast(t("register.pleaseEnterInviteCode"));
    return;
  }
  if (email.value.length === 0) {
    showToast(t("register.pleaseEnterEmail"));
    return;
  }
  if (!isEmail(email.value)) {
    showToast(t("register.emailFormatError"));
    return;
  }
  if (emailCode.value.length === 0) {
    showToast(t("register.pleaseEnterCode"));
    return;
  }
  loading.value = true;
  try {
    await register({
      username: username.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
      shareCode: shareCode.value,
      email: email.value,
      emailCode: emailCode.value,
    });
    showSuccessToast(t("register.registerSuccess"));
    router.push("/login");
  } catch (error) {
    console.log("🚀 ~ handleSubmit ~ error:", error);
  } finally {
    loading.value = false;
  }
  console.log(
    username.value,
    password.value,
    confirmPassword.value,
    shareCode.value,
    email.value,
    emailCode.value
  );
};
const handleGetCode = async () => {
  try {
    const res = await sendEmailGetCode({
      type: "REGISTERED",
      email: email.value,
    });
    countDownTime.value =  60 * 1000;
  } catch (error) {
    console.log(error);
  }
};
</script>
<style lang="scss" scoped>
.register-container {
  height: 100vh;
  background: linear-gradient(215deg, #2b2934 0%, #25283f 40%, #27272b 100%);
  display: flex;
  flex-direction: column;

  .content {
    height: calc(100vh - 108px);
    padding-bottom: 24px;
    overflow: auto;
  }
  .title {
    text-align: center;
    font-weight: 500;
    font-size: 34px;
    color: #ffffff;
    line-height: 40px;
  }
  .form {
    width: 702px;
    margin: 0 auto;
    margin-top: 30px;

    background: linear-gradient(223deg, #353342 0%, #383b52 100%);
    border-radius: 20px 20px 20px 20px;
    padding: 24px 30px 40px 30px;

    .form-item {
      .c-input {
        margin-top: 12px;
        margin-bottom: 20px;
      }
      &:first-child {
        .c-input {
          margin-bottom: 30px;
        }
      }

      .label {
        font-size: 30px;
        color: #ffffff;
        line-height: 35px;
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
      margin-top: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      .submit-btn {
        width: 280px;
        height: 70px;
        border: 4px solid #626176;
        background-color: #37394e;
      }
    }
  }
}
</style>
