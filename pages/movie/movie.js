import api from "../../utils/http.js";
import { url } from '../../utils/base.js'
const app = getApp();
Page({
  data: {
    movieList: [],
    cityId  :10
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    // this.fetchOnMovie(url.movieOn, { cityId: this.data.cityId });
    this.fetchOnMovie({cityId : this.data.cityId});

  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中...',
    });
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
    if (e.detail.index === 1) {
      this.fetchOnMovie(params);
    } else if (e.detail.index === 2) {
      this.fetchComingMovie(params);
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

  fetchComingMovie(params) {
    wx.showLoading({
      title: '加载中...',
    });
    app.api2.getMoiveComing(params).then((res) => {
      wx.hideLoading();
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
    wx.showLoading({
      title: '加载中...',
    });
    app.api2.getMovieOn(params).then((res) => {
      wx.hideLoading();
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
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