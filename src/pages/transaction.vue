<template>
  <div class="container">
    <div class="header">
      <div class="top">
        <div class="left van-ellipsis">{{ iniData.price }}</div>
        <div class="right">{{ $t("transaction.priceTrend") }}</div>
      </div>
      <div class="bottom">
        <div class="left">
          <div>
            <img src="@/assets/images/icons/ini.svg" alt="" />
            <span>/</span>
            <img src="@/assets/images/icons/power.svg" alt="" />
          </div>
          <div class="proportion">
            {{ iniData.price }}&nbsp;(+{{ iniData.chg }}%)
          </div>
        </div>
        <div class="right">{{ $t("transaction.onlyINI") }}</div>
      </div>
    </div>
    <div
      @touchmove.stop.prevent="() => {}"
      @touchstart.stop.prevent="() => {}"
      class="chart"
      ref="chartRef"
    ></div>
    <div class="currency-box">
      <div class="head">
        <van-row>
          <van-col span="8">
            <div class="cell">{{ $t("transaction.name") }}</div>
          </van-col>
          <van-col span="8">
            <div style="justify-content: center" class="cell">
              {{ $t("transaction.price") }}
            </div>
          </van-col>
          <van-col span="8">
            <div style="justify-content: flex-end" class="cell">
              {{ $t("transaction.change") }}
            </div>
          </van-col>
        </van-row>
        <div class="currency-list">
          <van-row v-for="item in currencyList" :key="item.id">
            <van-col span="8">
              <div class="value van-ellipsis">
                <img
                  class="icon"
                  v-if="item.type === 'BTC'"
                  src="@/assets/images/icons/power.svg"
                  alt=""
                />
                <img
                  class="icon"
                  v-else-if="item.type === 'ETH'"
                  src="@/assets/images/icons/eth.svg"
                  alt=""
                />
                <img
                  class="icon"
                  v-else-if="item.type === 'INI'"
                  src="@/assets/images/icons/ini.svg"
                  alt=""
                />
                <span>
                  {{ item.name }}
                </span>
                <span style="color: #aeaec3">/USDT</span>
              </div>
            </van-col>
            <van-col span="8">
              <div style="justify-content: center" class="value van-ellipsis">
                {{ item.price }}
              </div>
            </van-col>
            <van-col span="8">
              <div
                :style="{
                  color: item.chg > 0 ? '#ED5C42' : '#00C377',
                  'justify-content': 'flex-end',
                }"
                class="value van-ellipsis"
              >
                {{ item.chg }}%
              </div>
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
    <div class="flash-exchange-box">
      <div class="head">
        <div class="title">{{ $t("transaction.flashExchange") }}</div>
        <div @click.stop="toExchangeRecords" class="recod">
          <div>{{ $t("transaction.flashExchangeRecord") }}</div>
          <img src="@/assets/images/icons/record.svg" alt="" />
        </div>
      </div>
      <div class="content">
        <div class="title">{{ $t("transaction.exchangeRate") }}</div>
        <div class="translate-box">
          <div class="img-box">
            <img src="@/assets/images/icons/ini.svg" alt="" />
            <img src="@/assets/images/icons/translate.svg" alt="" />
            <img src="@/assets/images/icons/power.svg" alt="" />
          </div>
          <div class="translate-content">
            <div class="top">
              <div>From</div>
              <div>Receive</div>
            </div>
            <div class="bottom">
              <div>&nbsp;INI</div>
              <div>&nbsp;USDT</div>
            </div>
          </div>
          <!-- 可用余额 -->
          <div class="balance">
            <div>{{ $t("transaction.availableBalance") }}</div>
            <div class="value">8888.88 INI</div>
          </div>
        </div>
        <van-divider class="divider" />
        <!-- 兑换的 INI 数量 -->
        <div class="ini-input">
          <van-field
            class="c-input"
            v-model="iniNum"
            type="digit"
            label=""
            autocomplete="off"
            :border="false"
            clearable
            center
            :placeholder="$t('transaction.placeholder')"
          >
            <template #button>
              <div @click.stop="handleMaxNum" class="max">Max</div>
            </template>
          </van-field>
          <!-- 单位 -->
          <div class="unit">INI</div>
        </div>
        <!-- 预计获得 -->
        <div class="expected">
          <div class="title">{{ $t("transaction.expected") }}</div>
          <div class="value">--&nbsp;USDT</div>
        </div>
        <div class="exchange-btn">
          <CButton
            :loading="loading"
            @click="handleExchange"
            :disabled="!iniNum"
            >{{ $t("transaction.exchange") }}</CButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Hammer from "hammerjs";
