<template>
  <div class="app-download-container">
    <div class="app-download-content">
      <div class="app-download-text">{{ $t("download.title") }}</div>
      <div class="app-download-btn">
        <router-link target="_blank" to="/download">{{ $t("download.btn") }}</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
<style lang="scss" scoped>
.app-download-container {
  padding: 0 30px;
  width: 100%;
  height: 80px;
  background: linear-gradient(215deg, #2b2934 0%, #25283f 40%, #27272b 100%);
  .app-download-content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .app-download-btn {
      min-width: 120px;
      height: 48px;
      display: flex;
      padding: 0 16px;
      justify-content: center;
      align-items: center;
      background: rgba(145, 96, 255, 1);
      border-radius: 18px;
      font-weight: 600;
      a {
        font-size: 24px;
        color: #fff;
      }
    }
    .app-download-text {
      font-size: 24px;
      font-weight: 600;
      color: #aeaec3;
    }
  }
}
</style>
