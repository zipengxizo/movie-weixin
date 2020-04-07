const baseUrl = 'http://39.97.33.178/api/';
// const baseUrl2 = 'http://127.0.0.1:3000/api2/';
const baseUrl2 = 'http://8.129.170.158:3000/api2/';

const url = {
    movieOn: "movieOnInfoList",
    movieComing: "movieComingList",
    movieDetail: "detailmovie",
    cinemaList: "cinemaList",
    cityList: "cityList",
    login: "users/loginWeixin",
    rearchMovieList : 'searchList',
    locations :"getLocation"
    
}
module.exports = {
    baseUrl,
    baseUrl2,
    url
}