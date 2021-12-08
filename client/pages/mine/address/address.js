// pages/mine/address/address.js
import store from '../../../store/common'
import create from '../../../utils/create'

import {
  getAddressList,
} from '../../../api/location'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '我的地址',

    deliveryAddress: [],
  },
  getAddressList(data) {
    data = data ? data : {}
    return new Promise((resolve, reject) => {
      getAddressList(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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