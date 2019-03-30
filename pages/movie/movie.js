Page({
  data: {
    top250Movies: [],
    inTheatreMovies: [],
    commingSoonMovies: []
  },

  onLoad: function() {
    var app = getApp()
    var params = '?start=0&count=3'
    wx.request({
      url: app.baseUrl + 'v2/movie/top250' + params,
      header: {
        appKey: app.appKey
      },
      success: (res) => {
        console.log(res)
      }
    })
  },

})