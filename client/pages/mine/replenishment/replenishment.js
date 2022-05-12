// pages/mine/replenishment/replenishment.js
import store from '../../../store/common'
import create from '../../../utils/create'

import {
  getReplenishmentList,
  delReplenishment
} from '../../../api/commodity'

import {
  addNumCart
} from '../../../api/cart'
// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '快速补货',

    replenishmentList: {
      cache: [
        // {
        //   "id": 2,
        //   "goods_name": "[金谷园]  油粘米25kg(包)",
        //   "brand_id": 6,
        //   "category_id": 16,
        //   "goods_banner": "[\"https:\\/\\/sharepuls.xcmbkj.com\\/shop_adm_2021-12-288728.png\"]",
        //   "goods_image": "[\"https:\\/\\/sharepuls.xcmbkj.com\\/shop_adm_2021-12-283499.png\"]",
        //   "goods_content": "wewe",
        //   "spec": "",
        //   "sort": 0,
        //   "is_pre_sale": 1,
        //   "pay_delivery_day": 1,
        //   "price": "129.50",
        //   "market_price": "129.50",
        //   "sale_number": 4,
        //   "status": 2,
        //   "create_time": 0,
        //   "is_multi_unit": 0,
        //   "is_vip": 0,
        //   "is_sale": 1,
        //   "is_shop_check": -2,
        //   "thumb": "https://sharepuls.xcmbkj.com/shop_adm_2021-12-288728.png",
        //   "cart_number": 0,
        //   "stock": 0,
        //   "unit_arr": [{
        //     "id": 0,
        //     "goods_id": 2,
        //     "unitName": "1/袋",
        //     "price": "129.50",
        //     "market_price": "129.50",
        //     "number": 0,
        //     "cart_number": 0,
        //     "is_min_number": 1
        //   }],
        //   "activity_info": [],
        //   "one_cart_number": 0
        // },
        // {
        //   "id": 1,
        //   "goods_name": "锅锅香 珍珠米-25kg/袋锅锅香 珍珠米-25kg/袋锅锅香 珍珠米-25kg/袋锅锅香 珍珠米-25kg/袋",
        //   "brand_id": 2,
        //   "category_id": 16,
        //   "goods_banner": "[\"data:image\\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAABHNCSVQICAgIfAhkiAAAFTlJREFUeF7tnQ2UFNWVx\\/+3ZpjhYxQEZDi7cc8GPGMEBVxDohJlFLsbzsqCSciiDquyKwKj4UMG8CuMooiCCsq3JKI0YsLxg113Y\\/cgDHGz66o5u6LH3cVoosYEXMSDDMLAdN09rz66q2d6Zrq76tVHU52T057h1av77vv1vffdevcVIfyEGpCgAZLQZ9hlqAGEYIUQSNFACJYUtYadhmCFDEjRQAiWFLWGnYZghQxI0UAIlhS1hp2GYIUMSNFACJYUtYadhmCFDEjRQAiWFLWGnYZghQxI0UAIlhS1hp2GYIUMSNFACJYUtYadhmCFDEjRQAiWFLWGnYZghQxI0UAIlhS1hp2GYIUMSNFACJYUtYadhmC1Y6B2LVdVVmIYEwYwo4qAM6B\\/V4mmDLQQcFQltJD4P+OL1la831xPLSFOGQ2c1mBFNvEoBRjLUEcQqIaBGiIMKgYQZnxOwH4G7yco+1Rgb9MM+q9i+iqFa04fsBpZiQ3GhVBQy8y1RLgCQH\\/Jk3iYGb8CaI+ioPnVf8C7IGLJ9\\/RF9yUPVu1GHlgJ1DFxHQEXe6l1ZrxNRPFWxrbmW+mQl7LIvndJghV9lvvQcUxi5hsARIlQLluRhfTPjDYiJJgofrIHXm6+mU4Ucn0Q2pYUWBdv5B4DGH9H4AYQzgvCBADYpzIt79cfv9jxI0oFROZuxSwJsCZu5N6tKm4l4vkAvtHtqH3YgBkfEdGK1kpsKQULFniwouv5GjCvI8I5PuSlYJGY8SmIZidn0SsFX+yjCwILVnQtnwOF1xFwjY\\/06ZgoDLwClWYn6+lTxzp1saNAghVZx3XEvJ5IT1qW6ocZLUw0q2k2xYM2xkCBJbLiFaSuJ1Bd0BRtR14Gx0+yMitI2f3AgBVdxxeTyj8HYaidSQrstYwPWaG\\/Tc6m3wRhDIEAK\\/okTyDwSyBUBkGp0mRktDLRD5O3+T+w9z1Y0TU8ncCbAJRJm7AAdawlV5lmJ35MT\\/lZbF+DFXuCfwLi+\\/ysQK9kY1BD8nZa6dX9u7uvP8FipuiT6mYimt7dAE7nf2fwyuRtykI\\/Ptj2JVix1an1IJp5OkOT99iZVyfmlM3Nu71LDX0HVnR1qpFAS1waf0nchpnuTM6l5X4ajK\\/Aiq3mmQCv95OCgiKLyjStaa5\\/Eqm+ASu6iq8h5p0gKEGZTD\\/JKVaLTPSDprn0j36QyxdgjXuCh5Wr\\/BaA3n5QSlBlYMYxKHRJcg695\\/UYPAdLbHk5eYzfAmGY18oohfsz8B7a6JJkAx3zcjyegxV9LLWFQDd6qYRSuzczb0zeUebpqtpTsKKP8VQCby+1ifXFeJh+mLiDXvBKFs\\/Aql0pihz4v0EY6NXgS\\/q+jEOtoPObF3hTtOEZWNFHUxsIdGtJT67Hg2N45xI9ASvyMH9bKeM3wgfL0slLtYEufW0BiRW3qx\\/XwZryCy478nt+gwjfdnWkp+\\/N3ko0KN9xe\\/iugxV9mCeTwi+5PdDT+X6s0rXJRfSymzpwFyxmiq3gtwH8lexBMvurkp3IXVVb9SsqsJML6Ttu7oJwdbSatSJ51ioLpg5guQ1aO9VawPIGMpqQWEivyv5Bm\\/27C9ZyVcRW33V6cLmB0kHKtlxuwZVRazZExt8NyNwEjIG9yUVKrdO676w\\/18Aa\\/xDXMvEepweWBkezUDo4fSoZ4y4gXFZThgs9LmP96HNg3yeMnW+ncPAIoMNE4j80Wd2Ei5iufPVOanZ6DnL15xpYseWqCB4nOTkoDaq0y2PNOkUuJMwYV67B5bfPy28zNr2mH89gBcxFuHYmFiuT3dCLK2BNWMZnp4g\\/I6CHU4OyQsWsatbq6gsJ8\\/\\/aVwfLdBjuv+9XsfRFARe5br0YOHVMoQG\\/XkRHnZoHT11h7CFnN\\/BZ3Z8J1ZBBwJrpjnErVe\\/b\\/jWFba+nAFIycOlmTLp7VEE3N91JW6QOUHf28j\\/RZWozAWOdulPGWgn3pwKsYnldBUb8hSvDsT2MY62E+s0n8PkRM9ayWC8LYOaNnHSVWhB\\/l\\/wgXvpMRJfyN6Hwh0KFtmfEXOUZgboOmIpBfRlbbgtWLevG5Em8\\/Kbazh2agGl0ZdTlYKpCaIwUqkncSb91Yj48c4WxB3guiB93ahCmtTItlfiOjFQwf2KFU7dwpZ93P1HR8MxxEImd2NnxVnU\\/wqU1Cvr0JLz7MePdTwyRnHKVTPMS99AqmQN1xIp0JWDsAedWg7lcoACr7opy3DA2GPGVqat3P06h4eljRpylYMhgBZFRFbj0PAXVfbM1umsf8PgresBvBGF20xQ7E\\/fIXR3KBUsUnj7Ah4nQz4lfR3uwWE1prvCGseWoGxssiyX0sbW5FdX9FIw5v6Lb9Mhtm9vw0UFn0hQMfJFso0FoJLGclvKRClbkQR6lqPyfTkne0Q2mIOCqq+2ButpgxViF6uS511XE91rSFJoLLT7Bqip0UdPd8s6hlwpW7H6eCzgdX6n6YxpOaStCVttQV1uBuitLG6xte1PYtrct7TrN7H3xK0aal\\/iJvDhLKljR+1JbiJwplMjkrgRYeopBWCsNrCsFWD0LNQId2r\\/w+lf49XstaDnB+N4FffCDy\\/tqAbQfPgKqeHObHuxb819kXUnmLykzP5NcUnZT\\/lcU1lKq1qL3OZe\\/yhVfMacA4QoFWFfZA0tAtfZl40x\\/Y\\/U1uH85Fk0dhJFDvLeG25pPIb7nFEgpc8RqafmsJfLyWbLBOkBAdWGs526dFV+BdWsl3KHahmkaWL1s3eb6ZZ\\/iwOE2sfBPZ8C1DpkRG30G6if199R6xfecRLz5FIjKLFZLWK\\/iLBaAjxNLlL+0pbQuLpYGVm0j96sEf+mU4LorzGTaM2ClMO0q+2CNW\\/B7y66D9mphVPUkLJw6AGOGe1OsHd\\/TqlssEyylzPgRFB3EpxRQ\\/1820ldOzZG1H2lgRRp5lMIOrwhzgtWGaVdVom6cPYs1bsEn6WSlmSsyLZYOtA72mOG9UD+5P6rPcveAwfjuE4jv1l2hgEuPs3SLlUmwFoaISnRRU6OclaE0sGKNPB7MvyxsqJ237txiOQPW1Q1\\/0Ccr7QpN1ehbc8T\\/tG9WNet1Y6wvvn\\/5GU4Nr9t+dLBOAsJiGXDZBQtEExKNcnaVSgMrei9PJXKuyrlLsMbZt1hXN\\/wxE7vkiLN0sCwrUmaMHFqBRdcNdMV6xV87jq2vnQQp5RarJeIr6yOhbvnMasBM1yWX0vOFXZVfa2lgxe7lmSDnzrqSDVZk4YG0ezEnK6NCwxVmgZWBTMAVHd0nP40X2SoLLGFZ260Oi8lnqUw3Ny2Vs4VGJljOJ0c7i7GExbraXowVaThoWAI9T2SNW0yoTYtlfQBuPla6\\/+\\/PxpgL5AX28V3CYrXqFstwh+k4K\\/0Qu1BqaVZiKW0o9Kp82ksDK3o3Lybih\\/IRIp82XVqsq+2DFW34v2wrYDwySctmxFcZuPTnlPrqVMWYC3vi\\/uln5zOUotpoYO1yFiztiMkH5RwxGYJlTHN04aGclkD\\/58yq0AqTmaAVYI0c2gOP1hf1Oum8QAvBMtQUu1vCc8LOXKGwWBF7rjDa8EXOpbxYJZorQjOPZro\\/PUGrJ2pnTz4T379C3juj4k3OWyyAZiUeDJgrjN0tY597rgRpG6Y5BpaIXyyBsXV1aLjCTHyVgWrM8Ao03uzIzqBOrZcMsLTgfVnAgvfoXc4eqtZljBVxwGItEBYrs5TP5IiMuU7nsvTVoLBUfXqqmDmxN6Kj5T9L1MBqcjjGAl2XXBa0dMNiHg9yKUEqwIradIUCLMoFlghDzapqY1cFq7h0mII7ftQbVfZum1d8JRrFk86DBaYJieUBS5BG7nLxkY7jYJlbUywngxsWq09lCvOnVOKy4e7WL8oAS3uksyxgj3Rq53K\\/yp5uPIRuw7SoAxbrDmGxLM\\/hzIe8picEY9JlinavPj3dr7LWwEo66AoZqdZe1K+5kVryNpsFNJSWbhAyRBerzm6b6WxV6ARY8w91XBUaxQvV\\/UmzUiOGSFVXl9PmOFhi28zyAG6b0cBaqDYTOVOo2mXwLsCK2Qt2Vm4\\/iqa3TgGapcrsGqiLVuDayys8sVJW0uIJZy0WM\\/YmHwnqRr+Fzp3h3iVYMftgtRwHHt3egn9775T2SGfkuT0wc1IvDPkz76xUB7ASzrlC7Sz4FfLOgpeqtdhC55KkssEyJ1EAJj5urfbyDVt0i3VSX7k68hCa5iUeCWgxRaSBRylwZrNft2CNt+cK851gr9rFEyewVVgsS0pE35Zc3LYZFXRR0wo5K0KhI6kWC42sRI\\/x5wQMsDshpQjWvRsO4NxzKvG9kVUY+o2uK7lnrTiC3\\/1J7Md3YKMf43Ciis4ObMGqgCm2wJkS+y7BGl+JuoBZrHf2n8C8xz5L\\/7YHD+yBUTW9MWZkL4wZmb395qW9rdjw0teZLTNZW5OL2vO+M7EyyCX2Aqz5zhwK0ilYnEJkdBkW3CDvAbBda5vr+nc+aMW8R\\/+ob4XWfEfGpVX1LsOoml6oHlCGfb9N4aPPVH21auTZNPdnp5hCHArymLz4Sr4rFGDN43OZeL8IB+xMUDZY4mF0pvyrup+KZxvPstO969eu2\\/ElXtgtCmQsxRDpsnkDsnTqwyicyNrrbvytwE1+2gMEhYYmV9LvZA7a1mTnK1h0nv18VmYXp77DwQRLFKyK2sIVc87EiHPdfcyS7\\/jbtzt2nDHjgT\\/h4GFxJodex5jeDq39Ao2\\/afk0sxpHfHesKSy0QkfLXz0uL39ljtUVsGLz7O9\\/z1libxSsCsiG\\/Dlh\\/SK5W1eKBan9dc\\/+81d49pWj7cq3LKVc5naddNWQFS4DNks1USH73bWjIh+Ts1XGOk5XwBo3h6vLiD8lsne4rXmCn7bxTlgq6IeCmJvtIt8tR8O0dodLOUWDQ\\/0k3ziOR575sl1FkPUsUtNaiW+z0tmMvyzfRdQTMuMUyums5Er5b191BSxtdTjX\\/uqwQwBv2cGpnT6jphC5pAKzp\\/RFHx+mtV7cfQzrd4i4ymqBDIA0B5g5k1Rzj1kuUY\\/Fstxm4ccY7UyskrsadNUVamD9mMdDsbc\\/K1ecpRc3mIG8\\/i024MUuFcv2XhhR4+2BbB\\/+oQ3v\\/O8JvLi7BQcPs56HssZNlueSepxlnp7cDjTj71b4CnGB+kqNrnx1VYm9QECcqRqdw28Sin+dXHuwNKg0d2hUzJiAacccCciMIlOjitncsOeQV+uiGzOFYM2MZwJxfXeqEYhrq7oc8ZVOWOaI7qwi2sIPAmHgP5KrlUvkj934bbh1I3Gf6FyeTGzvJU0d3WFmV6dWNWMeyGa8VEC3aMbrUNx6I1hW\\/NPZCs+6mdCyKkxbLM3CWCxYJjtUqKUSVzLRtclV7r1azrUYS9cQU+x2\\/h8QaooFOstqdSh712v80qXw5v4tY2ux9fUoxd6\\/++usMJjuzAjOtVVeuxSCZolMi5ULpgxQOnOFTxkDHySfoPMAcm2HYuFSdq\\/ZLltEbuebFPDTdrrp4BKFOzTdnmapzPJ38+ijzAuc3HGHRqCtgWA9EcaaKsgkOK2Bei5HUgxMVv1qKYYn5acYrPd0HawpU7jsSDW\\/R4RvFQtXOqeV3lHa7uwsw5JlFZpqBtP6g3X6x2tRZdqqWN84kYmlMslQ6+k29lxdZ7oUL8Hse5Au2bGD9LdDufRxHSwxrkg9j1OId9kZY9pqabwI92daJcsBHumgXaPKuJ3TQLUfhalSSwCflczUc1HZVkpva9cy5dKnChrdtIbEW21d\\/XgClhhhtN7+wbdWuKxnWOkQWcriO1gr7V8dVXSHR6GdWK30i5iKzJwXIrR2gO1aeQfYdiWLZ2DVzuCBleX8EQi2Ti+zukXT1WVK4ru3VJnrC5myTNvOrUxHy6U7O0sSVJKV0qRjHGpto\\/ObN5FxYm9x4yv2Ks\\/A0qzWTJ5Kiv3D2bLhMCyREU9lWSZX0w36lGRZMosVk+X60iAQTU6spZ3FgmH3Ok\\/B0uCaZd8lmkrICVjmH+3qqrDrO6QFMqqWEUtZhWPwxuQ6eYUS+SjCc7AmzuDeJ8v4TQDD8xE43zZ2XVy+98m3nWyY0nIw3q9QafQ\\/baKv85VNRjvPwRKDitXzcKT4TRDkHYknQ3t+65PxdRvT6Nc20vtei+YLsIQSIrP4bxT9cY\\/lwASv1ROc+zMgXrRzbXIDveIHqX0DlgbXDK5XiNf4QTFBk0EFXd+0kbb7RW5fgaUF8zNSjUS0xC8KCoIc2lmim+ScJVrs+H0HlhZzzUitAai+2EGdVtcxr048VTbXb2P2JVja3q1b1EcItMBvCvOTPMy8KrlZme\\/mroV8x+9TsHTxo7fwAgKvyHcwp0s7UcJFoPmJzXJrA+3o09dgaW5xOt\\/CCq8jIBi1XXZmI59rGSkVdF3TT2lHPs29auN7sLTV4i08VlH5eRAGe6UoX9yXcUBVaGrTU7TXF\\/J0IUQgwBLy197EgysUft6pg9z8PjHt5ROFpidVmtq8hQ4EQfbAgCWUqW0SPFNdCqbFdkv2gzA5QkatJB78cN+jyj1ub9azo6NAgWUONDqdJxA4DqC\\/ncEH4NrDDKpL\\/owce++jW2MOJFjainEaD6Jy9UGAppfgYyCVmZ9GSrkruZU+dwsGJ+8TWLBMJcSm80hmXk1w5hBdJ5VbTF\\/i7fJENCfxM3qnmOv9ck3gwTIVGbmRo0R8HwGuFWU6OYkMvKESNe56mhJO9utVXyUDlgUwsUuiEYSLvFJqIffVgFKpcdfW0gDKHHvJgaUPjClyIyb6GbBSBarEwcrYjNrreGBlD9zAzHVExZ8bUYgV6qwtA78hpnhrG+LN270pcnBiHPn0UaIWK\\/fQozfxt5BCFOAriXCFC+mKw8z4FRE1q234l6bn6IN8JqUU2pxWYLWfsMj1PEpRMJZJHUGgGgZqCCjq\\/bsMiGPH9zN4P7GyT1Wxt+k5eeeo+x2+0xqsXJNTO4WrKntgGBMGsIIqUnEGxDdDO5aZCS1Q0cIKjpKKFmJ80XoK7zfvkPMWLb8D1Jl8IVhBnTmfyx2C5fMJCqp4IVhBnTmfyx2C5fMJCqp4IVhBnTmfyx2C5fMJCqp4IVhBnTmfyx2C5fMJCqp4IVhBnTmfyx2C5fMJCqp4IVhBnTmfyx2C5fMJCqp4IVhBnTmfyx2C5fMJCqp4IVhBnTmfyx2C5fMJCqp4IVhBnTmfyx2C5fMJCqp4IVhBnTmfyx2C5fMJCqp4IVhBnTmfyx2C5fMJCqp4\\/w8lC64eLRiw\\/gAAAABJRU5ErkJggg==\"]",
        //   "goods_image": "[\"https:\\/\\/sharepuls.xcmbkj.com\\/shop_adm_2022-02-173991.jpg\"]",
        //   "goods_content": "去问问",
        //   "spec": "3包",
        //   "sort": 0,
        //   "is_pre_sale": 0,
        //   "pay_delivery_day": 2,
        //   "price": 0,
        //   "market_price": "8.00",
        //   "sale_number": 30,
        //   "status": 2,
        //   "create_time": 0,
        //   "is_multi_unit": 1,
        //   "is_vip": 0,
        //   "is_sale": 1,
        //   "is_shop_check": -2,
        //   "thumb": "data:image/png;base64,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",
        //   "cart_number": 0,
        //   "stock": 0,
        //   "unit_arr": [],
        //   "activity_info": [],
        //   "one_cart_number": 0
        // }
      ],
      count: 1,
      total_page: 1,
    },

    page: 1,
    page_size: 10,

    refresherEnabled: false,
  },
  // 加入购物车
  addArtHandle(e) {
    const item = e.currentTarget.dataset.item
    const index = e.currentTarget.dataset.index

    let myData = {
      type: 1,
      shop_id: this.store.data.shop_id,
      goods_id: item.id,
      goods_num: item.one_cart_number + 1
    }
    this.addNumCart(myData).then(res => {
      this.store.data.checkedIds = this.store.data.checkedIds.concat(item.id + '.' + item.unit_arr[0].id)

      // 更改购物车数值
      wx.showToast({
        icon: 'none',
        title: '加入购物车成功',
      })

      this.setData({
        [`historyList.cache[${index}].cart_number`]: item.cart_number + 1,
        [`historyList.cache[${index}].one_cart_number`]: item.one_cart_number + 1,
      })
    })
  },
  //跳转至商品详情页
  itemHandle(e) {
    // console.log('itemHandle')
    // 该商品的拼团活动已结束 0:新建 1:上架 2:下架 3:删除

    const item = e.currentTarget.dataset.item

    if (item.status === 2 || item.status === 3) {
      return
    }

    wx.navigateTo({
      url: `/pages/goods/detail?id=${item.id}`,
    })
  },
  scrollToLower(e) {
    console.log(e)
    console.log('scrollToLower')

    let replenishmentList = this.data.replenishmentList

    if (replenishmentList.count + 1 > replenishmentList.total_page) return

    this.setData({
      [`replenishmentList.count`]: ++replenishmentList.count
    })

    this.getReplenishmentList('scrollToLower')
  },
  getReplenishmentList(dataObj) {
    const tempData = {
      page: this.data.replenishmentList.count,
      page_size: this.data.page_size,
      shop_id: this.store.data.shop_id
    }

    if (typeof dataObj === 'object') {
      Object.keys(dataObj).forEach(key => {
        tempData[key] = dataObj[key]
      })
    }

    return new Promise((resolve, reject) => {
      getReplenishmentList(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          this.data.replenishmentList.cache.push(...res.data.data)
          this.setData({
            [`replenishmentList.cache`]: this.data.replenishmentList.cache,
            [`replenishmentList.total_page`]: res.data.last_page
          })
          resolve(res)
        } else {
          this.setData({
            [`replenishmentList.cache`]: res.data.data,
            [`replenishmentList.total_page`]: res.data.last_page
          })
        }
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
  delGoodsHandle(e) {
    // console.log(e)
    this.setData({
      confirmTitle: '提示',
      confirmContent: '确定移除快速补货商品吗？',
      confirmBgColor: "#F23D32",
      confirmText: '确定',
      confirmDialogVisibile: true
    })

    // 分为2种情况1.收藏成功2.取消收藏
    const item = e.target.dataset.item
    // const index = e.target.dataset.index
    this.data.tempIndex = e.target.dataset.index

    const data = {
      goods_id: item.id,
    }

    this.data.tempDelGoodsData = data
  },
  diaConfirmHandle(params) {
    this.delReplenishment(this.data.tempDelGoodsData).then(res => {
      // console.log(res)
      this.data.replenishmentList.cache.splice(this.data.tempIndex, 1)
      this.setData({
        'replenishmentList.cache': this.data.replenishmentList.cache
      })
    })
  },
  delReplenishment(data) {
    return new Promise((resolve, reject) => {
      delReplenishment(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    const that = this;
    const query = wx.createSelectorQuery();
    // 在页面渲染完成OnReady回调 获取元素高度时，如果不加定时器，获取的元素的高度还是没渲染完异步数据前的高度
    query.select('.fixed').boundingClientRect(function (rect) {
      // console.log(rect)
      that.setData({
        fixed: rect.height,
      })
    }).exec();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
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

    this.getReplenishmentList().then(res => {
      console.log(res)
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})