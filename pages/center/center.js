const app = getApp();
Page({
  data : {

  },
  onLoad : function(){
    app.globalData.tabBar.tabbar("tabBar",2,this);
  }
});