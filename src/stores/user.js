import { defineStore } from "pinia";
import router from "../router"
export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: {},
    token: "",
  }),
  persist: {
    storage: localStorage,
    pick: ["userInfo", 'token'],
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
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
  },
});