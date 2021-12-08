// https://www.showdoc.com.cn/1722521359176667/8053561250017786 Xczm190410
import request from '../utils/request'

/**
 * 添加收货地址
 * @param {string} consignee_name require 收货人名称
 * @param {string} consignee_phone require 收货人手机
 * @param {string} name require 微信提供位置名称
 * @param {string} address require 微信提供位置
 * @param {string} user_address require 用户填写地址
 * @param {string} latitude require 纬度
 * @param {string} longitude require 经度
 * @param {string} gender 性别 1:男 2:女
 */
export function addAddress(data) {
  return request({
    url: '/Address/add_address',
    method: 'post',
    data
  })
}

/**
 * 删除收货地址
 * @param {string} id require 地址id
 */
export function delAddress(data) {
  return request({
    url: '/Address/del_address',
    method: 'post',
    data
  })
}

/**
 * 编辑收货地址 Address/edit_address
 * @param {string} id require 地址id
 * @param {string} consignee_name require 收货人名称
 * @param {string} consignee_phone require 收货人手机
 * @param {string} name require 微信提供位置名称
 * @param {string} address require 微信提供位置
 * @param {string} user_address require 用户填写地址
 * @param {string} latitude require 纬度
 * @param {string} longitude require 经度
 * @param {string} gender 性别 1:男 2:女
 */
export function editAddress(data) {
  return request({
    url: '/Address/edit_address',
    method: 'post',
    data
  })
}

/**
 * 收货地址详情 
 * @param {int} id require 地址id
 */
export function getAddressDetail(data) {
  return request({
    url: '/Address/get_address_info',
    method: 'get',
    data
  })
}

/**
 * 收货地址列表
 */
export function getAddress(data) {
  return request({
    url: '/Address/get_address_list',
    method: 'get',
    data
  })
}

/**
 * 用户授权地址和切换收货地址 Address/set_shop_info
 */
export function setAddressShopInfo(data) {
  return request({
    url: '/Address/set_shop_info',
    method: 'get',
    data
  })
}