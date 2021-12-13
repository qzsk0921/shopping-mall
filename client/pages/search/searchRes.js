// pages/search/searchRes.js
import store from '../../store/common'
import create from '../../utils/create'
import {
  getGoodsList
} from '../../api/commodity'
// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    navigationBarTitleText: '搜索',

    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    tabbar: ['综合', '销量', '价格'],
    tabIndex: 0, //0:综合 1:销量 2:价格
    // tabWidth: null,
    goodsList: [{
      cache: [{
        "id": 3,
        "goods_name": "商品3",
        "price": "40.00",
        "market_price": "100.00",
        "is_pre_sale": 0,
        "goods_content": "商品详情3",
        "spec": "10g",
        "is_vip": 0,
        "is_sale": 1,
        "is_shop_check": 1,
        "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
        "cart_number": 0
      }], //综合
      count: 1,
      total_page: 1,
    }, {
      cache: [], //销量
      count: 1,
      total_page: 1
    }, {
      cache: [], //价格
      count: 1,
      total_page: 1,
    }],
    page: 1,
    page_size: 10,
    currentPriceSort: null //3:价格从高到底 4:价格从低到高
  },
  watch: {
    goodsList: {
      handler(nv, ov, obj) {
        console.log(nv)
        if (nv.length) {
          const that = this;
          const query = wx.createSelectorQuery();
          query.select('.scroll-box').boundingClientRect(function (rect) {
            // console.log(rect)
            that.setData({
              scrollTop: rect.top,
            })
          }).exec();
        }
      },
      deep: true
    }
  },
  inputHandle(e) {
    console.log(e)
    this.data.searchKeyword = e.detail.value
  },
  cartClickHandle() {
    console.log('cartClickHandle')
  },
  changeTab(e) {
    console.log(e)
    const index = e.target.dataset.index

    let objData = {
      tabIndex: index,
    }
    console.log(index)
    if (this.data.goodsList[index].count > 1) {
      objData[[`goodsList[${index}].count`]] = 1
    }
    this.setData(objData)

    this.getGoodsList()

  },
  typeParse(index) {
    let type
    if (index === 0) {
      type = 0
      this.setData({
        currentPriceSort: null
      })
    } else if (index === 1) {
      type = 2
      this.setData({
        currentPriceSort: null
      })
    } else if (index === 2) {
      if (!this.data.currentPriceSort) {
        type = 3
        this.setData({
          currentPriceSort: type
        })
      } else if (this.data.currentPriceSort === 3) {
        type = 4
        this.setData({
          currentPriceSort: type
        })
      } else {
        type = 3
        this.setData({
          currentPriceSort: type
        })
      }
    }
    return type
  },
  getGoodsList(dataObj) {
    const tempData = {}
    if (typeof dataObj === 'object') {
      Object.keys(dataObj).forEach(key => {
        tempData[key] = dataObj[key]
      })
    }

    if (dataObj !== 'scrollTolwer') {
      tempData['per_page'] = this.data.page_size
      tempData['current_page'] = this.data.goodsList[this.data.tabIndex].count
    }


    tempData.order_by_type = this.typeParse(this.data.tabIndex)

    return new Promise((resolve, reject) => {
      getGoodsList(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          this.data.goodsList[this.data.tabIndex].cache.push(...res.data.data)
          this.setData({
            [`goodsList[${this.data.tabIndex}].cache`]: this.data.goodsList[this.data.tabIndex].cache,
            [`goodsList[${this.data.tabIndex}].total_page`]: res.data.last_page
          })
          resolve(res)
          console.log(this.data.goodsList)
        } else {
          this.setData({
            // 测试数据
            // [`goodsList[${this.data.tabIndex}].cache`]: [].concat(res.data.data).concat(res.data.data).concat(res.data.data).concat(res.data.data),
            // [`goodsList[${this.data.tabIndex}].cache`]: [],
            [`goodsList[${this.data.tabIndex}].cache`]: res.data.data,
            [`goodsList[${this.data.tabIndex}].total_page`]: res.data.last_page
          })
          console.log(this.data.goodsList[this.data.tabIndex].cache)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().setWatcher(this) //设置监听器

    const {
      keyword
    } = options
    this.data.keyword = keyword
    this.getGoodsList()
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