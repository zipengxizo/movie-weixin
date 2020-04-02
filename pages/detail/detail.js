

const app = getApp();
Page({
  data: {
    detailMovie: {},
  },
  onLoad: function (options) {
    let movieId = options.movieId;
    // const eventChannel = this.getOpenerEventChannel()
    // eventChannel.on('acceptMovieId', function(data) {
    //   movieId = data.data.movieId;
    // })

    this.fetchOnMovieDetail({ movieId: movieId });
  },
  fetchOnMovieDetail(params) {
    wx.showLoading({
      title: '加载中...',
    });
    app.api2.getMovieDetai(params).then((res) => {
      wx.hideLoading();
      let detailMovie = res.data.detailMovie;
      for (const key in detailMovie) {
        if (detailMovie.hasOwnProperty(key)) {
          if (key === "img") {
            detailMovie[key] = detailMovie[key].replace(/w\.h/, '128.180');
          }
          if (key === "photos") {
            let mapPhotos = detailMovie[key].map((item) => {
              return item.replace(/w\.h/, '128.180')
            });
            detailMovie[key] = mapPhotos;
          }
        }
      }
      this.setData({ detailMovie: detailMovie });
    }).catch((err) => {
      console.log(err);
    })
  }
})