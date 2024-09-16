import { defineStore } from "pinia";
import { getUserInfo } from "@/api/user";
import router from "../router";
export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: {
      uid: "",
      shareCode: "",
      withdrawalAddress: "",
      safePassword: "",
      tronAddress: '',
      bnbAddress: '',
      groupLevel: 0,
      nodeLevel: 0
    },
    token: "",
  }),
  persist: {
    storage: localStorage,
    pick: ["userInfo", "token"],
  },
  actions: {
    setToken(token) {
      this.token = token;
    },
    logout() {
      this.token = "";
      this.userInfo = {};
      router.push("/login");
    },
    async updateUserInfo() {
      try {
        const res = await getUserInfo();
        this.setUserInfo(res.userInfo);
      } catch (error) {
        console.log("🚀 ~ updateUserInfo ~ error:", error);
      }
    },
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
  },
});
