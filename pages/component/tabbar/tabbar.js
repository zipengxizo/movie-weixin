Component({
  properties: {
    cityName: {
      type: String,
      value: '',
    },
    currentTab:{
      type:Number,
      value :0
    }
  },
  data: {
    selected: 1,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/movie/movie",
      text: ""
    }, {
      pagePath: "/pages/movie/movie",
      text: "正在热映"
    }, {
      pagePath: "/pages/comingmoive/comingmoive",
      text: "即将上映"
    }, {
      pagePath: "/pages/movie/movie",
      text: ""
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const index = data.index;
      if (index === 0) {
        wx.navigateTo({
          url: '/pages/city/city',
        })
      }
      else if(index === 3){
        wx.navigateTo({
          url: '/pages/research/resarch',
        })
      }
      if (index === 1 || index === 2) {
        this.triggerEvent('changeTabar',{index:index - 1});
      }
      this.setData({
        selected: data.index
      })
    }
  }
})