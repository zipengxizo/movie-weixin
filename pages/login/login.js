
const app = getApp()
Page({
  data: {
    fullUrl : '',
  },
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('fullUrl', (res)=>{
      this.setData({fullUrl : res.data});

    });
  },
  login(e){
    wx.login({
      complete: (res) => {
        let code = res.code;
        app.api2.loginWinxin({code : code}).then((res)=>{
          if (res.status === 0) {
            let token = res.data.token;
            let openid = res.data.openid;
            wx.setStorageSync('token', token);
            wx.setStorageSync('openid', openid);
            wx.showToast({
              title: '登录成功',
            });
            setTimeout(() => {
              wx.redirectTo({
                url: this.data.fullUrl,
              })
            }, 1000);
          }
          else{
            wx.showToast({
              title: '登录失败',
            })
          }
        });
      },
    })
  }
})
