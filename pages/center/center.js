let template = require("../template/template.js");
Page({
  data : {

  },
  onLoad : function(){
    template.tabbar("tabBar", 2, this);
  }
});