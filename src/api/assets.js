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
/**
 * 获取用户已生效的节点列表
 * @returns 
 */
export const getIneffectNodeOrderList = () => {
  return request({
    url: "/h5/user/node/inEffect",
    method: "GET",
  });
}
/**
 * 获取用户所有节点列表
 * @returns 
 */
export const getAllNodeOrderList = () => {
  return request({
    url: "/h5/user/node/list",
    method: "GET",
  });
}