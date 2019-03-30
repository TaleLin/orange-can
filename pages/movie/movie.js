import {
  http,
  processServerMovies
} from '../../util/util.js'
Page({
  data: {
    top250Movies: [],
    inTheatreMovies: [],
    commingSoonMovies: [],
    containerShow: true,
    searchPanelShow: false,
    searchResult: []
  },

  onLoad: function() {
    var app = getApp()
    var params = '?start=0&count=3'
    var top250Url = app.baseUrl + 'v2/movie/top250' + params
    var inTheaterUrl = app.baseUrl + 'v2/movie/in_theaters' + params
    var comingSoonUrl = app.baseUrl + 'v2/movie/coming_soon' + params
    http(comingSoonUrl, this.processComingSoonData)
    http(top250Url, this.processTop250Data)
    http(inTheaterUrl, this.processInTheaterData)
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

  onBindFocus: function(event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },

  onCancelImgTap: function(event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult: {},
      inputValue: ''
    })
  },

  onBindConfirm: function(event) {
    var app = getApp()
    var keyWord = event.detail.value;
    var url = app.baseUrl +
      "/v2/movie/search?q=" + keyWord;
    http(url, this.processSearchResultData)
  },

  processSearchResultData: function(data) {
    var movies = processServerMovies(data)
    this.setData({
      searchResult: movies
    })
  }

})