const app = getApp();

let timeoutId;
Page({
    data: {
        movielist : [],
        cityId:wx.getStorageSync('cityId') || 10,
        kw:''

    },
    onLoad: function (options) {

    },
    onReady: function () {

    },
    rearch(e){
        let {value} = e.detail;
        clearInterval(timeoutId);
        let param = {
            kw : value,
            cityId : this.data.cityId
        }
        timeoutId = setTimeout(() => {
            app.api2.getRearchMovieList(param).then((res)=>{
                if(res.status === 0){
                    let changeMovie = res.data.movies.list.map((item)=>{
                        item.img = item.img.replace(/w\.h/,'128.180');
                        return item;
                    })
                    this.setData({movielist : changeMovie});
                }
            });
            
        }, 100);
    }
})