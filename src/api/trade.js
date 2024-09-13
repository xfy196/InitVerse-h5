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
