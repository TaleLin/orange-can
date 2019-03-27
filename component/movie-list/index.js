var app = getApp()

Component({
  properties: {
    categoryTitle: String
  },

  attached: function() {
    var url = app.baseUrl
    var params = '?start=0&count=3'
    switch (this.properties.categoryTitle) {
      case '即将上映':
        url = url + this.data.comingSoonUrl + params
        break
      case '正在热映':
        url = url + this.data.inTheatersUrl + params
        break
      case 'Top250':
        url = url + this.data.top250Url + params
        break
    }

    wx.request({
      url: url,
      success: (res) => {
        this.processDoubanData(res.data)
      }
    })
  },

  data: {
    movies: [],
    inTheatersUrl: "/v2/movie/in_theaters",
    comingSoonUrl: "/v2/movie/coming_soon",
    top250Url: "/v2/movie/top250"
  },

  methods: {
    processDoubanData: function(data) {
      var movies = [];

      for (var idx in data.subjects) {
        var subject = data.subjects[idx];
        var title = subject.title;
        if (title.length >= 6) {
          title = title.substring(0, 6) + "...";
        }

        var temp = {
          stars: subject.rating.stars,
          title: title,
          average: subject.rating.average,
          coverageUrl: subject.images.large,
          movieId: subject.id
        }
        movies.push(temp)
      }
      console.log(movies)
      this.setData({
        movies:movies
      });
    },

  }
})