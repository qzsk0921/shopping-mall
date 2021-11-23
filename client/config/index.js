export default {
  baseUrl: 'https://wms.wljkxys.com',
  // baseUrl:'https://mbapp-test.xcmbkj.com', //测试
  contentType: 'application/json',
  tencentKey: 'NMUBZ-KWM6V-E5IPZ-UARUF-6CKRH-FFBM2',
  // tencentKey: 'SIIBZ-BL36R-R54WV-WXKZM-OUTBQ-ZWFPR',
  tabBar: {
    list: [{
      "pagePath": "/pages/index/index",
      "text": "首页",
      "iconPath": "/assets/images/nav_icon_car_uncheck.png",
      "selectedIconPath": "/assets/images/nav_icon_car_check.png"
    },
    {
      "pagePath": "/pages/category/category",
      "text": "分类",
      "iconPath": "/assets/images/nav_icon_car_uncheck.png",
      "selectedIconPath": "/assets/images/nav_icon_car_check.png"
    },
    {
      "pagePath": "/pages/shopping/shopping",
      "text": "购物车",
      "iconPath": "/assets/images/nav_icon_car_uncheck.png",
      "selectedIconPath": "/assets/images/nav_icon_car_check.png"
    },
    {
      "pagePath": "/pages/profile/profile",
      "text": "个人中心",
      "iconPath": "/assets/images/nav_icon_my_uncheck.png",
      "selectedIconPath": "/assets/images/nav_icon_my_check.png"
    }]
  }
}