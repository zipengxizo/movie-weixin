
import api from "../../utils/http.js"
Page({
  data: {
    detailMovie : {}
  },
  onLoad: function (options) {
    console.log(options)
    let movieId = options.movieId;
    let that = this;
    // const eventChannel = this.getOpenerEventChannel()
    // eventChannel.on('acceptMovieId', function(data) {
    //   movieId = data.data.movieId;
    // })
    
    let url = "detailmovie?movieId="+movieId;
    that.fetchOnMovieDetail(url);
  },
  fetchOnMovieDetail(url){
    wx.showLoading({
      title: '加载中',
    });
    let that = this;
    api.get(url).then((res)=>{
      wx.hideLoading();
      let detailMovie = res.data.data.detailMovie;
      for (const key in detailMovie) {
        if (detailMovie.hasOwnProperty(key)) {
          if (key === "img") {
            detailMovie[key] = detailMovie[key].replace(/w\.h/,'128.180');
          }
          if (key === "photos") {
            let mapPhotos = detailMovie[key].map((item)=>{
              return item.replace(/w\.h/,'128.180')
            });
            detailMovie[key] = mapPhotos;
          }
        }
      }
      that.setData({detailMovie : detailMovie});
    }).catch((err)=>{
    })
  }
})