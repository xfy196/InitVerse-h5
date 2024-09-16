import { defineStore } from "pinia";
import { getRentingPowerSetting } from "@/api/rental";
export const useSettingStore = defineStore("setting", {
  state: () => ({
    firstMaxPower: 3000,
    coinReleaseRate: 0.01,
    dailyChemicalMaxValue: 0.03,
    dailyChemicalIncreaseValue: 0.001,
    basePower: 10,
    dailyChemicalInitValue: 0.007,
    againMaxPower: 10000,
    coinRate: 0.27,
    depositMagnification: 2,
    dividendPools: 0.03,
    minPower: 100,
    dailyRate: 0.7,
    maximumReturnMultiplier: 2,
  }),
  actions: {
      async updateSetting() {
        try {
          const res = await getRentingPowerSetting();
          this.firstMaxPower = res.data.firstMaxPower;
          this.coinReleaseRate = res.data.coinReleaseRate;
          this.dailyChemicalMaxValue = res.data.dailyChemicalMaxValue;
          this.dailyChemicalIncreaseValue = res.data.dailyChemicalIncreaseValue;
          this.basePower = res.data.basePower;
          this.dailyChemicalInitValue = res.data.dailyChemicalInitValue;
          this.againMaxPower = res.data.againMaxPower;
          this.coinRate = res.data.coinRate;
          this.depositMagnification = res.depositMagnification;
          this.dividendPools = res.data.dividendPools;
          this.minPower = res.data.minPower;
          this.dailyRate = res.data.dailyRate;
          this.maximumReturnMultiplier = res.data.maximumReturnMultiplier;
        } catch (error) {
          console.log("🚀 ~ updateSeeting ~ error:", error);
        }
      },
  }
});
