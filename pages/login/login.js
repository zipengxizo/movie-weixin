
const app = getApp()
Page({
  data: {
  },
  onLoad: function () {
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
              wx.switchTab({
                url: '/pages/center/center',
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
