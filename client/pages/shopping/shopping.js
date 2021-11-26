// pages/shopping/shopping.js
import {
  setTabBar
} from '../../utils/business'
import store from '../../store/common'
import create from '../../utils/create'

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

    shoppingData: [{
        type: 1, //预售
        option: '元宝优选调和油20L/捅',
        desc: '商品描述，最多1行，超过显…',
        id: 1,
        price: '13.9',
        originPrice: '25.9',
        store: 1, //库存
        url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
      },
      {
        type: 2, //新品
        option: '阿尔卑斯饮用天然矿泉水500ml*6',
        desc: '商品描述，最多1行，超过显…',
        id: 2,
        price: '13.9',
        originPrice: '25.9',
        store: 0, //库存
        url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
      }
    ]
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setTabBar.call(this, {
      selected: 2
    })
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