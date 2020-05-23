
const baseUrl = 'http://127.0.0.1:3002/api2/'
/* const baseUrl = 'http://8.129.170.158:3000/api2/';//阿里云接口
const baseUrl = 'http://127.0.0.1:3000/api2/';//自己mongdb的接口
const baseUrl = 'http://39.97.33.178/api/';//美团接口 */

const url = {
    movieOn: "movie/movieOnInfoList",
    movieComing: "movie/movieOnInfoList",
    movieDetail: "detailmovie",
    cinemaList: "cinema/cinemaList",
    cityList: "city/cityList",
    login: "users/loginWeixin",
    rearchMovieList : 'searchList',
    locations :"getLocation",
    movieOnSelf : "movie/getMovieList"
    
}
module.exports = {
    baseUrl,
    url
}