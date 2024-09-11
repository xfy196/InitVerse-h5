import axios from "axios";
import { useUserStore } from "../stores/user";
const CancelToken = axios.CancelToken;
// const baseURL = "/";
const request = axios.create({
  // baseURL,
});
const pending = new Map();
const gKey = (config) => {
  return config.url + "&" + config.method;
};
const addPending = (config) => {
  config.cancelToken = new CancelToken((c) => {
    pending.set(gKey(config), c);
  });
};
const removePending = (config) => {
  const key = gKey(config);
  if (pending.has(key)) {
    const cancel = pending.get(key);
    cancel && cancel();
    pending.delete(key);
  }
};
request.interceptors.request.use((config) => {
  const userStore = useUserStore();
  if (userStore.token) {
    config.headers.Authorization = `Bearer ${userStore.token}`;
  }
  removePending(config);

  addPending(config);

  return config;
});
/* 
配置拦截器 响应的结果正确是什么结果错误又是什么结果
*/
request.interceptors.response.use(
  (response) => {
    if (response.status == 200) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response.data);
    }
  },
  (err) => {
    if (err.response.status) {
      switch (err.response.status) {
        case 404:
          showFailToast({
            message: err.response.data.message,
          });
          break;
        default:
          break;
      }
    }
    return Promise.reject(err.response);
  }
);
export { request };
