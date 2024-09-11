<template>
    <div class="layout-container">
      <Head />
      <div class="main">
        <RouterView />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import Head from "./head.vue";
  </script>
  <style lang="scss" scoped>
  .layout-container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: linear-gradient( 215deg, #2B2934 0%, #25283F 40%, #27272B 100%);
    .main {
      padding-bottom: 16px;
      flex: 1;
      box-sizing: border-box;
      overflow: auto;
    }
  }
  </style>
  