// components/DropdownMenu/car.js
import store from '../../store/common'
import create from '../../utils/create'
// Component({
create({
  /**
   * 组件的属性列表
   */
  properties: {
    opened: {
      type: Number,
      value: 0
    },
    goodsDetail: Object,
  },
  observers: {
    'opened': function (val) {
      // console.log(val)
      if (val === 1) {
        // // 更新用户信息
        // this.setData({
        //   userInfo: store.data.userInfo
        // })
        this.setData({
          currentUnitId: this.data.goodsDetail.unit_arr[0].id
        })
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    height: 0,
    currentUnitId: null,
    myGoodsDetail: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    specHandle(e) {
      console.log(e)
      this.setData({
        currentUnitId: e.target.dataset.id
      })
    },
    dropdownItemTapHandle() {},
    addHandle() {
      this.setData({
        'myGoodsDetail.cart_number': ++this.data.myGoodsDetail.cart_number
      })
    },
    reduceHandle() {
      // 不能小于0
      if (this.data.myGoodsDetail.cart_number - 1 <= -1) return

      this.setData({
        'myGoodsDetail.cart_number': --this.data.myGoodsDetail.cart_number
      })
    },
    inputBlurHandle(e) {
      // console.log(e)
      this.setData({
        'myGoodsDetail.cart_number': e.detail.value
      })
    },
    addCarHandle() {
      console.log('addCarHandle')
      this.setData({
        opened: 0
      })
    }
  },
  lifetimes: {
    ready() {
      // this.setData({
      //   userInfo: store.data.userInfo
      // })
      // 在组件在视图层布局完成后执行
      const query = wx.createSelectorQuery().in(this)
      query.select('.dropdown-item-down__content').boundingClientRect(rect => {
        console.log(rect)
        this.setData({
          height: rect.height
        })
      }).exec()
    },
    attached: function () {
      this.setData({
        myGoodsDetail: this.data.goodsDetail
      })
      // 在组件实例进入页面节点树时执行
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})