import {http, processServerMovies} from '../../../util/util.js'
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

    http(url, this.processMoreMovieData)
  },

  processMoreMovieData: function(data) {
    var movies = processServerMovies(data)
    this.setData({
      movies: movies
    });
  },
})