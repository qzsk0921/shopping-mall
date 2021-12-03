// pages/shop/shopType.js
import store from '../../store/common'
import create from '../../utils/create'
// Page({
create(store, {
  /**
   * 页面的初始数据
   */
  data: {
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '店铺类型',
    currentId: 2, //选中的类型
    shops: [{
        id: 1,
        name: '烧烤店'
      },
      {
        id: 2,
        name: '卤料店'
      },
      {
        id: 3,
        name: '烧烤店'
      },
      {
        id: 4,
        name: '烧烤店'
      },
      {
        id: 5,
        name: '卤料店'
      },
      {
        id: 6,
        name: '卤料店'
      }, {
        id: 7,
        name: '卤料店'
      }, {
        id: 8,
        name: '卤料店'
      }, {
        id: 9,
        name: '卤料店'
      }, {
        id: 10,
        name: '卤料店'
      }, {
        id: 11,
        name: '卤料店'
      }
    ]
  },
  selectHandle(e) {
    // 店铺类型选择
    if (e.target.dataset.id === this.data.currentId) return
    this.setData({
      currentId: e.target.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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