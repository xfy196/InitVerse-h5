<template>
  <div class="forget-container">
    <Head />
    <div class="content">
      <div class="title">{{ $t("forget.title") }}</div>
      <div class="form">
        <c-input
          :label="$t('forget.username')"
          :border="false"
          clearable
          :placeholder="$t('forget.placeholderUsername')"
          v-model:value="username"
        />
        <c-input
          :label="$t('forget.email')"
          clearable
          type="email"
          :border="false"
          :placeholder="$t('forget.placeholderEmail')"
          v-model:value="email"
        />

        <c-input
          :label="$t('forget.code')"
          clearable
          :border="false"
          :placeholder="$t('forget.placeholderCode')"
          v-model:value="code"
        >
          <template #button>
            <div v-if="!countDownTime" class="get-code-btn">
              {{ $t("forget.getCode") }}
            </div>
            <div v-else class="count-down-text">
              <van-count-down format="sss" :time="countDownTime" />{{
                $t("forget.afterGetCode")
              }}
            </div>
          </template>
        </c-input>
        <c-input
          :label="$t('forget.password')"
          :type="passwordVisible ? 'text' : 'password'"
          :border="false"
          clearable
          :placeholder="$t('forget.placeholderPassword')"
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
          :label="$t('forget.confirmPassword')"
          clearable
          :type="passwordVisible ? 'text' : 'password'"
          :border="false"
          :placeholder="$t('forget.confirmPassword')"
          v-model:value="confirmPassword"
        >
          <template #right-icon>
            <van-icon
              :name="confirmPasswordVisible ? 'eye-o' : 'closed-eye'"
              @click="confirmPasswordVisible = !confirmPasswordVisible"
            />
          </template>
        </c-input>

        <div class="submit-btn-container">
          <!-- <van-button class="submit-btn" round type="primary"> 提交 </van-button> -->
          <CButton @click="handleSubmit" :disabled="validate">
            {{ $t("forget.submit") }}
          </CButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Head from "@/layout/head.vue";
import { ref } from "vue";
const passwordVisible = ref(true);
const confirmPasswordVisible = ref(true);
const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const email = ref("");
const code = ref("");
const countDownTime = ref(60 * 1000);
const validate = computed(() => {
  return (
    username.value.length === 0 ||
    password.value.length === 0 ||
    confirmPassword.value.length === 0 ||
    email.value.length === 0 ||
    code.value.length === 0
  );
});
const handleSubmit = () => {
  console.log(
    username.value,
    password.value,
    confirmPassword.value,
    email.value,
    code.value
  );
};
</script>
<style lang="scss" scoped>
.forget-container {
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
