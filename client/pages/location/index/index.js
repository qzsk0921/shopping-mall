// pages/location/index/index.js
import store from '../../../store/common'
import create from '../../../utils/create'
import config from '../../../config/index'
const QQMapWX = require('../../../lib/qqmap-wx-jssdk.js');

import {
  getAddress,
  setAddressShopInfo
} from '../../../api/location'

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
    pois: [],

    availablePoi: false, //是否可配送地址

    deliveryAddressBoxH: null, //我的收货地址列表超过高度滚动
    currentAddressId: null,
  },
  watch: {
    deliveryAddress: {
      handler(nv, ov, obj) {
        // console.log(nv)
        // console.log(ov)
        // console.log(obj)
        if (!nv.length) return
        const that = this;
        const query = wx.createSelectorQuery();
        setTimeout(function () {
          query.select('.deliveryAddress-box').boundingClientRect(function (rect) {
            console.log(rect)
            that.setData({
              deliveryAddressBoxH: that.store.data.compatibleInfo.systemInfo.windowHeight - rect.top
            })
          }).exec();
        }, 0)
      }
    },
  },
  inputHandle(e) {
    const _this = this
    // console.log(e)
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

    let location = null
    if (vm.store.data.location.location) {
      location = {
        latitude: vm.store.data.location.location.lat,
        longitude: vm.store.data.location.location.lng
      }
    }

    // qqmapsdk.search({
    qqmapsdk.getSuggestion({
      keyword, //搜索关键词
      location,
      // location: `${vm.data.latitude},${vm.data.longitude}`,
      // rectangle: `${vm.data.latitude-2},${vm.data.longitude-2},${vm.data.longitude+2},${vm.data.longitude+2}`,
      // auto_extend: '1',
      policy: 1,
      page_size: 20,
      page_index: 1,
      success: function (res) {
        console.log(res, '搜索位置');
        const pois = res.data
        // 可配送范围处理
        // do something
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
  poiTapHandle(e) {
    // console.log(444)
    console.log(e)
    const ind = e.target.dataset.index
    // this.data.pois[ind]
  },
  addrClickHandle(e) {
    console.log(e)
    // 当前收货地址存后台
    // 请求当前收货地址接口
    // 请求成功
    const id = e.currentTarget.dataset.id
    const type = e.target.dataset.type

    // 编辑按钮不处理
    if (type) return false

    this.setData({
      currentAddressId: id
    })

    // 导航链接，跳转至首页 首页显示定位信息标题
    wx.switchTab({
      url: '../../index/index',
    })
  },
  addrEditHandle(e) {
    // console.log('addrEditHandle')
    const id = e.currentTarget.dataset.id

    wx.navigateTo({
      url: `/pages/location/add/add?type=edit&id=${id}`,
    })
  },
  addAddrHandle() {
    // 导航至新增收货地址页
    wx.navigateTo({
      url: '../add/add',
    })
  },
  searchClickHandle() {
    console.log('searchClickHandle')
  },
  searchCloseHandle() {
    console.log('searchCloseHandle')
    this.setData({
      searchKeyword: ''
    })
  },
  getAddress(data) {
    data = data ? data : {}
    return new Promise((resolve, reject) => {
      getAddress(data).then(res => {
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
    getApp().setWatcher(this) //设置监听器

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

    // 更新收货地址列表
    this.getAddress().then(res => {
      this.setData({
        deliveryAddress: res.data.data
        // deliveryAddress: [{
        //   id: 1,
        //   address: '厦门星辰追梦科技有限公司1', //地址
        //   number: '10-2号302-1室', //门牌号
        //   name: '洪先生', //联系人
        //   phone: '14012344321', //手机号
        //   current: 0, //当前使用地址
        // }]
      })
    })

    setAddressShopInfo().then(res => {
      console.log(res)
    })
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