// pages/shop/order/myOrder.js
import store from '../../../store/common'
import create from '../../../utils/create'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '我的订单',
    tabbar: ['全部', '待支付', '已支付', '已取消'],
    tabIndex: 0, //0全部 1待支付 2已支付 3已取消
    tabWidth: null,
    orderList: [{
      cache: [], //couponNouseCache 未使用
      count: 1,
      total_page: 1,
    }, {
      cache: [{
        price: 50,
        condition: '满99可用',
        tit: '优惠券标题',
        tip: '酒水牛奶不可用',
        timeStr: '2021/3/21至2021/12/31',
        status: 1
      }, {
        price: 50,
        condition: '满99可用',
        tit: '优惠券标题',
        tip: '酒水牛奶不可用',
        timeStr: '2021/3/21至2021/12/31',
        status: 2
      }, {
        price: 50,
        condition: '满99可用',
        tit: '优惠券标题',
        tip: '酒水牛奶不可用',
        timeStr: '2021/3/21至2021/12/31',
        status: 3
      }], //couponUsedCache 已使用
      count: 1,
      total_page: 1
    }, {
      cache: [], //couponExpiredCache 已过期
      count: 1,
      total_page: 1,
    }],
    page: 1,
    page_size: 10,
  },
  changeTab(e) {
    console.log(e)
    const index = e.target.dataset.index

    let objData = {
      tabIndex: index,
    }

    this.setData(objData)
    // this.getOrderList()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      from,
      type
    } = options
    if (from === 'mine') {
      this.setData({
        tabIndex: type
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    const query = wx.createSelectorQuery();
    query.select('.fixed').boundingClientRect(function (rect) {
      // console.log(rect)
      that.setData({
        fixed: rect.height,
      })
    }).exec();

    query.select('.cont').boundingClientRect(function (rect) {
      console.log(rect)
      that.setData({
        listTop: rect.top,
      })
    }).exec();

    query.select('.tab').boundingClientRect(function (rect) {
      that.setData({
        tabWidth: rect.width,
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