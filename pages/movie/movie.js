const app = getApp();
Page({
  data: {
    movieOnList: [],
    moviecomingList: [],
    widHeight: 0,
    cityId: app.globalData.cityId,
    cityName: app.globalData.cityName,
    show: false,
    currentTab: 0,
    bottomShow: false,
    tip: '下拉加载'
  },
  swiperTab(e) {
    let currentTab = e.detail.current;
    console.log(currentTab);
    this.setData({ currentTab: currentTab });
    let {cityId,movieOnList,moviecomingList} = this.data;
    let params = { cityId: cityId };
    //重新计算swiper的高度
    this.getAllRects(currentTab);
    if (currentTab === 0 && movieOnList.length === 0) {
      wx.showLoading();
      this.fetchOnMovie(params, currentTab).then(()=>{
        wx.hideLoading();
      })
    }
    else if (currentTab === 1 && moviecomingList.length === 0){
      wx.showLoading();
      this.fetchComingMovie(params, currentTab).then(()=>{
        wx.hideLoading();
      })
    }
  },
  onReachBottom() {
    let { cityId, currentTab } = this.data;
    let params = { cityId: cityId };
    this.setData({
      tip: '加载中...',
      bottomShow: true
    });
    if (currentTab === 0) {
      //1:添加到尾部
      this.fetchOnMovie(params, currentTab, 1).then(()=>{
        this.setData({
          tip: '下拉加载',
          bottomShow: false
        });
      })
    }
    else if (currentTab === 1) {
      this.fetchComingMovie(params, currentTab, 1).then(()=>{
        this.setData({
          tip: '下拉加载',
          bottomShow: false
        });
      })
    }
  },
  onPullDownRefresh: function () {
    let { cityId, currentTab } = this.data;
    let params = { cityId: cityId };
    this.setData({ show: true });
    wx.showLoading({ mask: true });
    if (currentTab === 0) {
      this.fetchOnMovie(params, currentTab, 0).then(() => {
        this.setData({ show: false });
        wx.hideLoading();
      });
    } else if (currentTab === 1) {
      this.fetchComingMovie(params, currentTab, 0).then(() => {
        this.setData({ show: false });
        wx.hideLoading();
      })
    }
    wx.stopPullDownRefresh();
  },
  getAllRects(index) {
    let movieItem = index === 0 ? this.data.movieOnList.length : this.data.moviecomingList.length;
    wx.createSelectorQuery().select('.movie_li').boundingClientRect((rect) => {
      this.setData({
        widHeight: rect.height * movieItem + "px"
      })
    }).exec();
  },
  onLoad: function () {
    let { cityId, currentTab } = this.data;
    let storegeCityId = wx.getStorageSync('cityId');
    let storeCityName = wx.getStorageSync('cityName');
    if (storegeCityId && storegeCityId !== cityId) {
      this.setData({ cityId: storegeCityId });
      this.setData({ cityName: storeCityName });
    };
    let params = { cityId: cityId };
    this.fetchOnMovie(params, currentTab);
  },
  changeTabar(e) {
    let index = e.detail.index;
    this.setData({
      currentTab: index,
    });
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
    }
  },
  fetchComingMovie(params, index, order = 0) {
    return new Promise((resolve, reject) => {
      app.api2.getMoiveComing(params).then((res) => {
        let movieList = res.data.comingList;
        let changeMovieList = movieList.map((item) => {
          item.img = item.img.replace(/w\.h/, '128.180');
          return item;
        });
        if (order === 0) {
          this._movieComingListSet(changeMovieList, this.data.moviecomingList);
        }
        else if (order === 1) {
          this._movieComingListSet(this.data.moviecomingList, changeMovieList);
        }
        wx.nextTick(() => {
          this.getAllRects(index);
        })
        resolve();
      }).catch((err) => {
        reject(err);
      });
    })
  },
  fetchOnMovie(params, index, order = 0) {
    return new Promise((resolve, reject) => {
      app.api2.getMovieOnSelf(params).then((res) => {
        let movieList = res.data.movieList;
        let changeMovieList = movieList.map((item) => {
          item.img = item.img.replace(/w\.h/, '128.180');
          return item;
        });
        if (order === 0) {
          this._movieOnListSet(changeMovieList, this.data.movieOnList);
        }
        else if (order === 1) {
          this._movieOnListSet(this.data.movieOnList, changeMovieList);
        }
        wx.nextTick(() => {
          this.getAllRects(index);
        });
        resolve();
      }).catch((err) => {
        reject(err);
      });
    })
  },
  _movieOnListSet(headMolist, bottomMolist) {
    this.setData({
      movieOnList: [...headMolist, ...bottomMolist]
    });
  },
  _movieComingListSet(headMolist, bottomMolist) {
    this.setData({
      moviecomingList: [...headMolist, ...bottomMolist]
    });
  },
});