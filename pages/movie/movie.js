import {
  http,
  processServerMovies
} from '../../util/util.js'
Page({
  data: {
    top250Movies: [],
    inTheatreMovies: [],
    commingSoonMovies: []
  },

  onLoad: function() {
    var app = getApp()
    var params = '?start=0&count=3'
    var url = app.baseUrl + 'v2/movie/top250' + params
    http(url, this.processTop250Data)
    var url = app.baseUrl + 'v2/movie/theaters' + params
    http(url, this.processInTheaterData)
    var url = app.baseUrl + 'v2/movie/comingsoon' + params
    http(url, this.processComingSoonData)
  },

  processTop250Data: function(data) {
    var movies = processServerMovies(data)
    this.setData({
      top250Movies: movies
    });
  },

  processInTheaterData: function(data) {
    var movies = processServerMovies(data)
    this.setData({
      inTheatreMovies: movies
    });
  },

  processComingSoonData: function(data) {
    var movies = processServerMovies(data)
    this.setData({
      comingSoonMovies: movies
    });
  },

})