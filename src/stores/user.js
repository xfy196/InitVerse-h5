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
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
  },
});