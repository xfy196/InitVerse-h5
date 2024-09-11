<template>
  <div class="login-container">
    <Head />
    <div class="title">{{ $t("login.welcome") }}</div>
    <div class="form">
      <c-input
        v-model="username"
        :label="$t('login.username')"
        clearable
        :border="false"
        :placeholder="$t('login.placeholderUsername')"
      />
      <c-input
        v-model="password"
        :type="passwordVisible ? 'text' : 'password'"
        :label="$t('login.password')"
        clearable
        :border="false"
        :placeholder="$t('login.password')"
      >
        <template #right-icon>
          <van-icon
            :name="passwordVisible ? 'eye-o' : 'closed-eye'"
            @click="passwordVisible = !passwordVisible"
          />
        </template>
      </c-input>
      <div class="forget-password">
        <div class="forget-password-item">{{ $t("login.forgetPassword") }}</div>
        <router-link class="register-link" to="/register"
          >{{ $t("login.register") }}</router-link
        >
      </div>
      <div class="submit-btn-container">
        <!-- <van-button class="submit-btn" round type="primary"> 提交 </van-button> -->
        <CButton :disabled="username.length === 0 || password.length === 0">
          {{ $t("login.submit") }}
        </CButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import Head from "@/layout/head.vue";
import { ref } from "vue";
const passwordVisible = ref(true);
const username = ref("");
const password = ref("");
</script>
<style lang="scss" scoped>
.login-container {
  height: 100vh;
  background: linear-gradient(215deg, #2b2934 0%, #25283f 40%, #27272b 100%);

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
    height: 582px;
    background: linear-gradient(223deg, #353342 0%, #383b52 100%);
    border-radius: 20px 20px 20px 20px;
    padding: 24px 30px;
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
    .form-item {
      .label {
      }
      .c-input {
      }
    }

    .forget-password {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .forget-password-item {
        font-size: 24px;
        color: #aeaec3;
        line-height: 28px;
      }
      .register-link {
        font-size: 24px;
        line-height: 28px;
        text-align: center;
        background: linear-gradient(90deg, #9160ff 0%, #5e75ff 100%);
        background-clip: text;
        color: transparent; /* 确保文本颜色为透明 */
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
