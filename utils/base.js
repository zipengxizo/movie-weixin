const baseUrl = 'http://8.129.170.158:3000/api2/';
// const baseUrl = 'http://39.97.33.178/api/';
const baseUrl2 = 'http://8.129.170.158:3000/api2/';
const baseUrl3 = 'http://127.0.0.1:3000/api2/';

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
    baseUrl2,
    baseUrl3,
    url
}