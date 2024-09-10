<template>
  <div>
    transaction
    <div @touchstart="() => {}" class="chart" ref="chartRef"></div>
  </div>
</template>

<script setup>
import { onMounted, useTemplateRef, ref } from "vue";
import * as echarts from "echarts";
const chartRef = useTemplateRef("chartRef");
let chart = null;
onMounted(() => {
  chart = echarts.init(chartRef.value);
  const option = {
    xAxis: {
      data: [
        "2017-10-21",
        "2017-10-22",
        "2017-10-23",
        "2017-10-24",
        "2017-10-25",
        "2017-10-26",
        "2017-10-27",
        "2017-10-28",
        "2017-10-29",
      ],
    },
    yAxis: {
    },
    tooltip: {
      show: true,
      trigger: "none",
      axisPointer: {
        type: "cross",
        show: false,
      },
    },
    series: [
      {
        type: "candlestick",
        data: [
          [14, 17, 21, 28],
          [14, 17, 21, 28],
          [13, 24, 10, 38],
          [20, 34, 10, 38],
          [40, 35, 30, 50],
          [31, 38, 33, 44],
          [38, 15, 5, 42],
          [14, 17, 21, 28],
          [14, 17, 21, 28],
        ],
      },
    ],
  };
  chart.setOption(option);
  window.addEventListener("resize", () => {
    chart && chart.resize();
  });
});
</script>
<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 800px;
}
</style>
