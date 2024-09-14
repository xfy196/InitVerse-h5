<template>
  <div class="container">
    <div class="title">{{ $t("assets.title") }}</div>
    <div class="content">
      <div class="list">
        <div class="list-item">
          <div class="head">
            <div class="title">{{ $t("assets.computingPowerOrder") }}</div>
            <img src="@/assets/images/icons/tab1-active.svg" alt="" />
          </div>
          <template v-for="(item, index) in powerAssets" :key="index">
            <div class="cell-box">
              <div class="cell">
                <div class="label">{{ $t("assets.orderNumber") }}</div>
                <div class="right">
                  <div class="value">{{ item.nodeOrderNo }}</div>
                </div>
              </div>
              <div class="cell">
                <div class="label">{{ $t("assets.startTime") }}</div>
                <div class="right">
                  <div class="value">{{ item.startTime }}</div>
                </div>
              </div>
              <div class="cell">
                <div class="label">{{ $t("assets.releaseRate") }}</div>
                <div class="right">
                  <div class="value">{{ item.releaseRate }}%/D</div>
                </div>
              </div>
              <div class="cell">
                <div class="label">{{ $t("assets.computingPowerTotal") }}</div>
                <div class="right">
                  <div class="value">
                    {{ item.total / 100 }} POR≈{{ item.total }} USDT
                  </div>
                  <img src="@/assets/images/icons/power.svg" alt="" />
                </div>
              </div>
              <div class="cell">
                <div class="label">
                  {{ $t("assets.unreleasedComputingPower") }}
                </div>
                <div class="right">
                  <div class="value">
                    {{ item.notReleased / 100 }} POR≈{{ item.notReleased }} USDT
                  </div>
                  <img src="@/assets/images/icons/power.svg" alt="" />
                </div>
              </div>
              <div class="cell">
                <div class="label">{{ $t("assets.status") }}</div>
                <div class="right">
                  <div class="status">{{ $t("assets.processing") }}</div>
                </div>
              </div>
            </div>
            <div
              @click.stop="handleToOrderList('computingPowerOrder')"
              class="show-all"
            >
              <div class="text">{{ $t("assets.showAll") }}</div>
              <van-icon name="arrow-down" />
            </div>
          </template>
        </div>
      </div>

      <!-- 节点订单 -->
      <div class="list">
        <div class="list-item">
          <div class="head">
            <div class="title">{{ $t("assets.nodeOrder") }}</div>
            <img src="@/assets/images/icons/tab2-active.svg" alt="" />
          </div>
          <template v-for="(item, index) in nodeAssets" :key="index">
            <div class="cell-box">
              <div class="cell">
                <div class="label">{{ $t("assets.orderNumber") }}</div>
                <div class="right">
                  <div class="value">{{ item.nodeOrderNo }}</div>
                </div>
              </div>
              <div class="cell">
                <div class="label">{{ $t("assets.startTime") }}</div>
                <div class="right">
                  <div class="value">{{ item.startTime }}</div>
                </div>
              </div>
              <div class="cell">
                <div class="label">{{ $t("assets.releaseRate") }}</div>
                <div class="right">
                  <div class="value">{{ item.releaseRate }}%/D</div>
                </div>
              </div>
              <div class="cell">
                <div class="label">{{ $t("assets.computingPowerTotal") }}</div>
                <div class="right">
                  <div class="value">
                    {{ item.total / 100 }} POR≈{{ item.total }} USDT
                  </div>
                  <img src="@/assets/images/icons/power.svg" alt="" />
                </div>
              </div>
              <div class="cell">
                <div class="label">
                  {{ $t("assets.unreleasedComputingPower") }}
                </div>
                <div class="right">
                  <div class="value">
                    {{ item.notReleased / 100 }} POR≈{{ item.notReleased }} }}
                    USDT
                  </div>
                  <img src="@/assets/images/icons/power.svg" alt="" />
                </div>
              </div>
              <div class="cell">
                <div class="label">{{ $t("assets.status") }}</div>
                <div class="right">
                  <div class="status">{{ $t("assets.processing") }}</div>
                </div>
              </div>
            </div>
            <div @click.stop="handleToOrderList('nodeOrder')" class="show-all">
              <div class="text">{{ $t("assets.showAll") }}</div>
              <van-icon name="arrow-down" />
            </div>
          </template>
        </div>
      </div>

      <!-- 各类资产 -->
      <div class="assets-list">
        <div
          class="assets-item"
          v-for="(item, index) in rechargeAssets"
          :key="index"
        >
          <div class="assets-item-head">
            <div class="assets-item-title">
              {{ $t("assets.rechargeAssets") }}
            </div>
          </div>
          <div class="assets-item-body">
            <div class="assets-value cell-item">
              <div class="left">
                <img src="@/assets/images/icons/power.svg" alt="" />
                <div class="coin">{{ item.coinName.toUpperCase() }}</div>
              </div>

              <div class="right">
                <div class="value" v-if="![4, 5].includes(item.assetType)">
                  {{ item.balance }}
                </div>
                <div class="value" v-else>
                  {{ rechargeAssets[3].balance + rechargeAssets[4].balance }}
                </div>
                <div class="unit">{{ item.coinName.toUpperCase() }}</div>
              </div>
            </div>

            <div class="btns cell-item">
              <CButton @click="handleToRecharge">{{
                $t("assets.recharge")
              }}</CButton>
              <CButton @click="handleShowWithdrawal(item.assetType)">{{
                $t("assets.withdrawal")
              }}</CButton>
            </div>
            <div class="tips cell-item">
              <div class="tip">
                {{ $t("assets.fee") }}: 5%{{ $t("assets.withdrawalCount") }} INI
              </div>
            </div>
          </div>
        </div>
        <div class="computing-power-assets">
          <div
            class="assets-item"
            v-for="(item, index) in computingPowerAssets"
            :key="index"
          >
            <div class="assets-item-head" v-if="index === 0">
              <div class="assets-item-title">
                <div class="left">{{ $t("assets.computingPowerAssets") }}</div>
                <div @click.stop="handleToAssetsDetail" class="right">
                  {{ $t("assets.assetDetails") }}
                  <img src="@/assets/images/icons/record.svg" alt="" />
                </div>
              </div>
            </div>
            <div class="assets-item-body">
              <div v-if="item.assetType != 5" class="assets-value cell-item">
                <div class="left">
                  <img
                    v-if="item.assetType === 2 || item.assetType === 3"
                    src="@/assets/images/icons/power.svg"
                    alt=""
                  />
                  <img v-else src="@/assets/images/icons/ini.svg" alt="" />
                  <div class="coin">
                    <span v-if="item.assetType == 2">
                      {{ item.coinName.toUpperCase() }}
                      {{ $t("assets.static") }}
                    </span>
                    <span v-else-if="item.assetType == 3">
                      {{ item.coinName.toUpperCase() }}
                      {{ $t("assets.dynamic") }}
                    </span>
                    <span v-else>{{ item.coinName.toUpperCase() }}</span>
                  </div>
                </div>

                <div class="right">
                  <div class="value">{{ item.balance }}</div>
                  <div class="unit">
                    {{ item.coinName.toUpperCase() }}
                  </div>
                </div>
              </div>
              <div
                v-if="item.assetType == 4 || item.assetType == 5"
                class="status cell-item"
              >
                <div class="left">
                  <img
                    v-if="item.assetType == 4"
                    src="@/assets/images/icons/unlock.svg"
                    alt=""
                  />
                  <img
                    v-if="item.assetType == 5"
                    src="@/assets/images/icons/lock.svg"
                    alt=""
                  />
                  <div v-if="item.assetType == 4" class="text">
                    {{ $t("assets.unlock") }}
                  </div>
                  <div v-if="item.assetType == 5" class="text">
                    {{ $t("assets.lock") }}
                  </div>
                </div>
                <div class="right">
                  <div class="value">{{ item.balance }}</div>
                  <div class="unit">{{ item.coinName.toUpperCase() }}</div>
                </div>
              </div>
              <!-- 锁定的展示 -->
              <div
                v-if="item.lockAssetType == 1 && item.assetType == 5"
                class="lock-box cell-item"
              >
                <div class="left">
                  {{ $t("assets.currentReleaseRate") }}: 150 INI/{{
                    $t("assets.day")
                  }}
                </div>
                <div class="right">{{ $t("assets.lockCount") }}:3</div>
              </div>
              <div
                v-if="item.assetType != 5"
                :style="{
                  'justify-content': [2, 3].includes(item.assetType)
                    ? 'center'
                    : 'space-between',
                }"
                class="btns cell-item"
              >
                <template v-if="[2, 3, 4].includes(item.assetType)">
                  <CButton @click="handleShowWithdrawal(item.assetType)">{{
                    [2, 3].includes(item.assetType)
                      ? $t("assets.withdrawal")
                      : $t("assets.transfer")
                  }}</CButton>
                  <CButton
                    @click="handleFlashExchange"
                    v-if="item.assetType == 4"
                  >
                    {{ $t("assets.flashExchange") }}
                  </CButton>
                </template>
              </div>
              <div v-if="item.assetType != 4" class="tips cell-item">
                <div class="tip">
                  {{ $t("assets.fee") }}: 5%{{ $t("assets.withdrawalCount") }}
                  {{ $t("assets.value") }}
                  INI
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Withdrawal
      v-if="showWithdrawal"
      :withdrawalType="withdrawalType"
      v-model:show="showWithdrawal"
    />
    <TransferAccount
      v-if="showTransferAccount"
      v-model:show="showTransferAccount"
    />
  </div>
