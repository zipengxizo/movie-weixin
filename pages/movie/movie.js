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
    tip: '下拉加载',
    backToTopShow: false,
    dialogShow:false,
    buttons: [{text: '预定',extClass:'ad-button'}],
    adUrl:null
  },
  tapDialogButton(e){
    this.setData({dialogShow : false});
  },
  swiperTab(e) {
    let currentTab = e.detail.current;
    this.setData({ currentTab: currentTab });
    let { cityId, movieOnList, moviecomingList } = this.data;
    let params = { cityId: cityId };
    //重新计算swiper的高度
    this.getAllRects(currentTab);
    if (currentTab === 0 && movieOnList.length === 0) {
      wx.showLoading();
      this.fetchOnMovie(params, currentTab).then(() => {
        wx.hideLoading();
      })
    }
    else if (currentTab === 1 && moviecomingList.length === 0) {
      wx.showLoading();
      this.fetchComingMovie(params, currentTab).then(() => {
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
      this.fetchOnMovie(params, currentTab, 1).then(() => {
        this.setData({
          tip: '下拉加载',
          bottomShow: false
        });
      })
    }
    else if (currentTab === 1) {
      this.fetchComingMovie(params, currentTab, 1).then(() => {
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
    wx.showShareMenu({
      withShareTicket: true
    })
    let { cityId, currentTab } = this.data;
    let storegeCityId = wx.getStorageSync('cityId');
    let storeCityName = wx.getStorageSync('cityName');
    if (storegeCityId && storegeCityId !== cityId) {
      this.setData({ cityId: storegeCityId });
      this.setData({ cityName: storeCityName });
    };
    let params = { cityId: cityId };
    wx.showLoading();
    this.fetchOnMovie(params, currentTab).then(() => {
      wx.hideLoading();
      wx.nextTick(()=>{
      let roundImage = this.data.movieOnList[Math.floor(Math.random()*10+1)].img;
      roundImage = roundImage.replace(/128.180/g,'320.320');
      this.setData({adUrl:roundImage});
      })
    });
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0,
        cartCount: wx.getStorageSync('cartCout')
      })
    }
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
    let { movie } = e.currentTarget.dataset;
    if (!wx.getStorageSync('token')) {
      app.wx.navigateTo({
        url: '/pages/login/login'
      }).then((res) => {
        res.eventChannel.emit('fullUrl', { data: `/pages/detail/detail?movieId=${movie.id}` });
      });
    } else {
      let movieStore = wx.getStorageSync('movie');
      let { id, nm, img } = movie;
      let newMovieItem = [{ id: id, title: nm, image: img, num: 1, price: Math.floor(Math.random() * 100 + 1), selected: true }];
      let cartCout = 0;
      if (movieStore.length > 0) {
        movieStore = JSON.parse(movieStore);
        let has = false;
        let newMovie = movieStore.carts.map((item, index) => {
          if (id === item.id) {
            item.num += 1;
            cartCout += item.num;
            has = true;
            return item;
          } else {
            cartCout += item.num;
            return item;
          }
        });
        if (has) {
          wx.setStorageSync('movie', JSON.stringify({ carts: newMovie }));
        }
        else {
          wx.setStorageSync('movie', JSON.stringify({ carts: [...newMovieItem, ...movieStore.carts] }));
        }
        wx.setStorageSync('cartCout', cartCout);
      }
      else {
        wx.setStorageSync('movie', JSON.stringify({ carts: newMovieItem }));
        wx.setStorageSync('cartCout', 1);
      }
      this.getTabBar() && this.getTabBar().setData({ cartCount: cartCout });
      let windowWidth, windowHeight;
      try {
        const res = wx.getSystemInfoSync();
        windowWidth = res.windowWidth, windowHeight = res.windowHeight;
      } catch (error) {
        console.log(err)
      }
      let x = e.detail.x, y = e.detail.y;
      // let clientX = e.changedTouches[0].clientX,clientY = e.changedTouches[0].clientY;
      let animation = wx.createAnimation({
        delay: 0,
        timingFunction: 'ease-in'
      });
      animation.translate(x, y).step();//初始点
      animation.translate(windowWidth / 2, windowHeight / 2).opacity(1).scale(3, 3).step();//中间点
      animation.translate(windowWidth - 120, windowHeight).opacity(0).scale(1, 1).step();//购物车
      this.setData({
        animation: animation.export()
      });
      wx.nextTick(() => {
        wx.showToast({
          title: '预定成功',
          icon: 'none',
          mask: true
        })
      })
    }
  },
  dailogClose(e){
    this.setData({dialogShow : false});
  },
  onPageScroll: function (e) {
    let { scrollTop } = e;
    let { backToTopShow } = this.data;
    if (!backToTopShow && scrollTop > 400) {
      this.setData({ backToTopShow: true });
    }
    if (backToTopShow && scrollTop === 0) {
      this.setData({ backToTopShow: false });
    }
  },
  fetchComingMovie(params, index, order = 0) {
    return new Promise((resolve, reject) => {
      app.api2.getMoiveComing(params).then((res) => {
        let movieList = res.data.movieList;
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
      app.api2.getMovieOn(params).then((res) => {
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