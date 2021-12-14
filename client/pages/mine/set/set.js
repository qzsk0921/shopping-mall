// pages/mine/set/set.js
import store from '../../../store/common'
import create from '../../../utils/create'
// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '设置',
    setList: [{
        id: 1,
        name: '版本',
        val: '1.0.0',
        url: ''
      },
      {
        id: 2,
        name: '关于我们',
        val: '',
        url: ''
      },
      {
        id: 3,
        name: '用户协议',
        val: '',
        url: ''
      },
      {
        id: 4,
        name: '隐私协议',
        val: '',
        url: ''
      },
    ]
  },
  cellHandle(e) {
    console.log('cellHandle')
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