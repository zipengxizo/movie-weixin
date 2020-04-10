Component({
  properties: {
    tabBar: {
      type: Array,
      value: [],
    }
  },
  data: {
    selected : 0,
    cartCount : wx.getStorageSync('cartCout'),
    // color: "#7A7E83",
    selectedColor: "#dd3924",
    list : [
      { "current":0,
        "pagePath": "/pages/movie/movie",
        "iconPath": "/imgs/home.png",
        "selectedIconPath": "/imgs/home_on.png",
        "text": "电影"
      },
      {
        "current": 0,
        "pagePath": "/pages/cinema/cinema",
        "iconPath": "/imgs/message.png",
        "selectedIconPath": "/imgs/message_on.png",
        "text": "影院"

      },
      {
        "current": 0,
        "pagePath": "/pages/cart/cart",
        "iconPath": "/imgs/cart.png",
        "selectedIconPath": "/imgs/cart_on.png",
        "text": "购物车"
      },
      {
        "current": 0,
        "pagePath": "/pages/center/center",
        "iconPath": "/imgs/category.png",
        "selectedIconPath": "/imgs/category_on.png",
        "text": "我的"
      }
    ]
  },
  methods: {
    switchTab(e){
      const url = e.currentTarget.dataset.path;
      wx.switchTab({url});
    },
  },
  lifetimes: {
    attached: function() {
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  
})