
const app = getApp();
Page({
  data: {
    movieList: [],
    cityId: wx.getStorageSync('cityId') || 1,
    cityName: wx.getStorageSync('cityName') || '北京',
    index: 1
  },
  onPullDownRefresh: function () {
    let params = { cityId: this.data.cityId };
    this.data.index === 1 ? this.fetchOnMovie(params) :
      this.fetchComingMovie(params);
  },
  onLoad: function () {
    let storegeCityId = wx.getStorageSync('cityId');
    let storeCityName = wx.getStorageSync('cityName');
    if (storegeCityId && storegeCityId !== this.data.cityId) {
      this.setData({ cityId: storegeCityId });
      this.setData({ cityName: storeCityName });
    }
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
    if (!wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      let movieid = e.currentTarget.dataset.movieid;
      console.log(movieid);
    }
  },

  fetchComingMovie(params) {
    app.api2.getMoiveComing(params).then((res) => {
      let movieList = res.data.comingList;
      console.log(res)
      console.log(movieList)
      let changeMovieList = movieList.map((item) => {
        item.img = item.img.replace(/w\.h/, '128.180');
        return item;
      });
      this.setData({ movieList: changeMovieList });
    }).catch((err) => {
      console.log(err);
    });

  },
  fetchOnMovie(params) {
    app.api2.getMovieOn(params).then((res) => {
      let movieList = res.data.movieList;
      let changeMovieList = movieList.map((item) => {
        item.img = item.img.replace(/w\.h/, '128.180');
        return item;
      });
      this.setData({ movieList: changeMovieList });
    }).catch((err) => {
      console.log(err);
    });
  }
});