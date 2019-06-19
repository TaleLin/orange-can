import {
  DBPost
} from '../../data/db-cloud.js'

Page({
  data: {},

  onLoad: async function() {
    const posts = await DBPost.getAllPostData()
    this.setData({
      postList: posts
    })
  },

  onTapToDetail(event) {
    var postId = event.currentTarget.dataset.postId
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