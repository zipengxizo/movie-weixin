const app = getApp();
Page({
  data: {
    movieList: [],
    cityId: wx.getStorageSync('cityId') || 1,
    cityName: wx.getStorageSync('cityName') || '北京',
    index: 1,
    show: false
  },
  onPullDownRefresh: function () {
    let params = { cityId: this.data.cityId };
    this.setData({show : true});
    if (this.data.index === 1) {
      app.api2.getMovieOnSelf(params).then((res)=>{
        let movieList = res.data.movieList;
        let changeMovieList = movieList.map((item) => {
          item.id = item.id + Math.random()*100;
          item.img = item.img.replace(/w\.h/, '128.180');
          return item;
        });
        movieList = 
        this.setData({ 
          movieList: [...this.data.movieList,...changeMovieList],
          show : false
        });
      });
    }else if(this.data.index === 2){
      app.api2.getMoiveComing(params).then((res)=>{
        let movieList = res.data.comingList;
        let changeMovieList = movieList.map((item) => {
          item.img = item.img.replace(/w\.h/, '128.180');
          return item;
        });
        this.setData({ 
          movieList:  [...this.data.movieList,...changeMovieList],
          show:false 
        });
      })
    }
    wx.stopPullDownRefresh();
  },
  onLoad: function () {
    let storegeCityId = wx.getStorageSync('cityId');
    let storeCityName = wx.getStorageSync('cityName');
    if (storegeCityId && storegeCityId !== this.data.cityId) {
      this.setData({ cityId: storegeCityId });
      this.setData({ cityName: storeCityName });
    };
    let params = { cityId: this.data.cityId };
    this.fetchOnMovie(params);
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
    this.setData({ index: index });
    this.data.index === 1 ? this.fetchOnMovie(params) : this.fetchComingMovie(params);
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
  fetchComingMovie(params) {
    wx.showLoading({mask:true});
    app.api2.getMoiveComing(params).then((res) => {
      let movieList = res.data.comingList;
      let changeMovieList = movieList.map((item) => {
        item.img = item.img.replace(/w\.h/, '128.180');
        return item;
      });
      this.setData({ movieList: changeMovieList });
      wx.hideLoading();
    }).catch((err) => {
      console.log(err);
    });

  },
  fetchOnMovie(params) {
    wx.showLoading({mask:true});
    app.api2.getMovieOnSelf(params).then((res) => {
      let movieList = res.data.movieList;
      let changeMovieList = movieList.map((item) => {
        item.img = item.img.replace(/w\.h/, '128.180');
        return item;
      });
      this.setData({ movieList: changeMovieList });
      wx.hideLoading();
    }).catch((err) => {
      console.log(err);
    });
  }
});