Component({
  properties: {
    categoryTitle: String,
    movies: Array
  },

  data: {

  },

  methods: {
    onMoreTap: function (event) {
      wx.navigateTo({
        url: '/pages/movie/more-movie/more-movie?category=' + this.properties.categoryTitle
      })
    },
  }
})