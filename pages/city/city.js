const app = getApp();
Page({
    data: {
        cityList : [],
        hotList : []

    },
    onLoad: function (options) {
        app.api2.getCityList().then((res)=>{
            var cities = res.data.cities;
            //[ { index : 'A' , list : [{ nm : '阿城' , id : 123 }] } ]
            var { cityList , hotList } = this.formatCityList(cities);
            this.setData({cityList :cityList});
            this.setData({hotList : hotList});
        });

    },
    handleToCity(e){
        let cityName = e.currentTarget.dataset.name;
        let cityId = e.currentTarget.dataset.id;
        wx.setStorageSync('cityId', cityId);
        wx.setStorageSync('cityName', cityName);
        // wx.navigateTo({
        //   url: '/pages/movie/movie',
        // });
        /* wx.switchTab({
          url: '/pages/movie/movie',
        }); */
        wx.reLaunch({
          url: '/pages/movie/movie',
        })

    },
    formatCityList(cities) {
        var cityList = [];
        var hotList = [];

        for (var m = 0; m < cities.length; m++) {
            if (cities[m].isHot === 1) {
                hotList.push(cities[m]);
            }
        }

        for (var i = 0; i < cities.length; i++) {
            var firstLetter = cities[i].py.substring(0, 1).toUpperCase();
            if (toCom(firstLetter)) {  //新添加index
                cityList.push({ index: firstLetter, list: [{ nm: cities[i].nm, id: cities[i].id }] });
            }
            else {   //累加到已有index中
                for (var j = 0; j < cityList.length; j++) {
                    if (cityList[j].index === firstLetter) {
                        cityList[j].list.push({ nm: cities[i].nm, id: cities[i].id });
                    }
                }
            }
        }

        cityList.sort((n1, n2) => {
            if (n1.index > n2.index) {
                return 1;
            }
            else if (n1.index < n2.index) {
                return -1;
            }
            else {
                return 0;
            }
        });

        function toCom(firstLetter) {
            for (var i = 0; i < cityList.length; i++) {
                if (cityList[i].index === firstLetter) {
                    return false;
                }
            }
            return true;
        }

        return {
            cityList,
            hotList
        };
    },

    handleToIndex(index) {
        var h2 = this.$refs.city_sort.getElementsByTagName('h2');
        this.$refs.city_sort.parentNode.style.transform = 'translateY(' + -h2[index].offsetTop + 'px)';
        // this.$refs.city_sort.parentNode.scrollTop = -h2[index].offsetTop;
        // this.$refs.city_List.scrollToTop(-h2[index].offsetTop);

    }

})