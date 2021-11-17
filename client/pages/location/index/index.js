// pages/location/index/index.js
import store from '../../../store/common'
import create from '../../../utils/create'
import config from '../../../config/index'
const QQMapWX = require('../../../lib/qqmap-wx-jssdk.js');

let qqmapsdk, timer;
// Page({
create(store, {
  /**
   * 页面的初始数据
   */
  data: {
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '选择收货地址',
    deliveryAddress: [],

    searchKeyword: '',
    pois: []
  },
  inputHandle(e) {
    const _this = this
    console.log(e)
    this.data.searchKeyword = e.detail.value
    this.setData({
      searchKeyword: e.detail.value
    })

    var val = e.detail.value;
    this.setData({
      addr: val
    })
    clearTimeout(timer);
    timer = setTimeout(function () {
      if (val.length > 0) {
        _this.searchKeyword(val)
      } else {
        //  清空

      }
    }, 400);
  },
  searchKeyword(keyword) {
    // console.log(keyword)
    const vm = this
    // qqmapsdk.search({
    qqmapsdk.getSuggestion({
      keyword, //搜索关键词
      location: {
        latitude: vm.store.data.location.location.lat ? vm.store.data.location.location.lat : null,
        longitude: vm.store.data.location.location.lng ? vm.store.data.location.location.lng : null,
      },
      // location: `${vm.data.latitude},${vm.data.longitude}`,
      // rectangle: `${vm.data.latitude-2},${vm.data.longitude-2},${vm.data.longitude+2},${vm.data.longitude+2}`,
      // auto_extend: '1',
      page_size: 20,
      page_index: 1,
      success: function (res) {
        console.log(res, '搜索位置');
        const pois = res.data
        if (pois.length === 0) return
        vm.setData({
          pois
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: config.tencentKey
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    const query = wx.createSelectorQuery();
    // // 在页面渲染完成OnReady回调 获取元素高度时，如果不加定时器，获取的元素的高度还是没渲染完异步数据前的高度
    // query.select('.fixed').boundingClientRect(function (rect) {
    //   // console.log(rect)
    //   that.setData({
    //     // scrollViewHeight: that.store.data.systemInfo.screenHeight - (rect.height + 50),
    //     fixed: rect.height,
    //   })
    // }).exec();

    query.select('.section1').boundingClientRect(function (rect) {
      that.setData({
        listH: that.store.data.compatibleInfo.systemInfo.windowHeight - rect.height - that.store.data.compatibleInfo.navHeight,
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