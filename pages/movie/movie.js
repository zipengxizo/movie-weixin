
let template = require('../template/template.js');
import api from "../../utils/http.js";
Page({
  data:{
    movieList : []

  },
  onLoad : function(){
    template.tabbar("tabBar", 0, this);
    let that = this;
    api.get("movieOnInfoList?cityId=10").then((res)=>{
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