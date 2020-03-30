//初始化数据
function tabbarinit() {
  return [
       { "current":0,
         "pagePath": "/pages/movie/movie",
         "iconPath": "/imgs/home.png",
         "selectedIconPath": "/imgs/home_on.png",
         "text": "电影"
       },
       {
         "current": 0,
         "pagePath": "/pages/cinema/cinema",
         "iconPath": "/imgs/message.png",
         "selectedIconPath": "/imgs/message_on.png",
         "text": "影院"
 
       },
       {
         "current": 0,
         "pagePath": "/pages/center/center",
         "iconPath": "/imgs/category.png",
         "selectedIconPath": "/imgs/category_on.png",
         "text": "我的"
       }
     ]
 
 }
 //tabbar 主入口
 function tabbarmain(bindName = "tabdata", id, target) {
   var that = target;
   var bindData = {};
   var otabbar = tabbarinit();
   otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
   otabbar[id]['current'] = 1;
  //  bindData[bindName] = otabbar
   that.setData({ tabBar : otabbar });
 }
 
 module.exports = {
   tabbar: tabbarmain
 }