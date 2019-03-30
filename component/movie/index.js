Component({
  properties: {
    score:Number,
    stars:String,
    coverageUrl:String,
    title:String,
    movieId:String
  },

  data: {

  },

  methods: {
    onTap: function (event) {
      wx.navigateTo({
        url: '/pages/movie/movie-detail/movie-detail?id=' + this.properties.movieId,
      })
    }
  }
})
