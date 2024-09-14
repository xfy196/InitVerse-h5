<template>
    <div class="content" @click.stop>
      <van-icon
        @click.stop="handleClose"
        name="cross"
        color="#ffffff"
        class="close-icon"
      />
      <div class="title">交易密码已锁定</div>
      <img class="icon" src="@/assets/images/icons/password-lock.svg" alt="" />
      <div class="tips">
        由于您在1小时内连续输入错误3次交易密码，您的账户已被锁定，请前往个人中心修改交易密码后重试
      </div>
      <CButton @click.stop="handleToMy" class="button">前往</CButton>
    </div>
</template>

<script setup>
import {useRouter} from "vue-router"
const router = useRouter()
const emit = defineEmits(["close"]);
const handleToMy = () => {
  router.push("/my");
};
const handleClose = () => {
  emit("close");
};
</script>
<style lang="scss" scoped>
  .content {
    padding: 30px;
    width: 670px;
    background: linear-gradient(223deg, #353342 0%, #383b52 100%);
    border-radius: 20px 20px 20px 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    }
    .icon {
      width: 100px;
      height: 100px;
      margin: 40px 0 20px 0;
    }
    .tips {
      font-weight: 400;
      font-size: 28px;
      color: #ffffff;
      line-height: 33px;
    }
    .button {
      margin-top: 40px;
    }
  }
</style>
