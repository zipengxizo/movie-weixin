const app = getApp();
Page({
  data : {

  },
  onLoad : function(){
  },
  onShow : function(){
    console.log(this.getTabBar);
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }

  }
});