const app = getApp();
Page({
  data: {
    movieOnList: [],
    moviecomingList :[],
    widHeight:0,
    cityId: wx.getStorageSync('cityId') || 1,
    cityName: wx.getStorageSync('cityName') || '北京',
    show: false,
    currentTab:0
  },
  swiperTab(e){
    let currentTab = e.detail.current;
    this.setData({currentTab : currentTab});
    let params = { cityId: this.data.cityId };
    if (currentTab === 0) {
      this.fetchOnMovie(params,currentTab);
    }
    else if(currentTab === 1)
      this.fetchComingMovie(params,currentTab);
  },
  onPullDownRefresh: function () {
    let params = { cityId: this.data.cityId };
    this.setData({show : true});
    if (this.data.currentTab === 0) {
      app.api2.getMovieOnSelf(params).then((res)=>{
        let movieList = res.data.movieList;
        let changeMovieList = movieList.map((item) => {
          item.id = item.id + Math.random()*100;
          item.img = item.img.replace(/w\.h/, '128.180');
          return item;
        });
        movieList = 
        this.setData({ 
          movieOnList: [...this.data.movieOnList,...changeMovieList],
          show : false
        });
        this.getAllRects(this.data.currentTab);
      });
    }else if(this.data.currentTab === 1){
      app.api2.getMoiveComing(params).then((res)=>{
        let movieList = res.data.comingList;
        let changeMovieList = movieList.map((item) => {
          item.img = item.img.replace(/w\.h/, '128.180');
          return item;
        });
        this.setData({ 
          moviecomingList :  [...this.data.moviecomingList,...changeMovieList],
          show:false 
        });
        this.getAllRects(this.data.currentTab);
      })
    }
    wx.stopPullDownRefresh();
  },
  getAllRects(index){
    let movieItem = index === 0 ? this.data.movieOnList.length : this.data.moviecomingList.length;
    wx.createSelectorQuery().select('.movie_li').boundingClientRect((rect)=>{
      this.setData({
        height: rect.height ,
        widHeight: rect.height * movieItem + "px"
      })
    }).exec();
  },
  onLoad: function () {
    let storegeCityId = wx.getStorageSync('cityId');
    let storeCityName = wx.getStorageSync('cityName');
    if (storegeCityId && storegeCityId !== this.data.cityId) {
      this.setData({ cityId: storegeCityId });
      this.setData({ cityName: storeCityName });
    };
    let params = { cityId: this.data.cityId };
    this.fetchOnMovie(params,this.data.currentTab);
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  changeTabar(e) {
    let params = { cityId: this.data.cityId };
    let index = e.detail.index;
    this.setData({ 
      currentTab: index,
     });
    this.data.index === 1 ? this.fetchOnMovie(params,index) : this.fetchComingMovie(params,index);
  },
  detail(e) {
    let movieid = e.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '/pages/detail/detail?movieId=' + movieid,
      success: function (res) {
        res.eventChannel.emit('acceptMovieId', { data: { movieId: movieid } })
      }
    })
  },
  sell(e) {
    let movieid = e.currentTarget.dataset.movieid;
    if (!wx.getStorageSync('token')) {
      app.wx.navigateTo({
        url: '/pages/login/login'
      }).then((res) => {
        res.eventChannel.emit('fullUrl', { data: `/pages/detail/detail?movieId=${movieid}` });

      });
    } else {
      console.log(movieid);
      //预售页面
    }
  },
  fetchComingMovie(params,index) {
    wx.showLoading({mask:true});
    app.api2.getMoiveComing(params).then((res) => {
      let movieList = res.data.comingList;
      let changeMovieList = movieList.map((item) => {
        item.img = item.img.replace(/w\.h/, '128.180');
        return item;
      });
      this.setData({ moviecomingList: changeMovieList });
      wx.nextTick(()=>{
        this.getAllRects(index);
      })
      wx.hideLoading();
    }).catch((err) => {
      console.log(err);
    });

  },
  fetchOnMovie(params,index) {
    wx.showLoading({mask:true});
    app.api2.getMovieOnSelf(params).then((res) => {
      let movieList = res.data.movieList;
      let changeMovieList = movieList.map((item) => {
        item.img = item.img.replace(/w\.h/, '128.180');
        return item;
      });
      this.setData({ movieOnList : changeMovieList });
      wx.nextTick(()=>{
        this.getAllRects(index);
      });
      wx.hideLoading();
    }).catch((err) => {
      console.log(err);
    });
  }
});