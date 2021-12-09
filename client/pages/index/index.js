// pages/index/index.js

import {
  setTabBar
} from '../../utils/business'
import config from '../../config/index'
import store from '../../store/common'
import create from '../../utils/create'

import {
  setAddressShopInfo
} from '../../api/location'

// Page({
create(store, {
  /**
   * 页面的初始数据
   */
  data: {
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navStatus: 'location',
    // swiper
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    interval: 2000,
    autoplay: true,
    // 分类列表
    categoryList: [{
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg',
      name: '蔬 菜'
    }, {
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg',
      name: '肉禽蛋品'
    }, {
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg',
      name: '水产海鲜'
    }, {
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg',
      name: '蔬 菜'
    }, {
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg',
      name: '蔬 菜'
    }, {
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg',
      name: '蔬 菜'
    }, {
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg',
      name: '蔬 菜'
    }, {
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg',
      name: '蔬 菜'
    }, {
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg',
      name: '蔬 菜'
    }, {
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg',
      name: '蔬 菜'
    }, {
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg',
      name: '蔬 菜'
    }, {
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg',
      name: '蔬 菜'
    }, {
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg',
      name: '蔬 菜'
    }, {
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg',
      name: '蔬 菜'
    }, {
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg',
      name: '蔬 菜'
    }, {
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg',
      name: '蔬 菜'
    }],
    // 预售
    prepareSaleList: [{
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg',
      price: 6.5,
      originPrice: 7.5
    }, {
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg',
      price: 6.5,
      originPrice: 7.5
    }, {
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg',
      price: 6.5,
      originPrice: 7.5
    }],
    // 新品上市
    newMarketList: [{
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg',
      price: 6.5,
      originPrice: 7.5
    }, {
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg',
      price: 6.5,
      originPrice: 7.5
    }, {
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg',
      price: 6.5,
      originPrice: 7.5
    }],
    hotGoodsList: [{
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg',
      tit: '元宝优选调和油20L/捅',
      price: 6.5,
      originPrice: 7.5
    }, {
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg',
      tit: '阿尔卑斯饮用天然矿泉水500ml*6',
      price: 6.5,
      originPrice: 7.5
    }, {
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg',
      tit: '元宝优选调和油20L/捅',
      price: 6.5,
      originPrice: 7.5
    }, {
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg',
      tit: '元宝优选调和油20L/捅',
      price: 6.5,
      originPrice: 7.5
    }]
  },
  watch: {
    currentAddress: {
      handler(nv, ov, obj) {
        // console.log(nv)
        // 用用户授权地址换取店铺id
        this.setAddressShopInfo(nv).then(res => {
          // console.log(res)
          this.store.data.shop_id = res.data.shop_id
          this.update()
          // 通过shop_id获取商城商品
        })
      },
      deep: true
    }
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

    query.select('.section1').boundingClientRect(function (rect) {
      that.setData({
        // scrollViewHeight: that.store.data.systemInfo.screenHeight - (rect.height + 50),
        section1H: rect.height,
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

    if (this.store.data.shop_id) {
      this.setData({
        currentAddress: this.store.data.currentAddress
      })
    }
  },
  setAddressShopInfo(data) {
    return new Promise((resolve, reject) => {
      setAddressShopInfo(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
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
            const result = res.data.result

            that.store.data.currentAddress = {
              address: result.formatted_addresses.recommend,
              longitude: result.location.lng,
              latitude: result.location.lat,
              type: 2, //1:通过地址选择 2:首页选择地址
            }
            that.store.data.location = result
            that.update()

            that.setData({
              currentAddress: that.store.data.currentAddress
            })
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