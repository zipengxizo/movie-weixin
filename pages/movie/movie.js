import api from "../../utils/http.js";
import { url } from '../../utils/base.js'
const app = getApp();
Page({
  data: {
    movieList: []
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading({
      complete: (res) => { },
    });
    this.fetchOnMovie(url.movieOn, { cityId: 10 });

  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中...',
    })
    app.api2.getMovieOn({cityId : 10}).then((res) => {
      wx.hideLoading();
      let movieList = res.data.movieList;
      let changeMovieList = movieList.map((item) => {
        item.img = item.img.replace(/w\.h/, '128.180');
        return item;
      });
      this.setData({ movieList: changeMovieList });
    }).catch((err) => {
      console.log(err);
    });
    // this.fetchOnMovie(url.movieOn, { cityId: 10 });
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
    let params = { cityId: 10 };
    if (e.detail.index === 1) {
      this.fetchOnMovie(url.movieOn, params);
    } else if (e.detail.index === 2) {
      this.fetchComingMovie(url.movieComing, params);
    }
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

  fetchComingMovie(url, params) {
    wx.showLoading({
      title: '加载中',
    });
    let that = this;
    api.get(url, params).then((res) => {
      wx.hideLoading();
      let movieList = res.data.data.comingList;
      let changeMovieList = movieList.map((item) => {
        item.img = item.img.replace(/w\.h/, '128.180');
        return item;
      });
      that.setData({ movieList: changeMovieList });
    }).catch((err) => {
      console.log(err);
    })
  },
  fetchOnMovie(url, params) {
    wx.showLoading({
      title: '加载中',
    });
    let that = this;
    api.get(url, params).then((res) => {
      wx.hideLoading();
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh()
      let movieList = res.data.data.movieList;
      let changeMovieList = movieList.map((item) => {
        item.img = item.img.replace(/w\.h/, '128.180');
        return item;
      });
      that.setData({ movieList: changeMovieList });
    }).catch((err) => {
    })
  }
});