// pages/mine/expensesRecord/expensesRecord.js
import store from '../../../store/common'
import create from '../../../utils/create'

import {
  getExpenseList
} from '../../../api/order'
// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '消费记录',

    index: 20,

    data: {
      "total_money": 4340,
      "pay_money": 4340,
      "discount_money": 20,
      "list": [{
          "month": "08",
          "pay_money": "2170.00",
          "discount_money": "10.00"
        },
        {
          "month": "12",
          "pay_money": "2170.00",
          "discount_money": "10.00"
        },
      ]
    }
  },
  watch: {
    index: {
      handler(nv, ov, obj) {
        // console.log(nv, ov)
        if (!this.data.yearArr) {
          this.setData({
            yearArr: this.createYearArr(),
          })
        }

        getExpenseList({
          year: this.data.yearArr[nv]
        }).then(res => {
          this.setData({
            // data: res.data
          })
        })
      },
      immediate: true
    }
  },
  dateChandeHandle(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    const index = e.detail.value
    this.setData({
      index
    })
  },
  // 动态生成前后20年数据
  createYearArr() {
    //年份数组[2020,2021,2022]
    let yearArrStr = ''
    const dateObj = new Date()

    for (let i = 0; i < 41; i++) {
      yearArrStr += dateObj.getFullYear() + (i - 20) + ','
    }
    return yearArrStr.split(',').map(item => item - 0)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().setWatcher(this) //设置监听器
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (!this.data.compatibleInfo.navHeight) {
      this.setData({
        compatibleInfo: this.store.data.compatibleInfo
      })
    }

    const that = this;
    const query = wx.createSelectorQuery();
    // 在页面渲染完成OnReady回调 获取元素高度时，如果不加定时器，获取的元素的高度还是没渲染完异步数据前的高度
    query.select('.cont').boundingClientRect(function (rect) {
      that.setData({
        // scrollViewHeight: that.store.data.systemInfo.screenHeight - (rect.height + 50),
        contTop: rect.top,
      })
    }).exec();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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