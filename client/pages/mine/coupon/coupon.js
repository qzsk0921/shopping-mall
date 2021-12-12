// pages/mine/coupon/coupon.js
import store from '../../../store/common'
import create from '../../../utils/create'

import {
  getMyCouponList
} from '../../../api/coupon'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '我的优惠券',
    tabbar: ['未使用', '已使用', '已过期'],
    tabbarNum: [99, 0, 0],
    tabIndex: 0, //0:待使用 1:已使用 -2:已过
    tabWidth: null,
    couponList: [{
      cache: [{
        price: 50,
        condition: '满99可用',
        tit: '优惠券标题',
        tip: '酒水牛奶不可用',
        timeStr: '2021/3/21至2021/12/31',
        status: 1
      }, {
        price: 50,
        condition: '满99可用',
        tit: '优惠券标题',
        tip: '酒水牛奶不可用',
        timeStr: '2021/3/21至2021/12/31',
        status: 2
      }, {
        price: 50,
        condition: '满99可用',
        tit: '优惠券标题',
        tip: '酒水牛奶不可用',
        timeStr: '2021/3/21至2021/12/31',
        status: 3
      }], //couponNouseCache 未使用
      count: 1,
      total_page: 1,
    }, {
      cache: [], //couponUsedCache 已使用
      count: 1,
      total_page: 1
    }, {
      cache: [], //couponExpiredCache 已过期
      count: 1,
      total_page: 1,
    }],
    page: 1,
    page_size: 10,
  },
  changeTab(e) {
    console.log(e)
    const index = e.target.dataset.index

    let objData = {
      tabIndex: index,
    }

    this.setData(objData)
    this.getMyCouponList()
  },
  getMyCouponList(dataObj) {
    const tempData = {}
    if (typeof dataObj === 'object') {
      Object.keys(dataObj).forEach(key => {
        tempData[key] = dataObj[key]
      })
    }

    if (dataObj !== 'scrollTolwer') {
      tempData['per_page'] = this.data.page_size
      tempData['current_page'] = this.data.page
    }

    tempData.type = this.data.tabIndex

    return new Promise((resolve, reject) => {
      getMyCouponList(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          this.data.couponList.cache.push(...res.data.data)
          this.setData({
            [`couponList[${this.data.tabIndex}].cache`]: this.data.couponList.cache,
            [`couponList[${this.data.tabIndex}].total_page`]: res.data.last_page
          })
          resolve(res)
          console.log(this.data.couponList)
        } else {
          this.setData({
            // 测试数据
            // [`couponList.cache`]: [].concat(res.data.data).concat(res.data.data).concat(res.data.data).concat(res.data.data),
            [`couponList[${this.data.tabIndex}].cache`]: res.data.data,
            [`couponList[${this.data.tabIndex}].total_page`]: res.data.last_page
          })
          // this.data.couponList[this.data.tabIndex].cache.length
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyCouponList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    const query = wx.createSelectorQuery();
    query.select('.fixed').boundingClientRect(function (rect) {
      // console.log(rect)
      that.setData({
        fixed: rect.height,
      })
    }).exec();

    query.select('.tab').boundingClientRect(function (rect) {
      console.log(rect.width)
      that.setData({
        tabWidth: rect.width,
      })
    }).exec();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (!this.data.compatibleInfo.navHeight) {
      this.setData({
        compatibleInfo: this.store.data.compatibleInfo
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})