// components/DropdownMenu/car.js
import store from '../../store/common'
import create from '../../utils/create'

import {
  addCart
} from '../../api/cart'

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
    userInfo: Object
  },
  observers: {
    'opened': function (val) {
      // console.log(val)
      if (val === 1) {
        // // 更新用户信息
        // this.setData({
        //   userInfo: store.data.userInfo
        // })

        // 没有初始化过才使用默认第一个规格
        if(!this.data.currentUnitId) {
          this.setData({
            currentUnitId: this.data.goodsDetail.unit_arr[0].id
          })
        }
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {

    height: 0,
    currentUnitIndex: 0,
    currentUnitId: null,
    myGoodsDetail: null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    specHandle(e) {
      console.log(e)
      this.setData({
        currentUnitIndex: e.target.dataset.index,
        currentUnitId: e.target.dataset.id
      })
    },
    dropdownItemTapHandle() {},
    addHandle() {
      this.setData({
        [`myGoodsDetail.unit_arr[${this.data.currentUnitIndex}].number`]: Number(this.data.myGoodsDetail.unit_arr[this.data.currentUnitIndex].number) + 1,
      })
    },
    reduceHandle() {
      // 不能小于0
      if (this.data.myGoodsDetail.unit_arr[this.data.currentUnitIndex].number - 1 <= -1) return

      this.setData({
        [`myGoodsDetail.unit_arr[${this.data.currentUnitIndex}].number`]: this.data.myGoodsDetail.unit_arr[this.data.currentUnitIndex].number - 1,
      })
    },
    inputBlurHandle(e) {
      // console.log(e)
      // 购买数量非法恢复原数值
      if (e.detail.value < 0) {
        this.setData({
          [`myGoodsDetail.unit_arr[${this.data.currentUnitIndex}].number`]: this.data.myGoodsDetail.unit_arr[this.data.currentUnitIndex].number,
        })
      } else {
        this.setData({
          [`myGoodsDetail.unit_arr[${this.data.currentUnitIndex}].number`]: e.detail.value,
        })
      }
    },
    // 加入购物车
    addCarHandle() {
      // console.log('addCarHandle')

      this.setData({
        opened: 0
      })

      let myData = {
        shop_id: store.data.shop_id,
        goods_id: this.data.myGoodsDetail.id,
        goods_num: this.data.myGoodsDetail.unit_arr[this.data.currentUnitIndex].number
      }

      if (this.data.myGoodsDetail.unit_arr.length === 1) {
        // 单单位
        myData.type = 1
      } else {
        // 多单位
        myData.type = 2
        myData.unit_id = this.data.myGoodsDetail.unit_arr[this.data.currentUnitIndex].id
      }

      this.addCart(myData).then(res => {
        // 更新详情页购物车数据
        this.triggerEvent('updateCartHandle')

        console.log(res)
      })
    },
    addCart(data) {
      return new Promise((resolve, reject) => {
        addCart(data).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
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