// pages/shop/confirmOrder.js
import store from '../../../store/common'
import create from '../../../utils/create'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '订单确认',

    orderData: {
      // "market_price_total": 400,
      // "vip_discount_total": 400,
      // "coupon_discount_total": 0,
      // "discount_total": 400,
      // "price_total": 0.01,
      // "goods_list": [{
      //     "id": 2,
      //     "is_pre_sale": 1,
      //     "goods_name": "商品2",
      //     "price": 0,
      //     "market_price": "100.00",
      //     "status": 1,
      //     "spec": "",
      //     "is_vip": 1,
      //     "is_sale": 0,
      //     "is_shop_check": 0,
      //     "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
      //     "stock": 0,
      //     "activity_info": [],
      //     "cart_number": "2",
      //     "unit_id": "1",
      //     "type": "1",
      //     "unitName": "1/",
      //     "is_stock": 1
      //   },
      //   {
      //     "id": 1,
      //     "is_pre_sale": 0,
      //     "goods_name": "商品1",
      //     "price": 0,
      //     "market_price": "100.00",
      //     "status": 1,
      //     "spec": "",
      //     "is_vip": 1,
      //     "is_sale": 0,
      //     "is_shop_check": 0,
      //     "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
      //     "stock": 0,
      //     "activity_info": [],
      //     "cart_number": "2",
      //     "unit_id": "2",
      //     "type": "2",
      //     "unitName": "1/",
      //     "is_stock": 1
      //   }
      // ]
    },

    remark: '',
  },
  // 进入我的收货地址页面
  toAddressHandle() {
    wx.navigateTo({
      url: '/pages/location/index/index?from=confirmOrder_of_mine',
    })
  },
  // 进入订单商品页面
  toOrderGoodsHandle() {
    wx.navigateTo({
      url: '/pages/shop/order/goods',
    })
  },
  // 进入优惠券选择页面
  toCouponSelectHandle() {
    let myData = {
      type: 0, //‘’:全部 0:待使用 1:已使用 -2:已过期
      goods: []
    }

    this.data.orderData.goods_list.forEach(item => {
      const temp = {
        "goods_id": item.id,
        "goods_num": item.cart_number,
        "type": item.type,
        "is_pre_goods": item.is_pre_sale,
        "unit_id": item.unit_id
      }

      myData.goods.push(temp)
    })

    const myDataStr = JSON.stringify(myData)
    wx.navigateTo({
      url: `/pages/shop/coupon/coupon?preData=${myDataStr}&currentCouponId=${this.data.currentCouponId}`,
    })
  },
  // 进入备注页面
  toRemarkHandle() {
    wx.navigateTo({
      url: '/pages/shop/remark',
    })
  },
  // 开通和续费的vip相关处理
  vipHandle() {
    // 1.点击立即开通、立即续费，跳转至会员中心页面
    // 2.若用户是未开通的用户，开通后，返回订单确认页面后，去支付样式需
    // if (this.data.userInfo.is_vip) {
    //   wx.navigateTo({
    //     url: '/pages/mine/vip/vip',
    //   })
    // } else {
    // }
    wx.navigateTo({
      url: '/pages/mine/vip/vip'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      preData
    } = options

    if (preData) {
      const preData = JSON.parse(options.preData)
      this.setData({
        orderData: preData
      })
    }
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

    if (!this.data.userInfo) {
      this.setData({
        userInfo: this.store.data.userInfo
      })
    }

    // 修改地址等信息
    if (this.data.shopAddress) {
      console.log(this.data.shopAddress)
      this.setData({
        'orderData.address_info': this.data.shopAddress
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