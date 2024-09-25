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
      tronAddress: "",
      bnbAddress: "",
      groupLevel: 0,
      nodeLevel: 0,
    },
    token: "",
  }),
  persist: {
    storage: localStorage,
    pick: ["userInfo", "token"],
    debug: import.meta.env.DEV,
    // afterHydrate: async (ctx) => {
    //   if (window.isClient) {
    //     // 如果是客户端
    //     ctx.store.setToken("123456");
    //     await ctx.store.updateUserInfo();
    //   }
    // },
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
      // if(window.isClient){
      //   // 还需要传给客户端
      // }
    },
  },
});
