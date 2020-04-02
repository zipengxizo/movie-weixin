/**
 * name: api.js
 * description: 所有的接口
 */
import request from './request.js';
import { baseUrl, baseUrl2, url } from './base.js';

class api {
  constructor() {
    // let cityId = wx.getStorageSync('city_id');
    this._baseUrl = baseUrl;
    this._defaultHeader = {
      /* "access-token":config.accessToken,
      "version":config.version,
      "user-token":config.userToken, */
      'content-type': 'application/json'
    }
    this._request = new request
    this._request.setErrorHandler(this.errorHander)
  }

  /**
   * 统一的异常处理方法
   */
  errorHander(err) {
    wx.hideLoading({
      complete: (res) => {
        wx.showToast({
          icon: 'none',
          title: err.errMsg,
        })
      },
    });
  }

  /**
   * 查询正在上映
   * @param {查询正在上映} data 
   */
  getMovieOn(data) {
    return this._request.getRequest(this._baseUrl + url.movieOn, data, this._defaultHeader, 'GET').then(res => res.data)
  };
  /**
   * 查询即将上映
   * @param {*} data 
   */
  getMoiveComing(data) {
    return this._request.getRequest(this._baseUrl + url.movieComing, data, this._defaultHeader, 'GET').then(res => res.data)
  };
  /**
   * 查询电影详情
   * @param {movieId} 查询电影详情
   */
  getMovieDetai(data) {
    return this._request.getRequest(this._baseUrl + url.movieDetail, data,
      this._defaultHeader, 'GET').then(res => res.data);
  };
  /**
   * 查询电影院
   * @param {查询参数} data 
   */
  getCinemas(data) {
    return this._request.getRequest(this._baseUrl + url.cinemaList, data,
      this._defaultHeader, 'GET').then(res => res.data);
  };

  getCityList(data) {
    return this._request.getRequest(this._baseUrl + url.cityList, data, this._defaultHeader, 'GET').then(res => res.data)
  };

  loginWinxin(data) {
    return this._request.getRequest(baseUrl2 + url.login, data, this._defaultHeader, 'GET').then(res => res.data);
  }
}
export default api