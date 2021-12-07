// https://www.showdoc.com.cn/1722521359176667/8053561250017786 Xczm190410
import request from '../utils/request'

/**
 * 商品分类
 * @param {int} pid require 0:父级 其他:父级分类id
 */
export function getCategoryList(data) {
  return request({
    url: '/Category/get_category_list',
    method: 'post',
    data
  })
}