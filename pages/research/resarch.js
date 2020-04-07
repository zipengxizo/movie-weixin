const app = getApp();

let timeoutId;
Page({
    data: {
        movielist : [],
        value : '',
        isShow: false

    },
    detail(e){
        let movieid = e.currentTarget.dataset.movieid;
        wx.navigateTo({
          url: '/pages/detail/detail?movieId='+movieid,
        })

    },
    clear(e){
        console.log(e)
        this.setData({value : '',});
    },
    focus(e){
        let {value} = e.detail;
        if (value.length > 0) {
            this.setData({
                isShow : true
            })
        }
    },
    blur(){
        this.setData({isShow : false});
    },
    rearch(e){
        let {value} = e.detail;
        if(value.length === 0){
            this.setData({isShow : false});
            return;
        }
        this.setData({
            isShow : true,
            value :value
        }) 
        clearInterval(timeoutId);
        let param = {
            kw : value,
            cityId : wx.getStorageSync('cityId') || 10
        }
        timeoutId = setTimeout(() => {
            wx.showLoading({mask:true});
            app.api2.getRearchMovieList(param).then((res)=>{
                if(res.status === 0){
                    if(!res.data.movies) return false;
                    let changeMovie = res.data.movies.list.map((item)=>{
                        item.img = item.img.replace(/w\.h/,'128.180');
                        return item;
                    })
                    this.setData({movielist : changeMovie});
                    wx.hideLoading();
                }
            });
            
        }, 1000);
    }
})