import {
  onBeforeMount,
  onMounted,
  useTemplateRef,
  ref,
  onUnmounted,
} from "vue";
import CButton from "@/components/c-button.vue";
import { useRouter } from "vue-router";
import * as echarts from "echarts";
import { getBalance } from "@/api/etc";
import { useI18n } from "vue-i18n";
import { getTradeCoinPrice, exchangeCoin, getCoinTransList } from "@/api/trade";
import { closeToast, showLoadingToast } from "vant";
const router = useRouter();
const { t } = useI18n();
const chartRef = useTemplateRef("chartRef");
const loading = ref(false);
const iniNum = ref("");
const iniData = ref({
  price: 0,
  chg: 0,
});
const currencyList = ref([
  {
    id: "1",
    type: "BTC",
    name: "BTC",
    price: 10000,
    chg: 1.11,
  },
  {
    id: "2",
    type: "ETH",
    name: "ETH",
    price: 10000,
    chg: -1.11,
  },
]);

let chart = null;
onBeforeMount(async () => {
  // const res = await getBalance({ticker: 'BTC/USD', exchange_code: 'Binance'})
  // const res = await getBalance({
  //   ticker: "BTC/USD",
  // });
  // console.log(res);
  const loadingToast = showLoadingToast({
    message: t("loadingText"),
    duration: 0,
  });
  const res = await getTradeCoinPrice();
  currencyList.value.push({
    id: res.data.coinId,
    type: "INI",
    price: res.data.price,
    name: res.data.coin.toUpperCase(),
  });
  loadingToast.close();
  iniData.value.price = res.data.price;
  iniData.value.chg = res.data.chg;
});
const toExchangeRecords = () => {
  router.push("/exchange-records");
};

const initChart = () => {
  chart = echarts.init(chartRef.value);

  const option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    tooltip: {
      show: true,
      trigger: "none",
      axisPointer: {
        type: "cross",
        show: false,
      },
    },
    grid: {
      containLabel: true,
      left: 0,
      right: 0,
      top: 10,
      bottom: 0,
    },
    yAxis: {
      splitLine: { show: false },
      type: "value",
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        smooth: true,
      },
    ],
  };
  chart.setOption(option);
};

