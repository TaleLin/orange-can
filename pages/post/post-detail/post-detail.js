import {
  DBPost
} from '../../../data/db-cloud.js'

Page({
  data: {
    post: null,
  },
  onLoad: async function(options) {
    var postId = options.id
    this.dbPost = new DBPost(postId)
    this.postData = await this.dbPost.getPostItemById()

    this.setData({
      post: this.postData
    })
    this.addReadingTimes()
    wx.setNavigationBarTitle({
      title: this.postData.title
    })
  },

  onCollectionTap: function(event) {
    const currentPost = this.data.post
    this.dbPost.collect()
    wx.showToast({
      title: currentPost.collectionStatus ? "取消成功" : "收藏成功",
      duration: 1000,
      icon: "success",
      mask: true
    })
    this._changeStatus(currentPost)
  },

  _changeStatus(currentPost){
    const newStatus = !currentPost.collectionStatus
    let newCollectionNum = 0
    if(currentPost.collectionStatus){
      newCollectionNum = currentPost.collectionNum-1
      console.log(newCollectionNum)
    }
    else{
      newCollectionNum = currentPost.collectionNum+1
      console.log(newCollectionNum)
    }
    this.setData({
      'post.collectionStatus': newStatus,
      'post.collectionNum': newCollectionNum
    })
  },

  onCommentTap: function(event) {
    var id = event.currentTarget.dataset.postId;
    console.log(id)
    wx.navigateTo({
      url: '../post-comment/post-comment?id=' + id
    })
  },

  addReadingTimes: function() {
    this.dbPost.addReadingTimes()
  },

})