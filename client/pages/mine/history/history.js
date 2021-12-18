// pages/mine/history/history.js
// 浏览记录
import store from '../../../store/common'
import create from '../../../utils/create'

import {
  getViewHistory
} from '../../../api/commodity'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '浏览记录',

    historyList: {
      cache: [],
      count: 1,
      total_page: 1,
    },

    page: 1,
    page_size: 5,

    refresherEnabled: false,
    triggered: false,
  },
  scrollToLower(e) {
    console.log(e)
    console.log('scrollToLower')

    let historyList = this.data.historyList

    if (historyList.count + 1 > historyList.total_page) return

    this.setData({
      [`historyList.count`]: ++historyList.count
    })

    this.getViewHistory('scrollToLower')
  },
  getViewHistory(dataObj) {
    const tempData = {
      page: this.data.historyList.count,
      page_size: this.data.page_size,
      shop_id: this.store.data.shop_id
    }

    if (typeof dataObj === 'object') {
      Object.keys(dataObj).forEach(key => {
        tempData[key] = dataObj[key]
      })
    }

    return new Promise((resolve, reject) => {
      getViewHistory(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          this.data.historyList.cache.push(...res.data.data)
          this.setData({
            [`historyList.cache`]: this.data.historyList.cache,
            [`historyList.total_page`]: res.data.last_page
          })
          resolve(res)
        } else {
          this.setData({
            [`historyList.cache`]: res.data.data,
            [`historyList.total_page`]: res.data.last_page
          })
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
    this.getViewHistory()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    const query = wx.createSelectorQuery();
    // 在页面渲染完成OnReady回调 获取元素高度时，如果不加定时器，获取的元素的高度还是没渲染完异步数据前的高度
    query.select('.fixed').boundingClientRect(function (rect) {
      // console.log(rect)
      that.setData({
        fixed: rect.height,
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

    if (!this.data.userInfo) {
      this.setData({
        userInfo: this.store.data.userInfo
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