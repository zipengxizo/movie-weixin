const app = getApp()
const request = (url, options) => {
   return new Promise((resolve, reject) => {
      console.log(options.data);
      wx.request({
         url: `${app.globalData.host}${url}`,
         method: options.method,
         data: options.data,
         success(res) {
            resolve(res);
         },
         fail(error) {
            reject(error.data)
         }
      })
   })
}
const get = (url, options) => {
   return request(url, { method: 'GET', data: options })
}
const post = (url, options) => {
   return request(url, { method: 'POST', data: options })
}

module.exports = {
   get,
   post
}