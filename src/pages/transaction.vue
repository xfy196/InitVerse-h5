<template>
  <div>
    transaction
    <div @touchmove.stop.prevent="() => {}" @touchstart.stop.prevent="() => {}" class="chart" ref="chartRef"></div>
    <div style="height: 300px;"></div>
  </div>
</template>

<script setup>
import Hammer from "hammerjs";
import { onMounted, useTemplateRef } from "vue";
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
    dataZoom: [{
      borderColor: "transparent", //组件边框颜色
    }],
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
const onTouch = () => {
  const hammer = new Hammer(chartRef.value)
  hammer.on("pinch", (event) => {
    const scale = event.scale; // 获取缩放比例
    if (scale <= 0.5) return //缩放比例不足0.5，不调整范围

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
  })
}
</script>
<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 800px;
}
</style>
