import {
  DBPost
} from '../../../data/db.js';

Page({
  data: {
    useKeyboardFlag: true
  },
  onLoad: function(options) {
    var postId = options.id;
    this.dbPost = new DBPost(postId);
    var comments = this.dbPost.getCommentData();

    // 绑定评论数据
    this.setData({
      comments: comments
    });
  },

  previewImg: function(event) {
    //获取评论序号
    var commentIdx = event.currentTarget.dataset.commentIdx,
      //获取图片在图片数组中的序号
      imgIdx = event.currentTarget.dataset.imgIdx,
      //获取评论的全部图片
      imgs = this.data.comments[commentIdx].content.img;
    wx.previewImage({
      current: imgs[imgIdx], // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
    })
  },
  switchInputType: function(event) {
    this.setData({
      useKeyboardFlag: !this.data.useKeyboardFlag
    })
  },
  bindCommentInput: function(event) {
    var val = event.detail.value;
    this.data.keyboardInputValue = val;
  },
  submitComment: function(event) {
    var newData = {
      username: "青石",
      avatar: "/images/avatar/avatar-3.png",
      // 评论时间
      create_time: new Date().getTime() / 1000,
      // 评论内容
      content: {
        txt: this.data.keyboardInputValue,
      },
    };
    if (!newData.content.txt) {
      // 如果没有评论内容，就不执行任何操作
      return;
    }
    //保存新评论到缓存数据库中
    this.dbPost.newComment(newData);
    //显示操作结果
    this.showCommitSuccessToast();
    //重新渲染并绑定所有评论
    this.bindCommentData();
    //恢复初始状态
    this.resetAllDefaultStatus();
  },

  showCommitSuccessToast: function() {
    //显示操作结果
    wx.showToast({
      title: "评论成功",
      duration: 1000,
      icon: "success"
    })
  },

  bindCommentData: function() {
    var comments = this.dbPost.getCommentData();
    // 绑定评论数据
    this.setData({
      comments: comments
    });
  },

  resetAllDefaultStatus: function() {
    //清空评论框
    this.setData({
      keyboardInputValue: ''
    });
  },
})