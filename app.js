
import api from './utils/api.js';
import {promisifyAll } from 'miniprogram-api-promise';
const wxp = {}
promisifyAll(wx, wxp);
App({
  onLaunch: function () {

    setTimeout(() => {
      this.api2.getLocation().then((res) => {
        let msg = res.msg;
        if (msg === 'ok') {
          let cityName = res.data.nm;
          let cityId = res.data.id;
          let storeCityId = wx.getStorageSync('cityId');
          if (storeCityId === cityId) return false;
          wx.showModal({
            title: '定位',
            content: '是否切换城市?',
            confirmColor:'#f03d37',
            success(res) {
              if (res.confirm) {
                wx.setStorageSync('cityId', cityId);
                wx.setStorageSync('cityName', cityName);
                wx.reLaunch({
                  url: '/pages/movie/movie',
                })
              } else if (res.cancel) {
                console.log('用户点击取消定位');
              }
            }
          })
        }
      });
    }, 3000);

    wxp.getSetting().then((res)=>{
      if (res.authSetting['scope.userInfo']) {
        wxp.getUserInfo().then((res)=>{
          // 可以将 res 发送给后台解码出 unionId
          this.globalData.userInfo = res.userInfo;
          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(res)
          }
        });
      }
    });
  },
  globalData: {
    cityId : wx.getStorageSync('cityId') || 1,
    cityName: wx.getStorageSync('cityName') || '北京',
    userInfo : null,
    hasLogin: wx.getStorageSync('token') ? true : false,
  },
  api2: new api(),
  wx:wxp
})