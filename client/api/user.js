import request from '../utils/request'

// 用户授权
/**
 * 登录接口
 * @param {string} code require 小程序code
 * @returns {string} token 
 */
export function login(data) {
  return request({
    url: '/mallcar/login/login',
    method: 'post',
    data
  })
}

/**
 * 更新微信手机
 * @param {string} encryptedData require 微信加密数据
 * @param {string} iv require 微信解密key
 */
export function updatePhone(data) {
  return request({
    url: '/mallcar/login/update_phone',
    method: 'post',
    data
  })
}

/**
 * 用户详情
 */
export function getUserDetail() {
  return request({
    url: '/mallcar/user/get_user_info',
    method: 'get'
  })
}