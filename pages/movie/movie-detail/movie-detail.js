import {
  http,
  convertToCastInfos,
  convertToCastString
} from '../../../util/util.js'


Page({
  data: {
    movie: {}
  },

  onLoad: function(options) {
    var app = getApp();
    var movieId = options.id;
    var url = app.baseUrl +
      "/v2/movie/subject/" + movieId;

    http(url, this.processDetailData)
  },

  processDetailData: function(data) {
    console.log(data)
    if (!data) {
      return;
    }
    var director = {
      avatar: "",
      name: "",
      id: ""
    }
    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        director.avatar = data.directors[0].avatars.large

      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }
    var movie = {
      movieImg: data.images ? data.images.large : "",
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      generes: data.genres.join("、"),
      stars: data.rating.stars,
      score: data.rating.average,
      director: director,
      casts: convertToCastString(data.casts),
      castsInfo: convertToCastInfos(data.casts),
      summary: data.summary
    }
    this.setData({
      movie: movie
    })
    wx.setNavigationBarTitle({
      title: data.title
    });
  },
  viewMoviePostImg: function(event) {
    var src = event.currentTarget.dataset.src;
    wx.previewImage({
      current: src,
      urls: [src]
    })
  }
})