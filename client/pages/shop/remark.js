// pages/shop/remark.js
import store from '../../store/common'
import create from '../../utils/create'
// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '备注',

    prepareList: ['提前联系', '货放隔壁店铺当面验收', '送到电话联系', '送到别打电话', '当面验收', '晚点送到', '货到厨房', '店门没锁请把货放店内', '货放隔壁店铺当面验收'],
    currentCount: 0,
    content: ''
  },
  inputHandle(e) {
    // console.log(e)
    let content = e.detail.value
    let len = e.detail.value.length

    if (len > 100) {
      len = 100
      content = this.data.content.slice(0, 100)
    }

    this.setData({
      currentCount: len,
      content
    })
  },
  remarkFillHandle(e) {
    const data = e.target.dataset.text

    // 100字以内
    if ((this.data.content + data).length > 100) return

    this.setData({
      currentCount: (this.data.content + data).length,
      content: this.data.content + data
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