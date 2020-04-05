const app = getApp();
Page({
  data: {
    isshow : false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openid:''

  },
  onLoad: function () {
    if (app.globalData.userInfo) {
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
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function () {
    let bol = wx.getStorageSync('token') ? true : false;
    this.setData({ isshow: bol,openid :wx.getStorageSync('openid') });
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo : true
      
    })
  },
  logout(){
    wx.showModal({
      title: '提示',
      content: '确定退出',
      success (res) {
        if (res.confirm) {
          wx.removeStorageSync('token');
          wx.removeStorageSync('openid');
          wx.reLaunch({
            url: '/pages/login/login'
          })
        } else if (res.cancel) {
        }
      }
    })
  },
  pay(){
    if (!wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
    else{
      console.log('next to');
    }
  }
});