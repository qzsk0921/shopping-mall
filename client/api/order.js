// https://www.showdoc.com.cn/1722521359176667/8053561250017786 Xczm190410
import request from '../utils/request'

/**
 * 下单接口 Order/add_order
 * @param {string} shop_id require 店铺id
 * @param {string} address_id require 用户选择地址id
 * @param {string} goods_id require 商品id
 * @param {string} shop_id require 店铺id
 * @param {string} shop_id require 店铺id
 * @param {string} shop_id require 店铺id
 * @param {string} shop_id require 店铺id
 * @param {string} shop_id require 店铺id
 * 
goods[i][goods_id]	是	string	
goods[i][goods_num]	是	string	用户单件选择数量
goods[i][type]	是	string	购物车返回type
goods[i][is_pre_goods]	是	string	购物车返回
goods[i][unit_id]	是	string	购物车 返回unit_id
i	是	int	商品index 0-n
 */
export function addOrder(data) {
  return request({
    url: '/Order/add_order',
    method: 'post',
    data
  })
}

/**
 * 订单消费统计 order/sale_total
 * @param {string} year require 年
 */
export function getExpenseList(data) {
  return request({
    url: '/order/sale_total',
    method: 'get',
    data
  })
}