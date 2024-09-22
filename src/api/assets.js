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
};
/**
 * 获取用户所有节点列表
 * @returns
 */
export const getAllNodeOrderList = () => {
  return request({
    url: "/h5/user/node/list",
    method: "GET",
  });
};
/**
 * 转账
 * @param {*} data
 * @returns
 */
export const transferAccount = (data) => {
  return request({
    url: "/h5/coin/trans/",
    method: "POST",
    data,
  });
};
/**
 * 获取手续费
 * @returns
 */
export const getCommission = () => {
  return request({
    url: "/h5/coin/price/getFee",
    method: "GET",
  });
};
/**
 * 提现 USDT 所需要的 INI
 * @param {*} data 
 * @returns 
 */
export const getWithdrawalNeedINI = (data) => {
  return request({
    url: "/h5/coin/price/payout",
    method: "POST",
    data,
  });
};

/**
 * 获取资产记录
 * @param {*} type 
 * @returns 
 */
export const getAssetRecords = (type, params) => {
  return request({
    url: `/h5/user/assert/${type}/history`,
    method: "GET",
    params
  });
};
export const getInEffectIniOrderList = () => {
  return request({
    url: "/h5/coin/order/inEffect",
    method: "GET",
  });
};
export const getIniOrderList = () => {
  return request({
    url: "/h5/coin/order/list",
    method: "GET",
  });
};
export const postWithdrawal = (data) => {
  return request({
    url: "/h5/assert/payout/",
    method: "POST",
    data,
  });
};
export const postTransfer = (data) => {
  return request({
    url: "/h5/user/assert/transfer/",
    method: "POST",
    data,
  });
};
/**
 * 获取有效算力订单
 * @param {*} data
 * @returns
 */
export const getPowerInEffect = () => {
  return request({
    url: "/h5/power/inEffect",
    method: "get",
  });
};