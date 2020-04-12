const app = getApp();
let { wxml, style } = require('./canvas-tpl.js');
Page({
  data: {
    detailMovie: {},
    show:false,
    buttons: [
      {
          type: 'default',
          className: '',
          text: '取消',
          value: 0
      },
      {
          type: 'primary',
          className: '',
          text: '保存',
          value: 1
      }
  ]
  },
  onLoad: function (options) {
    let movieId = options.movieId;
    // movieId = 1302494;
    this.fetchOnMovieDetail({ movieId: movieId });
    this.widget = this.selectComponent('.widget');
  },
  renderToCanvas() {
    wx.showLoading({
      title: '生成中...',
    });
    this.setData({show:true});
    let copy = wxml;
    copy = copy.replace(/{{img}}/g,this.data.detailMovie.img)
    .replace(/{{nm}}/g,this.data.detailMovie.nm)
    .replace(/{{enm}}/g,this.data.detailMovie.enm)
    .replace(/{{sc}}/g,this.data.detailMovie.sc)
    .replace(/{{cat}}/g,this.data.detailMovie.cat)
    .replace(/{{src}}/g,this.data.detailMovie.src)
    .replace(/{{dur}}/g,this.data.detailMovie.dur)
    .replace(/{{pubDesc}}/g,this.data.detailMovie.pubDesc)
    .replace(/{{dra}}/g,this.data.detailMovie.dra);
    this.widget.renderToCanvas({wxml : copy,style} ).then((res) => {
      this.container = res
      wx.hideLoading();
    })
  },
  close(){
    this.setData({show:false});
  },
  buttontap(e){
    let {index} = e.detail;
    if (index === 1) {
      this.extraImage();
    }
    this.setData({show : false});
    this.widget = null;
  },
  extraImage() {
    this.widget.canvasToTempFilePath().then((res) => {
      let path = res.tempFilePath
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.writePhotosAlbum']) {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success() {
                wx.saveImageToPhotosAlbum({
                  filePath: path,
                  success(res) {
                    wx.showToast({
                      title: '保存到相册'
                    })
                  }
                })
              }
            })
          }
          else {
            wx.saveImageToPhotosAlbum({
              filePath: path,
              success(res) {
                wx.showToast({
                  title: '保存到相册'
                })
              }
            })
          }
        }
      })
    });
  },
  fetchOnMovieDetail(params) {
    if (!params.movieId) return false;
    wx.showLoading({ mask: true });
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
      wx.hideLoading();
    }).catch((err) => {
      console.log(err);
    })
  },
  preview(e) {
    let { imageurls } = e.currentTarget.dataset;
    wx.previewImage({
      urls: imageurls,
    })
  }
})