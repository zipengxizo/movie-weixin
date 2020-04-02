Component({
  properties: {
    tabBar: {
      type: Array,
      value: [],
    }
  },
  data: {
    selected : 0,
    // color: "#7A7E83",
    // selectedColor: "#3cc51f",
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
        "pagePath": "/pages/index/index",
        "iconPath": "/imgs/category.png",
        "selectedIconPath": "/imgs/category_on.png",
        "text": "我的"
      }
    ]
  },
  methods: {
    switchTab(e){
      const url = e.currentTarget.dataset.path;
      const index = e.currentTarget.dataset.index;
      wx.switchTab({url});
      this.setData({
        selected: index
      })
    }
  }
  
})