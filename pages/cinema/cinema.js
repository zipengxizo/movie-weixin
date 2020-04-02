const app = getApp();
Page({
  data: {
    cinemaList : [],
    cityId : 10
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    });
    app.api2.getCinemas({cityId : this.data.cityId}).then((res)=>{
      wx.hideLoading();
      let cinemaList = res.data.cinemas;
      let changeCinemaList = cinemaList.map((item)=>{
        let tags = item.tag;
        let changeTags = [];
        for (const key in tags) {
          if (tags.hasOwnProperty(key)) {
            const element = tags[key];
            if (element === 1) {
              changeTags.push({
                text : this.formatCard(key),
                classn :  this.classCard(key)
              });
            }
          }
        };
        item.showTag = changeTags;
        return item;
      });
      this.setData({
        cinemaList : changeCinemaList
      });
    }).catch((err)=>{
      console.log(err);
    });
  },
  onShow : function(){
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }

  },
  classCard(key){
      var card = [
          { key : 'allowRefund' , value : 'bl' },
          { key : 'endorse' , value : 'bl' },
          { key : 'sell' , value : 'or' },
          { key : 'snack' , value : 'or'}
      ];
      for(var i=0;i<card.length;i++){
          if(card[i].key === key){
              return card[i].value;
          }
      }
      return '';
  },
  formatCard(key){
      var card = [
          { key : 'allowRefund' , value : '改签' },
          { key : 'endorse' , value : '退' },
          { key : 'sell' , value : '折扣卡' },
          { key : 'snack' , value : '小吃'}
      ];
      for(var i=0;i<card.length;i++){
          if(card[i].key === key){
              return card[i].value;
          }
      }
      return '';
  }
})