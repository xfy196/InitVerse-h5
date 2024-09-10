import axios from "axios";
import { showFailToast } from "vant";
const CancelToken = axios.CancelToken;
const baseURL = "https://api.zjgame.xyz/api/v1";
const request = axios.create({
  baseURL,
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
