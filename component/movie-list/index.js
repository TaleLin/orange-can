// import {config} from '../../config.js'
var app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  attached:function(){
    var inTheatersUrl = app.baseUrl +
      "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.baseUrl +
      "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.baseUrl +
      "/v2/movie/top250" + "?start=0&count=3";

    wx.request({
      url: inTheatersUrl,
      success:(res)=>{
        console.log(res)
      }
    })
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
