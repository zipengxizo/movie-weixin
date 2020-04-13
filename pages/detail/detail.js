const app = getApp();
const computedBehavior = require('miniprogram-computed');
let { wxml, style } = require('./canvas-tpl.js');

Component({
  data: {
    detailMovie: null,
    height:2180,
    show: false,
    buttons: [
      {
        type: 'default',
        text: '取消',
        value: 0
      },
      {
        type: 'primary',
        text: '保存',
        value: 1
      }
    ]
  },
  behaviors: [computedBehavior],
  computed: {
    moviesImg(data) {
      return data.detailMovie && data.detailMovie.img.replace(/w\.h/, '128.180');
    },
    photos(data) {
      return data.detailMovie && data.detailMovie.photos.map((item) => {
        return item.replace(/w\.h/, '128.180')
      })
    },
    bigphotos(data) {
      return data.detailMovie && data.detailMovie.photos.map((item) => {
        return item.replace(/w\.h/, '320.320')
      })
    }
  },
  methods: {
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
      this.setData({ show: true });
      let copyWxml = wxml, copyStyle = style;
      copyWxml = copyWxml.replace(/{{img}}/g, this.data.moviesImg)
        .replace(/{{nm}}/g, this.data.detailMovie.nm)
        .replace(/{{enm}}/g, this.data.detailMovie.enm)
        .replace(/{{sc}}/g, this.data.detailMovie.sc)
        .replace(/{{cat}}/g, this.data.detailMovie.cat)
        .replace(/{{src}}/g, this.data.detailMovie.src)
        .replace(/{{dur}}/g, this.data.detailMovie.dur)
        .replace(/{{pubDesc}}/g, this.data.detailMovie.pubDesc)
        .replace(/{{dra}}/g, this.data.detailMovie.dra);
        
      /* let imgtpl = `<view class="imgBox"><image class="img" src="{{img}}"></image></view>`
      let imgtplArr = this.data.photos.map((item)=>{
        return imgtpl.replace(/{{img}}/g,item)
      });
      copyWxml = copyWxml.replace(/{{{photos}}}/g,imgtplArr.join(''));
      console.log(copyWxml);
      
      let { windowWidth } = wx.getSystemInfoSync();
      copyStyle.container.width = copyStyle.first.width = copyStyle.secend.width = copyStyle.text.width = windowWidth -48;
      let photosHeight = this.data.photos.length * 160;
      this.createSelectorQuery().select('.detail_intro').boundingClientRect((rect) => {
        copyStyle.secend.height = copyStyle.text.height = rect.height;
        copyStyle.container.height = 160 + rect.height + photosHeight;
      }).exec();

      this.setData({height: + copyStyle.container.height});
      console.log(copyStyle) */

      this.widget.renderToCanvas({ wxml: copyWxml, style: copyStyle }).then((res) => {
        this.container = res;
        wx.hideLoading();
      })
    },
    close() {
      this.setData({ show: false });
    },
    buttontap(e) {
      let { index } = e.detail;
      if (index === 1) {
        this.extraImage();
      }
      this.setData({ show: false });
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
        this.setData({ detailMovie: res.data.detailMovie });
        wx.hideLoading();
      }).catch((err) => {
        console.log(err);
      })
    },
    preview(e) {
      let { current } = e.currentTarget.dataset;
      wx.previewImage({
        current: current,
        urls: this.data.bigphotos,
      })
    }
  }
})