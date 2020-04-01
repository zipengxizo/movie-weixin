/**
 * name: api.js
 * description: 所有的接口
 */
import request from './request.js';
import {baseUrl,url} from './base.js';

class api {
  constructor() {
    // let cityId = wx.getStorageSync('city_id');
    // this._baseUrl = app.globalData.host;
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
  errorHander(res) {
    console.error(res)
  }

  /**
   * 查询正在上映
   */
  getMovieOn(data) {
    return this._request.getRequest(this._baseUrl + url.movieOn, data,this._defaultHeader, 'GET').then(res => res.data)
  };
  /**
   * 查询即将上映
   * @param {*} data 
   */
  getMoiveComing(data){
      return this._request.getRequest(this._baseUrl + url.movieComing, data,this._defaultHeader,'GET');
  };


/*   getCourseList(page = 1, size = 10, key = null) {
    let data = key != null ? { page: page, size: size, queryValue: key } : { page: page, size: size }
    return this._request.getRequest(this._baseUrl + '/course/mobile', data).then(res => res.data)
  } */
}
export default api