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

import {
  getShopData
} from '../../api/commodity'

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
    shopData: {
      "shop_id": "1",
      "banner": [{
          "id": 8,
          "type": 1,
          "link_type": 1,
          "name": "banner7",
          "image_url": "image1",
          "link": ""
        },
        {
          "id": 7,
          "type": 1,
          "link_type": 1,
          "name": "banner7",
          "image_url": "image1",
          "link": ""
        },
        {
          "id": 6,
          "type": 1,
          "link_type": 1,
          "name": "banner6",
          "image_url": "image1",
          "link": ""
        },
        {
          "id": 5,
          "type": 1,
          "link_type": 1,
          "name": "banner5",
          "image_url": "image1",
          "link": ""
        },
        {
          "id": 4,
          "type": 1,
          "link_type": 1,
          "name": "banner4",
          "image_url": "image1",
          "link": ""
        },
        {
          "id": 1,
          "type": 1,
          "link_type": 1,
          "name": "banner1",
          "image_url": "image1",
          "link": ""
        }
      ],
      "category": [{
          "id": 2,
          "name": "分类2",
          "icon": "https://sharepuls.xcmbkj.com/app_memu_1.png?"
        },
        {
          "id": 1,
          "name": "分类1",
          "icon": "https://sharepuls.xcmbkj.com/app_memu_1.png?1"
        },
        {
          "id": 3,
          "name": "分类3",
          "icon": "https://sharepuls.xcmbkj.com/app_memu_1.png?"
        }
      ],
      "pre_goods": [{
        "id": 2,
        "goods_name": "商品2",
        "price": "100.00",
        "market_price": "100.00",
        "spec": "10g",
        "is_vip": 0,
        "is_sale": 1,
        "is_shop_check": 1,
        "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
        "cart_number": 0
      }],
      "activity_goods": [{
        "id": 2,
        "name": "限时抢购",
        "short_name": "很好",
        "type": 2,
        "start_time": 1638950997,
        "end_time": 1658950997,
        "goods_list": [{
          "id": 3,
          "goods_name": "商品3",
          "price": "40.00",
          "market_price": "100.00",
          "spec": "10g",
          "is_vip": 0,
          "is_sale": 1,
          "is_shop_check": 1,
          "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
          "cart_number": 0
        }]
      }],
      "group_goods": [{
        "id": 1,
        "name": "商品分组1",
        "goods_list": [{
          "id": 1,
          "goods_name": "商品1",
          "price": "100.00",
          "market_price": "100.00",
          "spec": "10g",
          "is_vip": 0,
          "is_sale": 1,
          "is_shop_check": 1,
          "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
          "cart_number": 0
        }]
      }],
      "shop_type_goods": [{
          "id": 4,
          "name": "子分类1",
          "icon": "https://sharepuls.xcmbkj.com/app_memu_1.png?",
          "goods_list": [{
              "id": 4,
              "goods_name": "商品4",
              "price": "100.00",
              "market_price": "100.00",
              "spec": "10g",
              "is_vip": 0,
              "is_sale": 1,
              "is_shop_check": 1,
              "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
              "cart_number": 0
            },
            {
              "id": 8,
              "goods_name": "商品8",
              "price": "100.00",
              "market_price": "100.00",
              "spec": "10g",
              "is_vip": 0,
              "is_sale": 1,
              "is_shop_check": 1,
              "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
              "cart_number": 0
            },
            {
              "id": 9,
              "goods_name": "商品9",
              "price": "100.00",
              "market_price": "100.00",
              "spec": "10g",
              "is_vip": 0,
              "is_sale": 1,
              "is_shop_check": 1,
              "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
              "cart_number": 0
            }
          ]
        },
        {
          "id": 5,
          "name": "子分类2",
          "icon": "https://sharepuls.xcmbkj.com/app_memu_1.png?",
          "goods_list": [{
            "id": 5,
            "goods_name": "商品5",
            "price": "100.00",
            "market_price": "100.00",
            "spec": "10g",
            "is_vip": 0,
            "is_sale": 1,
            "is_shop_check": 1,
            "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
            "cart_number": 0
          }]
        },
        {
          "id": 6,
          "name": "子分类3",
          "icon": "https://sharepuls.xcmbkj.com/app_memu_1.png?",
          "goods_list": [{
            "id": 6,
            "goods_name": "商品6",
            "price": "100.00",
            "market_price": "100.00",
            "spec": "10g",
            "is_vip": 0,
            "is_sale": 1,
            "is_shop_check": 1,
            "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
            "cart_number": 0
          }]
        },
        {
          "id": 7,
          "name": "子分类4",
          "icon": "https://sharepuls.xcmbkj.com/app_memu_1.png?",
          "goods_list": [{
            "id": 7,
            "goods_name": "商品7",
            "price": "100.00",
            "market_price": "100.00",
            "spec": "10g",
            "is_vip": 0,
            "is_sale": 1,
            "is_shop_check": 1,
            "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
            "cart_number": 0
          }]
        }
      ]
    }
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
          this.data.shop_id = res.data.shop_id
          // 通过shop_id获取商城商品
        })
      },
      deep: true
    },
    shop_id: {
      handler(nv, ov, obj) {
        // console.log(nv)
        // 用用户授权地址换取店铺id
        this.getShopData({
          shop_id: nv
        }).then(res => {
          // console.log(res)
          this.setData({
            // shopData: res.data
          })
        })
      },
      deep: true
    },
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
  toSearchResHandle() {
    console.log('toSearchResHandle')
    wx.navigateTo({
      url: '/pages/search/searchRes',
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
  getShopData(data) {
    return new Promise((resolve, reject) => {
      getShopData(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
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