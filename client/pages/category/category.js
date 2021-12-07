// pages/category/category.js
import {
  setTabBar
} from '../../utils/business'
import store from '../../store/common'
import create from '../../utils/create'

import {
  getCategoryList
} from '../../api/commodity'

// Page({
create(store, {
  /**
   * 页面的初始数据
   */
  data: {
    categoryOpened: 0, //0收起 1展开
    priceSort: 1, //1升序 2降序 0空
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navStatus: 'category',
    currentCategoryId: 2,
    categoryData: [{
      id: 1,
      name: '蔬 菜',
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
    }, {
      id: 2,
      name: '肉禽蛋品',
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
    }, {
      id: 3,
      name: '蔬菜3',
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
    }, {
      id: 4,
      name: '蔬菜4',
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
    }, {
      id: 5,
      name: '蔬菜5',
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
    }, {
      id: 6,
      name: '蔬菜6',
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
    }, {
      id: 7,
      name: '蔬菜7',
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
    }, {
      id: 8,
      name: '蔬菜8',
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
    }, {
      id: 9,
      name: '蔬菜9',
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
    }, {
      id: 10,
      name: '蔬菜10',
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
    }, {
      id: 11,
      name: '蔬菜11',
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
    }, {
      id: 12,
      name: '蔬菜12',
      url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
    }],
    firstCategory: [], //第一分类
    secondCategory: [], //第二分类
    screenCategory: [{
      // 导航名称
      option: '蔬菜豆制品',
      id: 'a1',
      currentOptionId: '',
      // 该导航下所有的可选项
      content: [{
        type: 1, //预售
        option: '元宝优选调和油20L/捅',
        desc: '商品描述，最多1行，超过显…',
        id: 1,
        price: '13.9',
        originPrice: '25.9',
        store: 1, //库存
        url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
      }, {
        type: 2, //新品
        option: '阿尔卑斯饮用天然矿泉水500ml*6',
        desc: '商品描述，最多1行，超过显…',
        id: 2,
        price: '13.9',
        originPrice: '25.9',
        store: 0, //库存
        url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
      }, {
        type: 2,
        option: '阿尔卑斯饮用天然矿泉水500ml*6',
        desc: '商品描述，最多1行，超过显…',
        id: 3,
        price: '13.9',
        originPrice: '25.9',
        store: 23, //库存
        url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
      }, {
        type: 2,
        option: '阿尔卑斯饮用天然矿泉水500ml*6',
        desc: '商品描述，最多1行，超过显…',
        id: 4,
        price: '13.9',
        originPrice: '25.9',
        store: 0, //库存
        url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
      }]
    }]
  },
  extendHandle() {
    // 展开全部分类
    console.log('extendHandle')
    this.setData({
      categoryOpened: 1
    })
  },
  // 分类展开
  subClickableHandle(e) {
    console.log(e)
    console.log(e.detail)
    // const currentSortObj = e.detail
    this.setData({
      categoryOpened: 0
    })
  },
  dropdownMenuItemTap(e) {
    const clickable = e.target.dataset.clickable
    console.log(e)
    if (!clickable)
      this.setData({
        categoryOpened: 0
      })
  },
  getCategoryList(data) {
    return new Promise((resolve, reject) => {
      getCategoryList(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategoryList({
      pid: 0
    }).then(res => {
      this.setData({
        firstCategory: res.data
      })
    })

    setTabBar.call(this, {
      selected: 1
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    const query = wx.createSelectorQuery();
    // 在页面渲染完成OnReady回调 获取元素高度时，如果不加定时器，获取的元素的高度还是没渲染完异步数据前的高度
    query.select('.fixed').boundingClientRect(function (rect) {
      that.setData({
        // scrollViewHeight: that.store.data.systemInfo.screenHeight - (rect.height + 50),
        fixed: rect.height,
      })
    }).exec();

    query.select('.section1').boundingClientRect(function (rect) {
      that.setData({
        // scrollViewHeight: that.store.data.systemInfo.screenHeight - (rect.height + 50),
        section1H: rect.height,
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