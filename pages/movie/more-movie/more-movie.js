import {
  http,
  processServerMovies
} from '../../../util/util.js'
var app = getApp()

Page({
  data: {
    movies: [],
    inTheatersUrl: "/v2/movie/in_theaters",
    comingSoonUrl: "/v2/movie/coming_soon",
    top250Url: "/v2/movie/top250",
  },

  onLoad: function(options) {
    var category = options.category
    this.data.navigateTitle = category;
    var url = app.baseUrl
    switch (category) {
      case '即将上映':
        url = url + this.data.comingSoonUrl
        break
      case '正在热映':
        url = url + this.data.inTheatersUrl
        break
      case 'Top250':
        url = url + this.data.top250Url
        break
    }
    this.data.currentUrl = url

    http(url, this.processMoreMovieData)
  },

  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    });
  },

  processMoreMovieData: function(data) {
    var movies = processServerMovies(data)
    var totalMovies = this.data.movies.concat(movies);
    this.setData({
      movies: totalMovies
    });
    wx.stopPullDownRefresh();
  },

  onPullDownRefresh: function(event) {
    this.data.movies = []
    http(this.data.currentUrl, this.processMoreMovieData)
  },

  onReachBottom: function(event) {
    var totalCount = this.data.movies.length;
    //拼接下一组数据的URL
    var nextUrl = this.data.currentUrl +
      "?start=" + totalCount + "&count=20";
    http(nextUrl, this.processMoreMovieData)
  }
})