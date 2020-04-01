import api from "../../utils/http.js";
const app = getApp();
Page({
  data:{
    movieList : []
  },
  onLoad : function(){
    let url = "movieOnInfoList?cityId=10";
    this.fetchOnMovie(url);
  },
  onShow : function(){
    console.log(this.getTabBar);
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  changeTabar(e){
    console.log(e.detail.index)
    if (e.detail.index === 1) {
      this.fetchOnMovie("movieOnInfoList?cityId=10");
    }else if(e.detail.index === 2){
      this.fetchComingMovie("movieComingList?cityId=10");
    }
  },
  detail(e){
    let movieid = e.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '/pages/detail/detail?movieId='+movieid,
      success : function(res){
        res.eventChannel.emit('acceptMovieId', { data: {movieId : movieid} })
      }
    })
  },
  
  fetchComingMovie(url){
    wx.showLoading({
      title: '加载中',
    });
    let that = this;
    api.get(url).then((res)=>{
      wx.hideLoading();
      let movieList = res.data.data.comingList;
      let changeMovieList = movieList.map((item)=>{
        item.img = item.img.replace(/w\.h/,'128.180');
        return item;
      });
      that.setData({movieList : changeMovieList});
    }).catch((err)=>{
      console.log(err);
    })
  },
  fetchOnMovie(url){
    wx.showLoading({
      title: '加载中',
    });
    let that = this;
    api.get(url).then((res)=>{
      wx.hideLoading();
      let movieList = res.data.data.movieList;
      let changeMovieList = movieList.map((item)=>{
        item.img = item.img.replace(/w\.h/,'128.180');
        return item;
      });
      that.setData({movieList : changeMovieList});
    }).catch((err)=>{
    })
  }
});