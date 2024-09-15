<template>
  <div class="container">
    <Back />
    <div class="title">{{ $t("retanlRecords.title") }}</div>
    <div class="lists" v-if="lists.length > 0">
      <template v-for="item in lists" :key="item.userPowerId">
        <div class="list-item">
          <div class="cell">
            <div class="cell-title">{{ $t("retanlRecords.rentalTime") }}</div>
            <div class="cell-right">
              <div class="cell-right-text van-ellipsis">
                {{ item.createTime }}
              </div>
            </div>
          </div>
          <div class="cell">
            <div class="cell-title">{{ $t("retanlRecords.rentalNumber") }}</div>
            <div class="cell-right">
              <div class="cell-right-text van-ellipsis">
                {{ item.total }}
              </div>
              <div class="cell-right-icon">
                <img
                  class="icon"
                  src="@/assets/images/icons/power.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="cell">
            <div class="cell-title">{{ $t("retanlRecords.getPower") }}</div>
            <div class="cell-right van-ellipsis">
              <div class="por">
                <div class="por-to-usdt">
                  ({{ $t("retanlRecords.value") }}:
                  {{
                    BigNumber(item.total).multipliedBy(
                      config.maximumReturnMultiplier
                    )
                  }}USDT)
                </div>
                <div class="">
                   {{ BigNumber(item.total).div(100).toFixed(1) }}
                  POR
                </div>
              </div>
            </div>
          </div>
          <div class="cell">
            <div class="cell-title">{{ $t("retanlRecords.getINI") }}</div>
            <div class="cell-right">
              <div class="ini-to-usdt van-ellipsis">{{ item.coinNum }} INI</div>
              <div class="ini-to-usdt-icon">
                <img class="icon" src="@/assets/images/icons/ini.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <van-empty
      v-else
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
import { useDateFormat } from "@vueuse/core";
import Back from "../components/back.vue";
import { getPowerInEffect, getRentingPowerSetting } from "@/api/rental";

import BigNumber from "bignumber.js";
const lists = ref([]);
const config = ref({
  maximumReturnMultiplier: 2,
});
onBeforeMount(async () => {
  try {
    const res = await getPowerInEffect();
    const settingRes = await getRentingPowerSetting();
    config.value = settingRes.data;
    console.log("🚀 ~ onBeforeMount ~ res:", res);
    lists.value = res.data;
  } catch (error) {
    console.log("🚀 ~ onBeforeMount ~ error:", error);
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