onMounted(async () => {
  try {
    const res = await getCoinTransList();
    console.log("🚀 ~ onMounted ~ res:", res);
    initChart();
    onTouch();
    window.addEventListener("resize", () => {
      chart && chart.resize();
    });
  } catch (error) {
    console.log("🚀 ~ onMounted ~ error:", error);
  }
});
const onTouch = () => {
  const hammer = new Hammer(chartRef.value);
  hammer.on("pinch", (event) => {
    const scale = event.scale; // 获取缩放比例
    if (scale <= 0.5) return; //缩放比例不足0.5，不调整范围

    // 根据缩放比例调整 dataZoom 的范围
    const start = Math.max(0, 100 - scale * 100); // 计算起始位置
    const end = Math.min(100, scale * 100); // 计算结束位置

    // 更新 echarts 的 dataZoom 范围
    chart.dispatchAction({
      type: "dataZoom",
      dataZoomIndex: 0, // 指定dataZoom组件的索引，如果有多个dataZoom组件可以根据实际情况设置
      start, // 设置dataZoom的起始位置
      end, // 设置dataZoom的结束位置
    });
  });
};
const handleExchange = async () => {
  try {
    loading.value = true;
    await exchangeCoin({
      price: iniData.value.price,
      swapCoinCount: iniNum.value,
    });
  } catch (error) {
    console.log("🚀 ~ handleExchange ~ error:", error);
  } finally {
    loading.value = false;
  }
};
const handleMaxNum = () => {
  iniNum.value = "8888.88";
};
onUnmounted(() => {
  closeToast();
});
</script>
<style lang="scss" scoped>
.divider {
  border-color: #27272b;
}
.container {
  padding: 0 30px;
  .header {
    margin-top: 30px;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        font-weight: 600;
        font-size: 40px;
        color: #ffffff;
        line-height: 47px;
      }
      .right {
        font-weight: 500;
        font-size: 32px;
        color: #ffffff;
        line-height: 38px;
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      .left {
        display: flex;
        align-items: center;
        div {
          display: flex;
          align-items: center;
          img {
            width: 28px;
            height: 28px;
          }
          span {
            margin: 0 8px;
            font-weight: 400;
            font-size: 24px;
            color: #ffffff;
            line-height: 28px;
          }
        }
        .proportion {
          margin-left: 8px;
          font-weight: 400;
          font-size: 24px;
          color: #00c377;
          line-height: 28px;
        }
      }
      .right {
        font-weight: 400;
        font-size: 24px;
        color: #aeaec3;
        line-height: 28px;
      }
    }
  }
  .chart {
    width: 100%;
    height: 600px;
    margin-top: 15px;
  }
  .currency-box {
    margin-top: 30px;

    .head {
      .cell {
        font-weight: 400;
        font-size: 28px;
        color: #aeaec3;
        line-height: 33px;
        height: 60px;
        display: flex;
        align-items: center;
      }
    }
    .currency-list {
      .value {
        display: flex;
        align-items: center;
        font-weight: 400;
        font-size: 28px;
        color: #ffffff;
        line-height: 33px;
        height: 60px;
        .icon {
          width: 32px;
          height: 32px;
          margin-right: 8px;
        }
      }
    }
  }
  .flash-exchange-box {
    padding: 30px;
    width: 690px;
    margin-top: 45px;
    background: linear-gradient(223deg, #353342 0%, #383b52 100%);
    border-radius: 20px 20px 20px 20px;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-weight: 600;
        font-size: 40px;
        color: #ffffff;
        line-height: 47px;
      }
      .recod {
        display: flex;
        div {
          font-weight: 400;
          font-size: 28px;
          color: #aeaec3;
          line-height: 33px;
        }
        img {
          width: 36px;
          height: 36px;
          margin-left: 12px;
        }
      }
    }
    .content {
      margin-top: 30px;

      .title {
        font-weight: 400;
        font-size: 24px;
        color: #aeaec3;
        line-height: 28px;
      }
      .translate-box {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: 0 auto;
        .img-box {
          display: flex;
          align-items: center;
          img {
            width: 68px;
            height: 68px;
            &:nth-child(2) {
              width: 104px;
              height: 28px;
              margin: 0 28px;
            }
          }
          img {
          }
        }
        .translate-content {
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          .top {
            text-align: center;
            display: flex;
            justify-content: space-between;
            margin-top: 6px;
            min-width: 296px;

            div {
              min-width: 68px;
              font-weight: 400;
              font-size: 24px;
              color: #aeaec3;
              line-height: 28px;
            }
          }
          .bottom {
            display: flex;
            margin-top: 6px;
            justify-content: space-between;
            min-width: 296px;
            div {
              min-width: 68px;
              text-align: center;
              font-weight: 400;
              font-size: 26px;
              color: #ffffff;
              line-height: 30px;
              margin-left: 10px;
            }
          }
        }
      }
      .balance {
        margin-top: 20px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 400;
        font-size: 28px;
        color: #ffffff;
        line-height: 33px;
      }
      .ini-input {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .c-input {
          .max {
            font-weight: 400;
            font-size: 24px;
            color: #ffffff;
            line-height: 28px;
          }
        }
        .unit {
          font-weight: 400;
          font-size: 28px;
          color: #ffffff;
          line-height: 33px;
          margin-left: 20px;
        }
      }
      .expected {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        .title {
          font-weight: 400;
          font-size: 24px;
          color: #aeaec3;
          line-height: 28px;
        }
        .value {
          font-weight: 400;
          font-size: 24px;
          color: #aeaec3;
          line-height: 28px;
        }
      }
      .exchange-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 30px;
      }
    }
  }
}
</style>
