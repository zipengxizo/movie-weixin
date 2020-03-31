

import api from "../../utils/http.js";
const app = getApp();
Page({
  data:{
    movieList : []
  },
  onLoad : function(){
    wx.showLoading({
      title: '加载中',
    });
    let that = this;
    api.get("movieOnInfoList?cityId=10").then((res)=>{
      wx.hideLoading();
      let movieList = res.data.data.movieList;
      let changeMovieList = movieList.map((item)=>{
        item.img = item.img.replace(/w\.h/,'128.180');
        return item;
      });
      that.setData({movieList : changeMovieList});
    }).catch((err)=>{
      console.log(err);
    })
  }
});