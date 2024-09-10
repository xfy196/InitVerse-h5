<template>
  <div>
    transaction
    <div class="chart" ref="chartRef"></div>
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
      data: ["2017-10-24", "2017-10-25", "2017-10-26", "2017-10-27"],
    },
    yAxis: {},
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    series: [
      {
        type: "candlestick",
        data: [
          [20, 34, 10, 38],
          [40, 35, 30, 50],
          [31, 38, 33, 44],
          [38, 15, 5, 42],
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
