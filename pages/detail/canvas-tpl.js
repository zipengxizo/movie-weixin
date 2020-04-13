const wxml = `
<view class="container" >
  <view class="first">
    <image class="img" src="{{img}}"></image>
    <view class="detail-text">
      <text class="title">{{nm}}</text>
      <text class="content">{{enm}}</text>
      <text class="content">{{sc}}</text>
      <text class="content">{{cat}}</text>
      <text class="content">{{src}}/{{dur}}分钟</text>
      <text class="content">{{pubDesc}}</text>
    </view>
  </view>
  <view class="secend">
    <text class="text">{{dra}}</text>
  </view>
</view>
`

const style = {
  container: {
    width: 300,
    height: 360,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  first:{
    width: 300,
    height: 160,
    backgroundColor: '#ccc',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'
  },
  img:{
    width:100,
    height:140,
    margin:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailText:{
    width:180,
    height:160,
    paddingLeft:20,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title:{
    width:200,
    height:25,
    lineHeight:25,
    fontSize:18
  },
  content:{
    width:200,
    height:20,
  },
  secend:{
    width:300,
    height:200,
  },
  text: {
    width: 300,
    height: 200,
    color:'#333',
    backgroundColor:'#fff',
    padding:10,
    verticalAlign:'center'
  },
  imgBox:{
    width: 300,
    height: 160,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',

  }
}

module.exports = {
  wxml,
  style
}
