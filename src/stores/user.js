import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: {},
    token: "dad",
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
    },
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
  },
});