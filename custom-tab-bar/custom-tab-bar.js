Component({
  data: {
    selected: 1,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/movie/movie",
      iconPath: "/image/icon_component.png",
      selectedIconPath: "/image/icon_component_HL.png",
      text: ""
    }, {
      pagePath: "/pages/movie/movie",
      iconPath: "/image/icon_API.png",
      selectedIconPath: "/image/icon_API_HL.png",
      text: "正在热映"
    }, {
      pagePath: "/pages/comingmoive/comingmoive",
      iconPath: "/image/icon_API.png",
      selectedIconPath: "/image/icon_API_HL.png",
      text: "即将上映"
    }, {
      pagePath: "/pages/movie/movie",
      iconPath: "/image/icon_API.png",
      selectedIconPath: "/image/icon_API_HL.png",
      text: ""
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path;
      console.log(url);
      wx.navigateTo({url});
      console.log(data.index);
      this.setData({
        selected: data.index
      })
    }
  }
})