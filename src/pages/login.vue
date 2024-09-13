<template>
  <div class="login-container">
    <Head />
    <div class="title">{{ $t("login.welcome") }}</div>
    <div class="form">
      <c-input
        v-model:value="username"
        :label="$t('login.username')"
        clearable
        :border="false"
        :placeholder="$t('login.placeholderUsername')"
      />
      <c-input
        v-model:value="password"
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
        <div class="forget-password-item" @click.stop="handleForgetPassword">
          {{ $t("login.forgetPassword") }}
        </div>
        <router-link class="register-link" to="/register">{{
          $t("login.register")
        }}</router-link>
      </div>
      <div class="submit-btn-container">
        <CButton :loading="loading" @click.stop="handleSubmit" :disabled="validate">
          {{ $t("login.submit") }}
        </CButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import Head from "@/layout/head.vue";
import { computed, ref } from "vue";
import { useUserStore } from "../stores/user";
import { login } from "@/api/user";
import { useRouter } from "vue-router";
import { showSuccessToast } from "vant";
import {getUserInfo} from "@/api/user"
const passwordVisible = ref(true);
const username = ref("");
const password = ref("");
const userStore = useUserStore();
const router = useRouter();
const loading = ref(false);
const validate = computed(() => {
  return username.value.length === 0 || password.value.length == 0;
});
const handleForgetPassword = () => {
  router.push("/forget");
};
const handleSubmit = async () => {
  if (username.value.length === 0) {
    showToast("请输入用户名");
    return;
  }
  if (password.value.length === 0) {
    showToast("请输入密码");
    return;
  }
  try {
    loading.value = true;
    const res = await login({
      username: username.value,
      password: password.value,
    });
    userStore.setToken(res.token);
    const userData = await getUserInfo();
    userStore.setUserInfo(userData.userInfo);
    showSuccessToast("登录成功");
    router.push("/");
  } catch (error) {
    console.log("🚀 ~ handleSubmit ~ error:", error);
  } finally {
    loading.value = false;
  }
};
</script>
<style lang="scss" scoped>
.login-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
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
