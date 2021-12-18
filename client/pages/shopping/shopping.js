// pages/shopping/shopping.js
import {
  setTabBar
} from '../../utils/business'
import store from '../../store/common'
import create from '../../utils/create'

import {
  getCartList
} from '../../api/cart'

import {
  getMyCouponList
} from '../../api/coupon'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    select_all: false, //全选
    listData: [{
        code: "111",
        text: "text1",
        typ: "type1",
      },
      {
        code: "021",
        text: "text2",
        typ: "type2",
      },
      {
        code: "111",
        text: "text1",
        typ: "type3",
      }
    ],
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '购物车',
    navStatus: 'isEmpty',
    // 购物车商品 优先判断 下架 其次判断 库存
    cartList: {
      cache: [{
          "id": 2,
          "is_pre_sale": 0,
          "goods_name": "商品2",
          "price": 10.6,
          "market_price": "100.00",
          "status": 1,
          "spec": "10g",
          "is_vip": 1,
          "is_sale": 1,
          "is_shop_check": 1,
          "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
          "stock": 0,
          "activity_info": [],
          "cart_number": 2,
          "unit_id": "1",
          "type": "1",
          "unitName": "1/个",
          "is_stock": 0
        },
        {
          "id": 1,
          "is_pre_sale": 1,
          "goods_name": "商品1",
          "price": 35,
          "market_price": 99,
          "status": 1,
          "spec": "10g",
          "is_vip": 1,
          "is_sale": 1,
          "is_shop_check": 1,
          "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
          "stock": 0,
          "activity_info": {
            "activity_id": 1,
            "activity_name": "新品上市",
            "short_name": "好",
            "type": 1,
            "start_time": 0,
            "end_time": 0
          },
          "cart_number": 2,
          "unit_id": 1,
          "type": 2,
          "unitName": "1/个",
          "is_stock": 0
        },
        {
          "id": 1,
          "is_pre_sale": 1,
          "goods_name": "商品1",
          "price": 350,
          "market_price": 990,
          "status": 1,
          "spec": "10g",
          "is_vip": 1,
          "is_sale": 1,
          "is_shop_check": 1,
          "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
          "stock": 0,
          "activity_info": {
            "activity_id": 1,
            "activity_name": "新品上市",
            "short_name": "好",
            "type": 1,
            "start_time": 0,
            "end_time": 0
          },
          "cart_number": "1",
          "unit_id": "2",
          "type": "2",
          "unitName": "1/箱",
          "is_stock": 0
        }
      ],
      count: 1,
      total_page: 1,
    },

    page: 1,
    page_size: 10,

    refresherEnabled: false,
    triggered: false,
  },
  couponHandle() {
    // 1.有购物券 跳转至我的购物券 2.没购物券 跳转至领券中心页面
    if (this.data.couponLen) {
      wx.navigateTo({
        url: '/pages/mine/coupon/coupon',
      })
    } else {
      wx.navigateTo({
        url: '/pages/mine/coupon/center',
      })
    }
  },
  payHandle() {
    // 授权校验
    if (!this.checkAuth()) return
    // 资质校验
    if (!this.certCheck()) return
  },
  // 授权检查
  checkAuth() {
    if (!this.data.userInfo.avatar_url) {
      // 未授权先去授权页
      wx.navigateTo({
        url: '/pages/authorization/identity',
      })
      return false
    } else if (!this.data.userInfo.phone) {
      // 授权昵称头像还未授权手机号
      wx.navigateTo({
        url: '/pages/authorization/phone',
      })
      return false
    }
    return true
  },
  // 资质认证检查
  certCheck() {
    // 若用户没有通过资质认证，显示弹窗如下图
    // 若用户资质认证已申请，待审核，提示弹窗如下图
    // -2:未申请 0:审核中 1:已通过 -1:已删除
    const status = this.store.data.userInfo.is_shop_check
    if (status != 1) {
      if (status === 2) {
        this.setData({
          confirmTitle: '温馨提示',
          confirmContent: '请进行资质认证后再开通会员',
          confirmBgColor: "#FF723A",
          confirmDialogVisibile: true
        })
      } else if (status === 0) {
        this.setData({
          confirmTitle: '温馨提示',
          confirmContent: '资质认证审核中，请等待审核过后再开通会员',
          confirmBgColor: "#FF723A",
          confirmDialogVisibile: true
        })
      }
      return false
    }
    return true
  },
  scrollToLower(e) {
    console.log(e)
    console.log('scrollToLower')

    let cartList = this.data.cartList

    if (cartList.count + 1 > cartList.total_page) return

    this.setData({
      [`cartList.count`]: ++cartList.count
    })

    this.getGoodscartList('scrollToLower')
  },
  delGoodsHandle() {
    console.log('delGoodsHandle')
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  selectall() {
    var that = this;
    for (let i = 0; i < that.data.listData.length; i++) {
      that.data.listData[i].checked = (!that.data.select_all)
    }
    that.setData({
      listData: that.data.listData,
      select_all: (!that.data.select_all)
    })
  },
  quantityBlurHandle() {
    console.log('quantityBlurHandle')
  },
  getCartList(dataObj) {
    const tempData = {
      page: this.data.cartList.count,
      page_size: this.data.page_size,
      shop_id: this.store.data.shop_id
    }

    if (typeof dataObj === 'object') {
      Object.keys(dataObj).forEach(key => {
        tempData[key] = dataObj[key]
      })
    }

    return new Promise((resolve, reject) => {
      getCartList(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          this.data.cartList.cache.push(...res.data.data)
          this.setData({
            [`cartList.cache`]: this.data.cartList.cache,
            [`cartList.total_page`]: res.data.last_page
          })
          resolve(res)
        } else {
          this.setData({
            [`cartList.cache`]: res.data.data,
            [`cartList.total_page`]: res.data.last_page
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
    setTabBar.call(this, {
      selected: 2
    })

    getMyCouponList({
      type: 0
    }).then(res => {
      console.log(res)
      this.setData({
        couponLen: res.data.data.length
      })
    })

    this.getCartList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    const query = wx.createSelectorQuery();
    // 在页面渲染完成OnReady回调 获取元素高度时，如果不加定时器，获取的元素的高度还是没渲染完异步数据前的高度
    // query.select('.fixed').boundingClientRect(function (rect) {
    //   that.setData({
    //     fixed: rect.height,
    //   })
    // }).exec();


    query.select('.scroll-box').boundingClientRect(function (rect) {
      that.setData({
        scrollBoxH: rect.top,
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