// pages/location/add/add.js
import store from '../../../store/common'
import create from '../../../utils/create'
// Page({
create(store, {
  /**
   * 页面的初始数据
   */
  data: {
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '添加新地址',
    checked: false,

    deliveryAddress: {
      address: '', //地址
      number: '', //门牌号
      name: '', //联系人
      phone: '', //手机号
      current: 0, //当前使用地址
    }, //添加新地址

    address: null,
    latitude: null,
    longitude: null
  },
  onChange({
    detail
  }) {
    console.log(detail)
    // 需要手动对 checked 状态进行更新
    this.setData({
      checked: detail
    });
  },
  addressHandle() {
    console.log('addressHandle')
    const that = this
    // console.log(this.store.data.location.location.lat)
    // const objectData = {
    //   latitude: this.store.data.location.location.lat,
    //   longitude: this.store.data.location.location.lng
    // }
    wx.chooseLocation({
      latitude: this.store.data.location.location.lat,
      longitude: this.store.data.location.location.lng,
      success: function (res) {
        console.log('chooseLocation success')
        console.log(res)
        // address: "福建省厦门市思明区民族路50号(外贸新村 演武大桥)"
        // errMsg: "chooseLocation:ok"
        // latitude: 24.44409
        // longitude: 118.082503
        // name: "世纪中心"

        that.setData({
          'deliveryAddress.address': res.name,
          address: res.name,
          latitude: res.latitude,
          longitude: res.longitude
        })
      },
      fail: function (res) {
        // 接口调用失败的回调函数
        console.log('chooseLocation fail')
        console.log(res)
      },
      complete: function (res) {
        // 接口调用结束的回调函数（调用成功、失败都会执行）
        console.log('chooseLocation complete')
        console.log(res)
      }
    })
    // wx.openLocation(objectData)
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