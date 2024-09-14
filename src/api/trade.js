import { request } from "@/utils/request";

/**
 * 获取当前ini的价格
 * @returns
 */
export const getTradeCoinPrice = () => {
  return request({
    url: "/h5/coin/price/",
    method: "get",
  });
};

/**
 * 获取闪兑记录
 * @returns
 */
export const getExchangeRecords = () => {
  return request({
    url: "/h5/coin/swap/list",
    method: "GET",
  });
};

export const getCoinTransList = () => {
  return request({
    url: "/h5/coin/trans/list",
    method: "GET",
  });
};

export const exchangeCoin = (data) => {
  return request({
    url: "/h5/coin/swap/",
    method: "POST",
    data,
  });
};