</template>

<script setup>
import { getAssets } from "@/api/assets";
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import Withdrawal from "./components/withdrawal.vue";
import TransferAccount from "./components/transfer-account.vue";
import { getIneffectNodeOrderList } from "@/api/assets";
import { useI18n } from "vue-i18n";
import { closeToast } from "vant";
const router = useRouter();
const { t } = useI18n();
const withdrawalType = ref("");
const rechargeAssets = ref([]);
const computingPowerAssets = ref([]);
const powerAssets = ref([]);
const nodeAssets = ref([]);
const showWithdrawal = ref(false);
const showTransferAccount = ref(false);
const handleToOrderList = (type) => {
  router.push({
    path: "/order-list",
    query: {
      type,
    },
  });
};
onMounted(async () => {
  try {
    const loadingToast = showLoadingToast({
      message: t("loadingText"),
      duration: 0,
    });
    const res = await getAssets();
    rechargeAssets.value = res.data.slice(0, 1);
    computingPowerAssets.value = res.data.slice(1, res.data.length);
    const nodeRes = await getIneffectNodeOrderList();
    loadingToast.close();
    nodeAssets.value = nodeRes.data;
  } catch (error) {
    console.log("🚀 ~ onMounted ~ error:", error);
  }
});
const handleToRecharge = () => {
  router.push("/recharge");
};
const handleToAssetsDetail = () => {
  router.push("/assets-detail");
};
const handleShowWithdrawal = (type) => {
  console.log("🚀 ~ handleShowWithdrawal ~ type:", type);
  if (type === 2 || type === 3 || type === 1) {
    if (type === 2) {
      withdrawalType.value = "static";
    } else if (type === 3) {
      withdrawalType.value = "dynamic";
    } else {
      withdrawalType.value = "";
    }
    showWithdrawal.value = true;
  } else if (type === 4) {
    showTransferAccount.value = true;
  }
};
const handleFlashExchange = () => {
  // 闪兑
  router.push("/transaction");
};
onUnmounted(() => {
  closeToast();
});
</script>
<style lang="scss" scoped>
.container {
  padding: 0 30px 30px;
  box-sizing: border-box;
  .title {
    font-weight: 500;
    font-size: 34px;
    color: #ffffff;
    text-align: center;
    line-height: 40px;
  }
  .content {
    .list {
      margin-top: 30px;
      &:first-child {
        margin-top: 0;
      }
      .list-item {
        margin: top 30px;
        .head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 76px;
          .title {
            font-weight: 500;
            font-size: 32px;
            color: rgba(255, 255, 255, 0.2);
            line-height: 38px;
            text-align: left;
            background: linear-gradient(90deg, #9160ff 0%, #5e75ff 100%);
            background-clip: text;
            color: transparent; /* 确保文本颜色为透明 */
          }
        }
        .cell-box {
          background: linear-gradient(223deg, #353342 0%, #383b52 100%);
          border-radius: 20px 20px 20px 20px;
          padding: 0 30px;
          margin-top: 20px;
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

            .label {
            }
            .right {
              display: flex;
              align-items: center;
              .value {
              }
              img {
                margin-left: 8px;
                width: 40px;
                height: 40px;
              }
              .status {
                padding: 4px 20px;
                background-color: #00c377;
                color: #ffffff;
                border-radius: 8px 8px 8px 8px;
              }
            }
          }

          &:last-child {
            border-bottom: none;
          }
        }
        .show-all {
          font-weight: 400;
          font-size: 24px;
          color: #aeaec3;
          line-height: 28px;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
          .text {
            margin-right: 10px;
          }
        }
      }
    }
    .assets-list {
      margin-top: 30px;
      .computing-power-assets {
        background: linear-gradient(223deg, #353342 0%, #383b52 100%);
        border-radius: 20px 20px 20px 20px;
        overflow: hidden;
        padding: 0 30px;
        margin-top: 30px;
        .assets-item {
          &:nth-child(1) {
            .assets-item-body {
              margin-top: 30px !important;
            }
          }
          .assets-item-body {
            margin-top: 0 !important;
            .cell-item {
              &:first-child {
                margin-top: 0;
              }
            }
          }
        }
        .assets-item {
          background-color: inherit;
          border-radius: 0;
          padding: 30px 0;
          border-bottom: 2px solid #27272b;
          .assets-item-head {
            .assets-item-title {
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .right {
                display: flex;
                align-items: center;
                font-weight: 400;
                font-size: 28px;
                color: #aeaec3;
                line-height: 33px;
                img {
                  margin-left: 12px;
                  width: 36px;
                  height: 36px;
                }
              }
            }
          }
          &:last-child {
            border-bottom: none;
          }
        }
      }
      .assets-item {
        padding: 30px;

        border-radius: 20px 20px 20px 20px;
        .assets-item-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .assets-item-title {
            font-weight: 600;
            font-size: 40px;
            color: #ffffff;
            line-height: 47px;
          }
        }
        .assets-item-body {
          margin-top: 30px;
          .cell-item {
            margin-top: 30px;
          }
          .assets-value {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left {
              align-items: center;
              display: flex;
              img {
                width: 40px;
                height: 40px;
                margin-right: 12px;
              }
              .coin {
                font-weight: 400;
                font-size: 28px;
                color: #ffffff;
                line-height: 33px;
              }
            }
            .right {
              font-weight: 400;
              font-size: 28px;
              color: #ffffff;
              line-height: 33px;
              display: flex;
              .value {
              }
              .unit {
                margin-left: 8px;
              }
            }
          }
          .status {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left {
              display: flex;
              align-items: center;
              img {
                width: 40px;
                height: 40px;
                margin-right: 8px;
              }
              .text {
                font-weight: 400;
                font-size: 28px;
                color: #ffffff;
                line-height: 33px;
              }
            }
            .right {
              display: flex;
              align-items: center;
              font-weight: 400;
              font-size: 28px;
              color: #ffffff;
              line-height: 33px;
              .value {
              }
              .unit {
                margin-left: 8px;
              }
            }
          }
          .lock-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left {
              display: flex;
              align-items: center;
              font-weight: 400;
              font-size: 24px;
              color: #aeaec3;
              line-height: 28px;
            }
            .right {
              font-weight: 400;
              font-size: 24px;
              color: #aeaec3;
              line-height: 28px;
            }
          }
          .btns {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .tips {
            display: flex;
            justify-content: center;
            align-items: center;
            .tip {
              font-weight: 400;
              font-size: 24px;
              color: #aeaec3;
              line-height: 28px;
              margin-top: 8px;
              &:first-child {
                margin-top: 0;
              }
            }
          }
        }
        &:first-child {
          background: linear-gradient(223deg, #353342 0%, #383b52 100%);
        }
      }
    }
  }
}
</style>
