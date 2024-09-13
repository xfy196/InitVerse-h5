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
          :type="passwordVisible ? 'text' : 'password'"
          :border="false"
          :placeholder="$t('register.confirmPassword')"
          v-model:value.trim="confirmPassword"
        >
          <template #right-icon>
            <van-icon
              :name="passwordVisible ? 'eye-o' : 'closed-eye'"
              @click="passwordVisible = !passwordVisible"
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
              <van-count-down format="sss" :time="countDownTime" />{{
                $t("register.afterGetCode")
              }}
            </div>
          </template>
        </c-input>

        <div class="submit-btn-container">
          <!-- <van-button class="submit-btn" round type="primary"> 提交 </van-button> -->
          <CButton @click="handleSubmit" :disabled="validate">
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
const router = useRouter();
const passwordVisible = ref(true);
const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const shareCode = useStorage("inviteCode", '');
const email = ref("");
const emailCode = ref("");
const countDownTime = ref(0);
const loading = ref(false);

const validate = computed(() => {
  return (
    username.value.length === 0 ||
    password.value.length === 0 ||
    confirmPassword.value.length === 0 ||
    shareCode.value.length === 0 ||
    email.value.length === 0 ||
    emailCode.value.length === 0 ||
    password.value === confirmPassword.value
  );
});
const handleSubmit = async () => {
  if (username.value.length === 0) {
    showToast("请输入用户名");
    return;
  }
  if (password.value.length === 0) {
    showToast("请输入密码");
    return;
  }
  if (confirmPassword.value.length === 0) {
    showToast("请输入确认密码");
    return;
  }
  if (password.value !== confirmPassword.value) {
    showToast("两次密码不一致");
    return;
  }
  if (shareCode.value.length === 0) {
    showToast("请输入邀请码");
    return;
  }
  if (email.value.length === 0) {
    showToast("请输入邮箱");
    return;
  }
  if (!isEmail(email.value)) {
    showToast("邮箱格式不正确");
    return;
  }
  if (emailCode.value.length === 0) {
    showToast("请输入验证码");
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
    showSuccessToast("注册成功");
    router.push("/");
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
    showSuccessToast(res.msg);
    countDownTime.value = 3 * 60 * 1000;
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
