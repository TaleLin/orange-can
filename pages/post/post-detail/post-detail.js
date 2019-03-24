import {
  DBPost
} from '../../../data/db.js'

Page({
  data: {},
  onLoad: function(options) {
    var postId = options.id
    this.dbPost = new DBPost(postId)
    this.postData = this.dbPost.getPostItemById().data
    this.setData({
      post: this.postData
    })
    this.addReadingTimes()
  },
  onReady: function() {
    wx.setNavigationBarTitle({
      title: this.postData.title
    })
  },
  onCollectionTap: function(event) {
    //dbPost对象已在onLoad函数里被保存到了this变量中，无须再次实例化
    var newData = this.dbPost.collect();

    //重新绑定数据。注意，不要将整个newData全部作为setData的参数，
    //应当有选择地更新部分数据
    this.setData({
      'post.collectionStatus': newData.collectionStatus,
      'post.collectionNum': newData.collectionNum
    })

    wx.showToast({
      title: newData.collectionStatus ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success",
      mask: true
    })
  },

  onCommentTap: function(event) {
    var id = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: '../post-comment/post-comment?id=' + id
    })
  },

  addReadingTimes: function () {
    this.dbPost.addReadingTimes()
  }

})