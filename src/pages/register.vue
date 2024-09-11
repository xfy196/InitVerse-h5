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
          v-model:value="username"
        />
        <c-input
          :label="$t('register.password')"
          :type="passwordVisible ? 'text' : 'password'"
          :border="false"
          clearable
          :placeholder="$t('register.placeholderPassword')"
          v-model:value="password"
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
          v-model:value="confirmPassword"
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
          v-model:value="inviteCode"
        />
        <c-input
          :label="$t('register.email')"
          clearable
          type="email"
          :border="false"
          :placeholder="$t('register.email')"
          v-model:value="email"
        />
        <c-input
          :label="$t('register.code')"
          clearable
          :border="false"
          :placeholder="$t('register.placeholderCode')"
          v-model:value="code"
        >
          <template #button>
            <div v-if="!countDownTime" class="get-code-btn">
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
          <CButton
            @click="handleSubmit"
            :disabled="
              username.length === 0 ||
              password.length === 0 ||
              confirmPassword.length === 0 ||
              inviteCode.length === 0 ||
              email.length === 0 ||
              code.length === 0
            "
          >
            {{ $t("register.submit") }}
          </CButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Head from "@/layout/head.vue";
import { ref, watch } from "vue";
const passwordVisible = ref(true);
const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const inviteCode = ref("");
const email = ref("");
const code = ref("");
const countDownTime = ref(60 * 1000);
const handleSubmit = () => {
  console.log(
    username.value,
    password.value,
    confirmPassword.value,
    inviteCode.value,
    email.value,
    code.value
  );
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
