// pages/index/index.js

import {
  setTabBar
} from '../../utils/business'
import config from '../../config/index'
import store from '../../store/common'
import create from '../../utils/create'
// Page({
create(store, {
  /**
   * 页面的初始数据
   */
  data: {
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navStatus: 'location'
  },
  watch: {
    // compatibleInfo: {
    //   handler(nv, ov, obj) {
    //     // console.log(nv)
    //     // console.log(ov)
    //     // console.log(obj)
    //     // 多次触发，执行一次
    //     clearTimeout(timerSearchObject)
    //     timerSearchObject = setTimeout(() => {
    //       const requireSearchObject = this.store.data.searchObject
    //       requireSearchObject.forEach(item => {
    //         if (item.tag === obj.tag)
    //           item = obj
    //       })
    //       console.log(requireSearchObject)
    //       this.setData({
    //         conditionTag: requireSearchObject,
    //       })
    //     }, 200)
    //   },
    //   deep: true
    // }
  },
  searchHandle() {
    console.log('searchHandle')
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  a() {
    console.log('a')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().setWatcher(this) //设置监听器

    getApp().getSystemInfoCallback = (res => {
      console.log(res)
      this.setData({
        compatibleInfo: res
      })

      this.store.data.compatibleInfo.systemInfo = res.systemInfo
      this.store.data.compatibleInfo.navHeight = res.navHeight
      this.store.data.compatibleInfo.isIphoneX = res.isIPhone
      this.update()
    })

    // 定位授权
    this.getLocation()
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
        // scrollViewHeight: that.store.data.systemInfo.screenHeight - (rect.height + 50),
        fixed: rect.height,
      })
    }).exec();

    setTabBar.call(this)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log(this.data.compatibleInfo)
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

  },
  getLocation() {
    const that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        let latitude = res.latitude
        let longitude = res.longitude
        wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${config.tencentKey}`,
          success: res => {
            console.log(res)
            // console.log(res.data.result.ad_info.city+res.data.result.ad_info.adcode);
            // that.store.data.searchCityCode = res.data.result.ad_info.adcode
            // that.store.data.searchCity = res.data.result.ad_info.city
            that.store.data.location = res.data.result
            that.update()
            // console.log(that.store.data.location)
            that.setData({
              location: res.data.result
            })
            // console.log(that.data.location)
          }
        })
      },
      fail: function (err) {
        console.log(err)
        that.setData({
          location: {
            formatted_addresses: {
              recommend: '定位失败'
            }
          }
        })
      },
      complete: function () {
        console.log('complete')
      }
    })
  }
})