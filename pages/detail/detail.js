const app = getApp();
Page({
  data: {
    detailMovie: {},
  },
  onLoad: function (options) {
    let movieId = options.movieId;
    this.fetchOnMovieDetail({ movieId: movieId });
  },
  fetchOnMovieDetail(params) {
    if(!params.movieId) return false;
    app.api2.getMovieDetai(params).then((res) => {
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