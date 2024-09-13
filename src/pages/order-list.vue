<template>
  <div class="container">
    <Back />
    <div class="title">{{ title }}</div>
    <div class="list">
      <div class="list-item">
        <div class="cell-box">
          <div class="cell">
            <div class="label">编号</div>
            <div class="right">
              <div class="value">1234567890</div>
            </div>
          </div>
          <div class="cell">
            <div class="label">开始时间</div>
            <div class="right">
              <div class="value">2024/09/01 12:00:00</div>
            </div>
          </div>
          <div class="cell">
            <div class="label">释放率</div>
            <div class="right">
              <div class="value">0.7%/D</div>
            </div>
          </div>
          <div class="cell">
            <div class="label">算力总额</div>
            <div class="right">
              <div class="value">1 POR≈200 USDT</div>
              <img src="@/assets/images/icons/power.svg" alt="" />
            </div>
          </div>
          <div class="cell">
            <div class="label">未释放算力</div>
            <div class="right">
              <div class="value">1 POR≈200 USDT</div>
              <img src="@/assets/images/icons/power.svg" alt="" />
            </div>
          </div>
          <div class="cell">
            <div class="label">结束时间</div>
            <div class="right">
              <div class="value">2024/09/01 12:00:00</div>
            </div>
          </div>
          <div class="cell">
            <div class="label">状态</div>
            <div class="right">
              <div class="status">已完成</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Back from "@/components/back.vue";
const title = ref("INI订单");
</script>
<style lang="scss" scoped>
.container {
  padding: 0 30px 30px;
  .title {
    margin-top: 30px;
    font-weight: 500;
    font-size: 34px;
    color: #ffffff;
    line-height: 40px;
    text-align: center;
  }
  .list {
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
              background: #626176;
              color: #ffffff;
              border-radius: 8px 8px 8px 8px;
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
