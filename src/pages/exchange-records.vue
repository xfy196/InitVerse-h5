<template>
  <div class="container">
    <Back />
    <div class="title">{{ $t("exchangeRecords.title") }}</div>
    <van-list v-model:loading="loading" :finished="finished" finished-text="">
      <div class="lists" v-if="list.length > 0 && !loading">
        <template v-for="(item, index) in list" :key="index">
          <div class="list-item">
            <div class="cell">
              <div class="cell-title">
                {{ $t("exchangeRecords.exchangeTime") }}
              </div>
              <div class="cell-right">
                <div class="cell-right-text van-ellipsis">
                  {{ item.createTime }}
                </div>
              </div>
            </div>
            <div class="cell">
              <div class="cell-title">
                {{ $t("exchangeRecords.exchangeNumber") }}
              </div>
              <div class="cell-right">
                <div class="cell-right-text van-ellipsis">
                  {{ item.coinNum }} INI
                </div>
                <div class="cell-right-icon">
                  <img
                    class="icon"
                    src="@/assets/images/icons/ini.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div class="cell">
              <div class="cell-title">
                {{ $t("exchangeRecords.exchangeRate") }}
              </div>
              <div class="cell-right van-ellipsis">
                <div class="por">1 INI = {{ item.price }} USDT</div>
              </div>
            </div>
            <div class="cell">
              <div class="cell-title">
                {{ $t("exchangeRecords.exchangeINI") }}
              </div>
              <div class="cell-right">
                <div class="ini-to-usdt van-ellipsis">
                  {{ item.swapU }} USDT
                </div>
                <div class="ini-to-usdt-icon">
                  <img
                    class="icon"
                    src="@/assets/images/icons/power.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </van-list>

    <van-empty
      v-if="!list.length && !loading"
      class="empty"
      :image="EmptyBg"
      :image-size="['6.32rem', '2.28rem']"
      :description="$t('retanlRecords.empty')"
    />
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import EmptyBg from "@/assets/images/empty.png";
import { getExchangeRecords } from "@/api/trade";
import Back from "../components/back.vue";
const list = ref([]);
const loading = ref(false);
const finished = ref(true);
onBeforeMount(async () => {
  try {
    loading.value = true;
    finished.value = false;
    const res = await getExchangeRecords();
    list.value = res.rows;
  } catch (error) {
    console.log("🚀 ~ onMounted ~ error:", error);
  } finally {
    loading.value = false;
    finished.value = true;
  }
});
</script>
<style lang="scss" scoped>
.container {
  .title {
    font-weight: 500;
    font-size: 34px;
    color: #ffffff;
    line-height: 40px;
    text-align: center;
    margin-top: 30px;
  }
  .empty {
    margin-top: 120px;
  }
  .lists {
    padding: 0 30px;
    .list-item {
      margin-top: 30px;
      width: 690px;
      background: linear-gradient(223deg, #353342 0%, #383b52 100%);
      border-radius: 20px 20px 20px 20px;
      padding: 0 30px;
      .cell {
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 400;
        font-size: 28px;
        color: #ffffff;
        line-height: 33px;
        border-bottom: 2px solid rgba(39, 39, 43, 1);
        &:last-child {
          border-bottom: none;
        }
        .cell-title {
          flex: 1;
        }
        .cell-right {
          display: flex;
          flex: 2;
          align-items: center;
          justify-content: flex-end;
          .icon {
            margin-left: 8px;
            width: 40px;
            height: 40px;
          }
          .por {
            display: flex;
            align-items: center;
            .por-to-usdt {
              font-weight: 400;
              font-size: 26px;
              color: #aeaec3;
              margin-right: 8px;
            }
          }
        }
      }
    }
  }
}
</style>
