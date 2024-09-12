import { request } from "../utils/request"
/**
 * 登录
 */
export const login = (data) => {
    return request({
        url: "/h5/login/",
        method: "POST",
        data,
    })
}
/**
 * 注册
 */
export const register = (data) => {
    return request({
        url: "/h5/register/",
        method: "POST",
        data,
    })
}
/**
 * 获取用户信息
 * @returns 
 */
export const getUserInfo = () => {
    return request({
        url: "/h5/user/",
        method: "GET",
    })
}
/**
 * 发送邮箱获取验证码
 * @param {string} type 
 * @returns 
 */
export const sendEmail = (type) => {
    return request({
        url: `/h5/email/${type}/send`,
        method: "POST",
    })
}