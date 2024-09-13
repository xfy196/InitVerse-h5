import { request } from "../utils/request";
/**
 * 登录
 */
export const login = (data) => {
  return request({
    url: "/h5/login/",
    method: "POST",
    data,
  });
};
/**
 * 注册
 */
export const register = (data) => {
  return request({
    url: "/h5/register/",
    method: "POST",
    data,
  });
};
/**
 * 获取用户信息
 * @returns
 */
export const getUserInfo = () => {
  return request({
    url: "/h5/user/",
    method: "GET",
  });
};
/**
 * 发送邮箱获取验证码
 * @param {string} type
 * @returns
 */
export const sendEmailGetCode = ({ type, ...data }) => {
  return request({
    url: `/h5/email/${type}/send`,
    method: "POST",
    data,
  });
};
/**
 * 修改用户登录密码
 * @param {*} data 
 * @returns 
 */
export const putUserPassword = (data) => {
  return request({
    url: "/h5/user/password",
    method: "PUT",
    data,
  });
};
/**
 * 修改提现地址
 * @param {*} data 
 * @returns 
 */
export const putUserWithdrawalAddress = (data) => {
  return request({
    url: "/h5/user/withdrawalAddress",
    method: "PUT",
    data,
  });
};
/**
 * 修改交易密码
 * @param {*} data 
 * @returns 
 */
export const putUserTransactionPassword = (data) => {
  return request({
    url: "/h5/user/safePassword",
    method: "PUT",
    data,
  });
};