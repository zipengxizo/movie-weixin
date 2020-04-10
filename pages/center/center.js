const app = getApp();
Page({
  data: {
    isshow: false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openid: ''

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
    this.setData({ isshow: bol, openid: wx.getStorageSync('openid') });
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3,
        cartCount: wx.getStorageSync('cartCout')
      })
    }
  },
  getUserInfo: function (e) {
    if (!e.detail.userInfo) return;
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true

    })
  },
  logout() {
    let self = this;
    wx.showModal({
      title: '提示',
      content: '确定退出',
      success(res) {
        if (res.confirm) {
          wx.removeStorageSync('token');
          wx.removeStorageSync('openid');
          app.globalData.userInfo = null;
          self.setData({ userInfo: {} });
          wx.navigateTo({
            url: '/pages/login/login'
          });
        } else if (res.cancel) {
        }
      }
    })
  },
  pay() {
    if (!wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/login/login',
      }).then((res) => {
        res.eventChannel.emit('fullUrl', { data: '/pages/center/center' });
      });
    }
    else {
      console.log('next to');
    }
  }
});