Page({
  data: {
  },
  onLoad: function () {
    var postList = [{
      object: {
        date: "Jan 28 2017"
      },
      title: "小时候的冰棍儿与雪糕",
      postImg: "/images/post/post-4.jpg",
      avatar: "/images/avatar/avatar-5.png",
      content: "冰棍与雪糕绝对不是同一个东西。3到5毛钱的雪糕犹如现在的哈根达斯，而5分1毛的 冰棍儿就像现在的老冰棒。时过境迁，...",
      readingNum: 92,
      collectionNum: {
        array: [108]
      },
      commentNum: 7
    },
    {
      object: {
        date: "Jan 9 2017"
      },
      title: "从童年呼啸而过的火车",
      postImg: "/images/post/post-5.jpg",
      avatar: "/images/avatar/avatar-1.png",
      content: "小时候，家的后面有一条铁路。听说从南方北上的火车都必须经过这条铁路。火车大多在晚上经过，但也不定是只有在夜深人静的时候，火车的声音才能从远方传来...",
      readingNum: 92,
      collectionNum: {
        array: [108]
      },
      commentNum: 7
    },
    {
      object: {
        date: "Jan 29 2017"
      },
      title: "记忆里的春节",
      postImg: "/images/post/post-1.jpg",
      avatar: "/images/avatar/avatar-3.png",
      content: "年少时，有几样东西，是春节里必不可少的：烟花、新衣、凉菜、压岁钱、饺子。年分大小年，有的地方是腊月二十三过小年，而有的地方是腊月二十四...",
      readingNum: 92,
      collectionNum: {
        array: [108]
      },
      commentNum: 7
    },
    ]
    this.setData({
      postList: postList
    })
  }
})