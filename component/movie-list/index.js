var app = getApp()

Component({
  properties: {
    catetoryTitle:String
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

  data: {
    movies:[]
  },

  methods: {

  }
})
