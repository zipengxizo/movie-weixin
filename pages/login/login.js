
const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo') 
  },
  onLoad: function () {
   /*  if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    } */
  },
/*   getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }, */
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
            wx.switchTab({
              url: '/pages/center/center',
            })
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
