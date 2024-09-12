import { request } from "../utils/request";

/**
 * 获取资产
 * @returns 
 */
export const getAssets = () => {
  return request({
    url: "/api/h5/user/assert/list",
    method: "GET",
  });
};
