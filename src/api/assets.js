import { request } from "../utils/request";

/**
 * 获取资产
 * @returns 
 */
export const getAssets = () => {
  return request({
    url: "/h5/user/assert/list",
    method: "GET",
  });
};
/**
 * 获取用户资产详情
 * @param {*} userId 
 * @returns 
 */
export const getUserOwnAssets = (userId) => {
  return request({
    url: `/h5/user/assert/${userId}`,
    method: "GET",
  });
};