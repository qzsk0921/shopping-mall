// pages/mine/coupon/center.js
import store from '../../../store/common'
import create from '../../../utils/create'

import {
  getCouponMarketList
} from '../../../api/coupon'
// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '领券中心',
    //优惠券列表数据
    couponMarketList: {
      cache: [],
      count: 1,
      total_page: 1,
    },
    page: 1,
    page_size: 10,
  },
  getCouponMarketList(dataObj) {

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

    return new Promise((resolve, reject) => {
      getCouponMarketList(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          this.data.couponMarketList.cache.push(...res.data.data)
          this.setData({
            [`couponMarketList.cache`]: this.data.couponMarketList.cache,
            [`couponMarketList.total_page`]: res.data.last_page
          })
          resolve(res)

          console.log(this.data.couponMarketList)
        } else {
          this.setData({
            // 测试数据
            // [`couponMarketList.cache`]: [].concat(res.data.data).concat(res.data.data).concat(res.data.data).concat(res.data.data),
            [`couponMarketList.cache`]: res.data.data,
            [`couponMarketList.total_page`]: res.data.last_page
          })
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 滚动到最底部
  scrollToLower(e) {
    console.log(e)
    console.log('scrollToLower')
    const couponMarketList = this.data.couponMarketList

    if (couponMarketList.count + 1 > couponMarketList.total_page) return

    this.setData({
      'couponMarketList.count': ++couponMarketList.count
    })
    this.getcouponMarketList('scrollToLower')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCouponMarketList().then(res => {})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

    const that = this;
    const query = wx.createSelectorQuery();
    // 在页面渲染完成OnReady回调 获取元素高度时，如果不加定时器，获取的元素的高度还是没渲染完异步数据前的高度
    query.select('.fixed').boundingClientRect(function (rect) {
      // console.log(rect)
      that.setData({
        // scrollViewHeight: that.store.data.systemInfo.screenHeight - (rect.height + 50),
        fixed: rect.height,
      })
    }).exec();
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