import request from '../utils/request'

/**
 * 获取配置参数 user/get_setting
 * @param {string} type require mp_link,stop_content,expire_time 逗号链接，需要那个参数加哪个
 */
export function getSetting(data) {
  return request({
    url: '/user/get_setting',
    method: 'get',
    data,
    load: 'noload'
  })
}