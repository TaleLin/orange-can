Component({
  properties: {
    score: Number,
    stars:{
      type:String,
      value:'00',
    }
  },

  attached:function(){
    var starsArray = this.convertToStarsArray(this.properties.stars)
    this.setData({
      _stars:starsArray
    })
  },

  data: {
    _stars:"00",
  },

  methods: {
    convertToStarsArray:function(stars) {
      var num = stars / 10;
      var array = [];
      for (var i = 1; i <= 5; i++) {
        if (i <= num) {
          array.push(1);
        } else {
          if ((i - num) === 0.5) {
            array.push(0.5)
          } else {
            array.push(0);
          }
        }
      }
      return array;
    }
  }
})