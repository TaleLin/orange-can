import {
  DBPost
} from '../../data/db.js'

Page({
  data: {},

  onLoad: function() {
    var dbPost = new DBPost()
    this.setData({
      postList: dbPost.getAllPostData()
    })
  },

  onTapToDetail(event) {
    var postId = event.currentTarget.dataset.postId
    console.log(postId)
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  },

  onSwiperTap: function(event) {
    var postId = event.target.dataset.postId;
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    })
  },

  onShareAppMessage(res) {

  }
})