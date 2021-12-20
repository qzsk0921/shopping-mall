// pages/shopping/shopping.js
import {
  setTabBar
} from '../../utils/business'
import store from '../../store/common'
import create from '../../utils/create'

import {
  getCartData,
  addNumCart,
  delCart,
  getRecommendList
} from '../../api/cart'

import {
  preOrder
} from '../../api/order'

import {
  getMyCouponList
} from '../../api/coupon'

let timerSearchObject = null

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    totalPrice: 0, //总计
    discountPrice: 0, //总优惠

    select_all: true, //全选
    checkedIds: [], //选中的ids

    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '购物车',
    navStatus: 'isEmpty',
    // 购物车商品 优先判断 下架 其次判断 库存
    cartData: {
      cache: [
        // {
        //   "id": 1,
        //   "is_pre_sale": 0,
        //   "goods_name": "商品2",
        //   "price": 10.6,
        //   "market_price": 100.00,
        //   "status": 3,
        //   "spec": "10g",
        //   "is_vip": 1,
        //   "is_sale": 1,
        //   "is_shop_check": 1,
        //   "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
        //   "stock": 0,
        //   "activity_info": [],
        //   "cart_number": 2,
        //   "unit_id": "1",
        //   "type": "1",
        //   "unitName": "1/个",
        //   "is_stock": 0
        // },
        // {
        //   "id": 2,
        //   "is_pre_sale": 1,
        //   "goods_name": "商品1",
        //   "price": 35,
        //   "market_price": 99,
        //   "status": 1,
        //   "spec": "10g",
        //   "is_vip": 1,
        //   "is_sale": 1,
        //   "is_shop_check": 1,
        //   "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
        //   "stock": 10,
        //   "activity_info": {
        //     "activity_id": 1,
        //     "activity_name": "新品上市",
        //     "short_name": "好",
        //     "type": 1,
        //     "start_time": 0,
        //     "end_time": 0
        //   },
        //   "cart_number": 2,
        //   "unit_id": 1,
        //   "type": 2,
        //   "unitName": "1/个",
        //   "is_stock": 1
        // },
        // {
        //   "id": 3,
        //   "is_pre_sale": 1,
        //   "goods_name": "商品1",
        //   "price": 350,
        //   "market_price": 990,
        //   "status": 1,
        //   "spec": "10g",
        //   "is_vip": 1,
        //   "is_sale": 1,
        //   "is_shop_check": 1,
        //   "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
        //   "stock": 0,
        //   "activity_info": {
        //     "activity_id": 1,
        //     "activity_name": "新品上市",
        //     "short_name": "好",
        //     "type": 1,
        //     "start_time": 0,
        //     "end_time": 0
        //   },
        //   "cart_number": 1,
        //   "unit_id": "2",
        //   "type": "2",
        //   "unitName": "1/箱",
        //   "is_stock": 0
        // }
      ],
      "total": 3,
      "coupon_total": 3,
      // count: 1,
      // total_page: 1,
    },

    // 猜你喜欢
    recommendList: {
      cache: [],
      count: 1,
      total_page: 1,
    },
    page: 1,
    page_size: 10,

    refresherEnabled: false,
    triggered: false,
  },
  watch: {
    checkedIds: {
      handler(nv, ov, obj) {
        console.log(nv)
        clearTimeout(timerSearchObject)
        timerSearchObject = setTimeout(() => {
          if (nv.length) {
            let totalPrice = 0
            let discountPrice = 0
            this.data.cartData.cache.forEach(item => {
              if (nv.includes(item.id)) {
                // 有库存并且未下架或删除
                if (![2, 3].includes(item.status) && item.is_stock) {
                  if (this.store.data.userInfo.is_vip) {
                    // 会员
                    totalPrice += (item.price * item.cart_number)
                    discountPrice += ((item.market_price - item.price) * item.cart_number)
                  } else {
                    // 非会员
                    totalPrice += (item.market_price * item.cart_number)
                  }
                }
              }
            })
            this.setData({
              totalPrice,
              discountPrice
            })
          } else {
            this.setData({
              totalPrice: 0,
              discountPrice: 0
            })
          }
        }, 0)
      },
      // immediate: true
    },
    'cartData.cache': {
      handler(nv, ov, obj) {
        // console.log(obj)

        // 修改购物车数量和修改购物车选择
        // clearTimeout(timerSearchObject)
        // timerSearchObject = setTimeout(() => {
        if (typeof nv === 'object') {
          let totalPrice = 0
          let discountPrice = 0
          nv.forEach((item, index) => {
            // 有库存并且未下架或删除
            if (![2, 3].includes(item.status) && item.is_stock && this.data.checkedIds.includes(item.id)) {
              if (this.store.data.userInfo.is_vip) {
                // 会员
                totalPrice += (item.price * item.cart_number)
                discountPrice += ((item.market_price - item.price) * item.cart_number)
              } else {
                // 非会员
                totalPrice += (item.market_price * item.cart_number)
              }
            }
          })

          this.setData({
            totalPrice,
            discountPrice
          })
        }
        // }, 200)
      },
      deep: true
    }
  },
  // 增加商品数量
  addHandle(e) {
    const item = e.currentTarget.dataset.item

    const cartData = {
      type: item.type,
      shop_id: this.store.data.shop_id,
      goods_id: item.id,
      goods_num: Number(item.cart_number) + 1,
      // goods_num: 1, //-1为扣减
      unit_id: item.unit_id
    }

    this.addNumCart(cartData).then(res => {
      this.getCartData()
      // this.setData({
      //   [`cartData.cache[${index}].cart_number`]: Number(item.cart_number) + 1,
      // })
    }).catch(err => {
      console.log(err.msg)
      this.getCartData()
      // this.setData({
      //   [`cartData.cache[${index}].cart_number`]: Number(item.cart_number),
      // })
    })
  },
  // 减少商品数量
  reduceHandle(e) {
    const item = e.currentTarget.dataset.item
    // 不能小于0
    if (item.cart_number - 1 <= -1) return
    const cartData = {
      type: item.type,
      shop_id: this.store.data.shop_id,
      goods_id: item.id,
      goods_num: item.cart_number - 1,
      // goods_num: -1, //-1为扣减
      unit_id: item.unit_id
    }

    this.addNumCart(cartData).then(res => {
      this.getCartData()
    })
  },
  // 输入商品数量
  // inputBlurHandle(e) {
  //   // console.log(e)
  //   const item = e.currentTarget.dataset.item
  //   const index = e.currentTarget.dataset.index
  //   // 购买数量非法恢复原数值
  //   if (e.detail.value < 0) {
  //     this.setData({
  //       [`cartData.cache[${index}].cart_number`]: item.cart_number,
  //     })
  //   } else {
  //     const cartData = {
  //       type: item.type,
  //       shop_id: this.store.data.shop_id,
  //       goods_id: item.id,
  //       goods_num: e.detail.value - 0, //-1为扣减
  //       unit_id: item.unit_id
  //     }

  //     this.addNumCart(cartData).then(res => {
  //       this.setData({
  //         [`cartData.cache[${index}].cart_number`]: e.detail.value,
  //       })
  //     }).catch(err => {
  //       console.log(err.msg)
  //       this.setData({
  //         [`cartData.cache[${index}].cart_number`]: item.cart_number,
  //       })
  //     })
  //   }
  // },
  couponHandle() {
    // 1.有购物券 跳转至我的购物券 2.没购物券 跳转至领券中心页面
    if (this.data.cartData.coupon_total) {
      wx.navigateTo({
        url: '/pages/mine/coupon/coupon',
      })
    } else {
      wx.navigateTo({
        url: '/pages/mine/coupon/center',
      })
    }
  },
  // 生成订单并导航至订单详情页
  confirmationOrderHandle() {
    // 授权校验
    if (!this.checkAuth()) return
    // 资质校验
    if (!this.certCheck()) return

    if (!this.data.cartData.total) {
      wx.showToast({
        icon: 'none',
        title: '没有选中任何商品',
      })
    } else {

      let orderData = {
        shop_id: this.store.data.shop_id,
        address_id: this.store.data.address_id,
        is_use_coupon: 0,
        // coupon_id: null,
        goods: []
      }

      this.data.cartData.cache.forEach(item => {
        const temp = {
          "goods_id": item.id,
          "goods_num": item.cart_number,
          "type": item.type,
          "is_pre_goods": item.is_pre_sale,
          "unit_id": item.unit_id
        }

        if (item.checked) {
          orderData.goods.push(temp)
        }
      })

      this.preOrder(orderData).then(res => {
        const pre = JSON.stringify(res.data)
        wx.navigateTo({
          url: `/pages/shop/order/confirmOrder?preData=${pre}`,
        })
      })
    }
  },
  // 授权检查
  checkAuth() {
    if (!this.data.userInfo.avatar_url) {
      // 未授权先去授权页
      wx.navigateTo({
        url: '/pages/authorization/identity',
      })
      return false
    } else if (!this.data.userInfo.phone) {
      // 授权昵称头像还未授权手机号
      wx.navigateTo({
        url: '/pages/authorization/phone',
      })
      return false
    }
    return true
  },
  // 资质认证检查
  certCheck() {
    // 若用户没有通过资质认证，显示弹窗如下图
    // 若用户资质认证已申请，待审核，提示弹窗如下图
    // -2:未申请 0:审核中 1:已通过 -1:已删除
    const status = this.store.data.userInfo.is_shop_check
    if (status != 1) {
      if (status === 2) {
        this.setData({
          confirmTitle: '温馨提示',
          confirmContent: '请进行资质认证后再开通会员',
          confirmBgColor: "#FF723A",
          confirmDialogVisibile: true
        })
      } else if (status === 0) {
        this.setData({
          confirmTitle: '温馨提示',
          confirmContent: '资质认证审核中，请等待审核过后再开通会员',
          confirmBgColor: "#FF723A",
          confirmDialogVisibile: true
        })
      }
      return false
    }
    return true
  },
  // 删除购物车中的商品
  delGoodsHandle(e) {
    // console.log('delGoodsHandle')
    this.setData({
      confirmTitle: '提示',
      confirmContent: '确定要删除该商品吗？',
      confirmBgColor: "#F23D32",
      confirmText: '删除',
      confirmDialogVisibile: true
    })
    const item = e.currentTarget.dataset.item
    const cartData = {
      type: item.type, //1：单单位（列表页面和购物车页面） 2:多单位（商品详情和购物车）3:清空购物车
      shop_id: this.store.data.shop_id,
      goods_id: item.id,
      unit_id: item.unit_id
    }
    this.data.tempDelGoodsData = cartData
  },
  diaConfirmHandle(params) {
    this.delCart(this.data.tempDelGoodsData).then(res => {
      // 更新购物车数据
      this.getCartData()
    })
  },
  // 单选
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    const myIds = e.detail.value.map(id => id - 0)
    let setData = {
      checkedIds: myIds
    }

    if (myIds.length) {
      // 控制全选按钮
      if (myIds.length === this.data.cartData.cache.filter(item =>
          ![2, 3].includes(item.status) && item.is_stock).length) {
        if (!this.data.select_all) setData.select_all = true
      } else {
        if (this.data.select_all) setData.select_all = false
      }
    } else {
      // 控制全选按钮
      setData.select_all = false
    }

    this.setData(setData)
  },
  // 全选与反选
  checkboxAllChange(e) {
    console.log(e)
    const flag = Boolean(e.detail.value.length)

    let arr = []; //存放选中id的数组

    // 全选或全不选
    this.data.cartData.cache.forEach(item => {
      // 有库存并且未下架或删除
      if (![2, 3].includes(item.status) && item.is_stock) {
        if (flag) arr = arr.concat(item.id)
      }
    })

    this.setData({
      select_all: flag,
      checkedIds: arr
    })
  },
  //跳转至商品详情页
  toGoodsDetail(e) {
    wx.navigateTo({
      url: `/pages/goods/detail?id=${e.currentTarget.dataset.id}`,
    })
  },
  // 加入购物车
  addArtHandle(e) {
    const item = e.currentTarget.dataset.item
    let myData = {
      type: 1,
      shop_id: this.store.data.shop_id,
      goods_id: item.id,
      goods_num: item.cart_number + 1
      // goods_num: 1
    }
    this.addNumCart(myData).then(res => {
      // // 更新详情页购物车数据
      // this.getCartData({
      //   shop_id: this.store.data.shop_id
      // }).then(res => {
      //   // console.log(res)
      // })
    })
  },
  scrollToLower(e) {
    console.log(e)
    console.log('scrollToLower')

    // let recommendList = this.data.recommendList

    // if (recommendList.count + 1 > recommendList.total_page) return

    // this.setData({
    //   'recommendList.count': ++recommendList.count
    // })

    this.getRecommendList('scrollToLower')
  },
  getCartData(dataObj) {
    const tempData = {
      // page: this.data.cartData.count,
      // page_size: this.data.page_size,
      shop_id: this.store.data.shop_id
    }

    if (typeof dataObj === 'object') {
      Object.keys(dataObj).forEach(key => {
        tempData[key] = dataObj[key]
      })
    }

    return new Promise((resolve, reject) => {
      getCartData(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          this.data.cartData.cache.push(...res.data.list)
          this.setData({
            'cartData.cache': this.data.cartData.cache,
          })
        } else {
          this.setData({
            'cartData.cache': res.data.list,
            'cartData.total': res.data.total,
            'cartData.coupon_total': res.data.coupon_total
          })
        }
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  addNumCart(data) {
    return new Promise((resolve, reject) => {
      addNumCart(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  delCart(data) {
    return new Promise((resolve, reject) => {
      delCart(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  preOrder(data) {
    return new Promise((resolve, reject) => {
      preOrder(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getRecommendList(dataObj) {
    const tempData = {
      // page: this.data.recommendList.count,
      // page_size: this.data.page_size,
      shop_id: this.store.data.shop_id
    }

    if (typeof dataObj === 'object') {
      Object.keys(dataObj).forEach(key => {
        tempData[key] = dataObj[key]
      })
    }

    return new Promise((resolve, reject) => {
      getRecommendList(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          this.data.recommendList.cache.push(...res.data)
          this.setData({
            'recommendList.cache': this.data.recommendList.cache,
            // 'recommendList.total_page': res.data.last_page
          })
          resolve(res)

          console.log(this.data.recommendList)
        } else {
          this.setData({
            // 测试数据
            // [`recommendList.cache`]: [].concat(res.data.data).concat(res.data.data).concat(res.data.data).concat(res.data.data),
            'recommendList.cache': res.data,
            // 'recommendList.total_pag': res.data.last_page
          })
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
    setTabBar.call(this, {
      selected: 2
    })

    getApp().setWatcher(this) //设置监听器
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    const query = wx.createSelectorQuery();
    // 在页面渲染完成OnReady回调 获取元素高度时，如果不加定时器，获取的元素的高度还是没渲染完异步数据前的高度
    // query.select('.fixed').boundingClientRect(function (rect) {
    //   that.setData({
    //     fixed: rect.height,
    //   })
    // }).exec();


    query.select('.scroll-box').boundingClientRect(function (rect) {
      that.setData({
        scrollBoxT: rect.top,
      })
    }).exec();

    query.select('.bottom').boundingClientRect(function (rect) {
      that.setData({
        bottomH: rect.height,
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

    if (!this.data.userInfo) {
      this.setData({
        userInfo: this.store.data.userInfo
      })
    }

    // getMyCouponList({
    //   type: 0
    // }).then(res => {
    //   console.log(res)
    //   this.setData({
    //     coupon_total: res.data.data.length
    //   })
    // })

    this.getCartData().then(res => {
      let arr = []
      // 全选或全不选 的处理
      res.data.list.forEach(item => {
        // 有库存并且未下架或删除
        if (![2, 3].includes(item.status) && item.is_stock) {
          if (this.data.select_all) arr = arr.concat(item.id)
        }
      })

      this.setData({
        checkedIds: arr
      })
    })

    this.getRecommendList()
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