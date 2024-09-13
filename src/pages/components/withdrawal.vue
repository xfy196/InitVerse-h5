<template>
  <van-overlay v-model:show="show" @click.stop="handleClose">
    <div class="wrapper" >
      <div class="form" @click.stop>
        <van-icon
          name="cross"
          color="#ffffff"
          class="close-icon"
          @click.stop="handleClose"
        />
        <div class="title">USDT提现</div>
        <!-- 余额 -->
        <div class="balance">
          <div class="label">可用余额</div>
          <div class="value">
            200 USDT
            <img src="@/assets/images/icons/power.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </van-overlay>
</template>

<script setup>
defineProps({
  withdrawalType: {
    type: String,
    // 静态提现 动态提现 dynamic
    default: "static",
  },
});
const show = defineModel("show", { default: false });
const handleClose = () => {
  show.value = false;
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
    }
    .balance {
      .label {
      }
      .value {
        img {
        }
      }
    }
  }
}
</style>
