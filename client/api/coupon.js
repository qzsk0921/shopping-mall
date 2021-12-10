// https://www.showdoc.com.cn/1722521359176667/8053561250017786 Xczm190410
import request from '../utils/request'

/**
 * 优惠券市场 Coupon/coupon_market
 */
export function getCouponMarketList(data) {
  return request({
    url: '/Coupon/coupon_market',
    method: 'get',
    data
  })
}

/**
 * 领取优惠券 Coupon/get_coupon
 * @param {int} coupon_id require 优惠券id
 */
export function getCoupon(data) {
  return request({
    url: '/Coupon/get_coupon',
    method: 'get',
    data
  })
}

/**
 * 我的优惠券列表 Coupon/my_coupon_list
 * @param {int} type require 全部 0:待使用 1:已使用 -2:已过期
 */
export function getMyCouponList(data) {
  return request({
    url: '/Coupon/my_coupon_list',
    method: 'get',
    data
  })
}