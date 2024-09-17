<template>
  <div class="container">
    <Back />
    <div class="title">{{ title }}</div>
    <van-list v-model:loading="loading" :finished="finished" finished-text="">
      <div class="list" v-if="list.length > 0 && !loading">
        <div class="list-item" v-for="(item, index) in list" :key="index">
          <div class="cell-box">
            <div class="cell">
              <div class="label">{{ $t("orderList.orderNumber") }}</div>
              <div class="right">
                <div class="value">{{ item.nodeOrderNo }}</div>
              </div>
            </div>
            <div class="cell">
              <div class="label">{{ $t("orderList.startTime") }}</div>
              <div class="right">
                <div class="value">{{ item.startTime }}</div>
              </div>
            </div>
            <div class="cell">
              <div class="label">{{ $t("orderList.releaseRate") }}</div>
              <div class="right">
                <div class="value">{{ item.releaseRate }}%/D</div>
              </div>
            </div>
            <div class="cell">
              <div class="label">{{ $t("orderList.computingPowerTotal") }}</div>
              <div class="right">
                <div class="value">
                  {{ new BigNumber(item.total).div(100) }} POR≈{{
                    item.total
                  }}
                  USDT
                </div>
                <img src="@/assets/images/icons/power.svg" alt="" />
              </div>
            </div>
            <div class="cell">
              <div class="label">
                {{ $t("orderList.unreleasedComputingPower") }}
              </div>
              <div class="right">
                <div class="value">
                  {{ new BigNumber(item.notReleased).div(100) }} POR≈{{
                    item.notReleased
                  }}
                  USDT
                </div>
                <img src="@/assets/images/icons/power.svg" alt="" />
              </div>
            </div>
            <div class="cell">
              <div class="label">{{ $t("orderList.endTime") }}</div>
              <div class="right">
                <div class="value">{{ item.endTime }}</div>
              </div>
            </div>
            <div class="cell">
              <div class="label">{{ $t("orderList.status") }}</div>
              <div class="right">
                <div class="status end" v-if="item.nodeStatus === '0'">
                  {{ $t("orderList.completed") }}
                </div>
                <div
                  class="status processing"
                  v-else-if="item.nodeStatus === '1'"
                >
                  {{ $t("orderList.processing") }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-list>

    <van-empty
      v-if="!list.length && !loading"
      class="empty"
      :image="EmptyBg"
      :image-size="['6.32rem', '2.28rem']"
    >
      <template #description>
        <div v-if="type === 'nodeOrder'">{{ $t("orderList.emptyNode") }}</div>
        <div v-else>
          {{ $t("orderList.emptyPower") }}
          <router-link class="empty-link" to="/">{{
            $t("orderList.emptyPowerLink")
          }}</router-link>
        </div>
      </template>
    </van-empty>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import BigNumber from "bignumber.js";
import Back from "@/components/back.vue";
import EmptyBg from "@/assets/images/empty.png";
import { getPowerAllList } from "@/api/rental";
import { useI18n } from "vue-i18n";
import { getAllNodeOrderList, getIniOrderList } from "@/api/assets";
import { useRoute } from "vue-router";
const route = useRoute();
const type = ref(route.query.type ?? "computingPowerOrder");
const { t } = useI18n();
const title = ref(t("orderList.computingPowerOrder"));
const list = ref([]);
const loading = ref(false);
const finished = ref(true);
onBeforeMount(async () => {
  loading.value = true;
  finished.value = false;
  try {
    if (type.value == "nodeOrder") {
      title.value = t("orderList.nodeOrder");
      const res = await getAllNodeOrderList();
      list.value = res.data;
    } else if (type.value === "computingPowerOrder") {
      title.value = t("orderList.computingPowerOrder");
      const res = await getPowerAllList();
      list.value = res.data;
    } else if (type.value === "iniOrder") {
      title.value = t("orderList.iniOrder");
      const res = await getIniOrderList();
      list.value = res.data;
    }
  } catch (error) {
    console.log("🚀 ~ onBeforeMount ~ error:", error);
  } finally {
    loading.value = false;
    finished.value = true;
  }
});
</script>
<style lang="scss" scoped>
.container {
  .title {
    margin-top: 30px;
    font-weight: 500;
    font-size: 34px;
    color: #ffffff;
    line-height: 40px;
    text-align: center;
  }
  .empty {
    margin-top: 120px;
    .empty-link {
      background: linear-gradient(90deg, #9160ff 0%, #5e75ff 100%);
      background-clip: text;
      color: transparent;
    }
  }
  .list {
    padding: 0 30px;
    .list-item {
      margin-top: 30px;
      .cell-box {
        background: linear-gradient(223deg, #353342 0%, #383b52 100%);
        border-radius: 20px 20px 20px 20px;
        padding: 0 30px;
        .cell {
          height: 90px;
          font-weight: 400;
          font-size: 28px;
          color: #ffffff;
          line-height: 33px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #27272b;

          .right {
            display: flex;
            align-items: center;
            img {
              margin-left: 8px;
              width: 40px;
              height: 40px;
            }
            .status {
              padding: 4px 20px;
              color: #ffffff;
              border-radius: 8px 8px 8px 8px;
              &.end {
                background: #626176;
              }
              &.processing {
                background: #00c377;
              }
            }
          }
        }

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
