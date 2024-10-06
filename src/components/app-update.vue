<template>
  <van-overlay v-model:show="show" @click.stop="handleClose">
    <div class="wrapper">
      <div class="form" @click.stop>
        <van-icon name="cross" color="#ffffff" class="close-icon" @click="handleClose" />
        <div class="title">{{ $t("download.AppTitle") }}</div>
        <div class="content">
          <div class="downloadUrl">
            <div class="txt">{{ downloadUrl }}</div>
            <img v-if="isSupported" @click.stop="handleCopy" src="@/assets/images/icons/copy.svg" alt="" />
          </div>
          <CButton @click.stop="handleClickDownApk" class="downloadBtn">
            {{ $t('download.clickDownload') }}
          </CButton>
        </div>
      </div>
    </div>
  </van-overlay>
</template>

<script setup>
import { computed } from "vue";
import { useClipboard } from "@vueuse/core"
import { useI18n } from "vue-i18n";
const show = defineModel("show", { default: false });
const downloadUrl = computed(() => import.meta.env.VITE_APP_DOWNLOAD_URL)
const { isSupported, copy } = useClipboard()
console.log('isSupported', isSupported.value)
const { t } = useI18n()
const handleClose = () => {
  show.value = false;
};
const handleCopy = async () => {
  try {
    await copy(downloadUrl.value)
    showToast({
      message: t("copySuccessText"),
    });
  } catch (error) {
    console.log(error)
  }
}
const handleClickDownApk = () => {
  window.open(downloadUrl.value, '_blank')
}
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

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;

      .downloadUrl {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #ffffff;
        font-size: 28px;
      }

      .downloadBtn {
        margin-top: 48px;
      }
    }

  }
}
</style>
