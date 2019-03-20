import { DBPost } from '../../data/db.js'

Page({
  data: {
  },
  onLoad: function () {
    var dbPost = new DBPost();
    this.setData({
      postList: dbPost.getAllPostData()
    });
  },
})	