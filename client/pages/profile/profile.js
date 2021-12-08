// pages/profile/profile.js
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
    canIUseGetUserProfile: false,

    userInfo: null,

    options: [{
        value: 9,
        name: '我的收藏'
      },
      {
        value: 92,
        name: '浏览记录'
      }
    ],
    options1: [{
        imgName: 'my_order_all',
        name: '全部订单'
      },
      {
        imgName: 'my_order_wait',
        name: '待支付'
      },
      {
        imgName: 'my_order_done',
        name: '已支付'
      }
    ],
    options2: [{
        id: 1,
        imgName: 'my_icon_coupons',
        name: '优惠券'
      },
      {
        id: 2,
        imgName: 'my_icon_address',
        name: '收货地址'
      },
      {
        id: 3,
        imgName: 'my_icon_consume',
        name: '消费记录'
      },
      {
        id: 4,
        imgName: 'my_icon_certification',
        name: '资质认证'
      },
      {
        id: 5,
        imgName: 'my_icon_customer',
        name: '我的客户'
      },
      {
        id: 6,
        imgName: 'my_icon_problem',
        name: '常见问题'
      },
      {
        id: 7,
        imgName: 'my_icon_focus',
        name: '关注公众号'
      },
      {
        id: 8,
        imgName: 'my_icon_set',
        name: '设置'
      }
    ]
  },
  option2Handle(e) {
    console.log(e)
    const id = e.currentTarget.dataset.id
    console.log(id)
    switch (id) {
      case 1:
        break;
      case 2:
        // 收货地址
        wx.navigateTo({
          // url: "/pages/mine/address/address",
          url: '/pages/location/index/index?from=mine'
        })
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        break;
      case 6:
        break;
      case 7:
        break;
      case 8:
        break;
      default:
        console.log(`Sorry, we are out of ${id}.`);
    }
  },
  getUserProfile() {
    // userStore.getUserProfile().then(res => {
    //   // console.log(res)
    //   this.setData({
    //     ...res
    //   })
    // })

    wx.getUserProfile({
      desc: '展示用户信息',
      success: (res) => {
        console.log(res)
        // this.store.data.userInfo = res.userInfo
        this.store.data.userInfo['avatarUrl'] = res.userInfo.avatarUrl
        this.store.data.userInfo['city'] = res.userInfo.city
        this.store.data.userInfo['country'] = res.userInfo.country
        this.store.data.userInfo['gender'] = res.userInfo.gender
        this.store.data.userInfo['language'] = res.userInfo.language
        this.store.data.userInfo['nickName'] = res.userInfo.nickName
        this.store.data.userInfo['province'] = res.userInfo.province
        this.update()

        // 上传用户信息
        updateUserInfo(res.userInfo).then(res => {
          console.log(res.msg)
        }).catch(err => {
          console.log('更新微信信息:' + err.msg)
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setTabBar.call(this, {
      selected: 3
    })

    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
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
    this.setData({
      userInfo: this.store.data.userInfo
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

  }
})