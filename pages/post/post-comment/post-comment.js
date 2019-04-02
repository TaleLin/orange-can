import {
  DBPost
} from '../../../data/db.js';

Page({
  data: {
    useKeyboardFlag: true,
    showMediaFlag: false,
    choosedImgs: [],
  },
  onLoad: function(options) {
    var postId = options.id;
    this.dbPost = new DBPost(postId);
    var comments = this.dbPost.getCommentData()

    this.initRecordMgr()
    this.initAudioMgr()

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
      imgs = this.data.comments[commentIdx].content.img

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
    var val = event.detail.value
    this.data.keyboardInputValue = val
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
        img: this.data.choosedImgs
      },
    }
    if (!newData.content.txt) {
      // 如果没有评论内容，就不执行任何操作
      return
    }
    //保存新评论到缓存数据库中
    this.dbPost.newComment(newData)
    //显示操作结果
    this.showCommitSuccessToast()
    //重新渲染并绑定所有评论
    this.bindCommentData()
    //恢复初始状态
    this.resetAllDefaultStatus()
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
    })
  },

  resetAllDefaultStatus: function() {
    //清空评论框、清空image-picker并关闭面板
    this.setData({
      keyboardInputValue: '',
      choosedImgs: [],
      showMediaFlag: false
    })
  },

  showMedia: function() {
    this.setData({
      showMediaFlag: !this.data.showMediaFlag
    })
  },

  getAllImgs: function(event) {
    this.data.choosedImgs = event.detail.all
  },

  //开始录音
  recordStart: function() {
    console.log('recording')
    this.setData({
      recodingClass: 'recoding'
    });
    this.rMgr.start()
  },

  //结束录音
  recordEnd: function() {
    this.setData({
      recodingClass: ''
    });
    this.rMgr.stop()
  },

  initRecordMgr: function() {
    // 初始化录音管理器
    var rMgr = wx.getRecorderManager()
    this.rMgr = rMgr
    rMgr.onStart(() => {
      console.log('start record')
    })

    rMgr.onStop((res) => {
      console.log('stop record', res)
      const {
        tempFilePath,
        duration
      } = res

      //发送录音
      this.submitVoiceComment({
        url: tempFilePath,
        timeLen: Math.ceil(duration / 1000)
      })
    })
  },

  //提交录音 
  submitVoiceComment: function(audio) {
    var newData = {
      username: "青石",
      avatar: "/images/avatar/avatar-3.png",
      create_time: new Date().getTime() / 1000,
      content: {
        txt: '',
        img: [],
        audio: audio
      },
    };

    //保存新评论到缓存数据库中
    this.dbPost.newComment(newData)

    //显示操作结果
    this.showCommitSuccessToast()

    //重新渲染并绑定所有评论
    this.bindCommentData()
  },

  initAudioMgr: function() {
    // 初始化录音管理器
    var aMgr = wx.createInnerAudioContext()
    this.aMgr = aMgr
    this.playing = false

    aMgr.onPlay(() => {
      console.log('start play')
      this.playing = true
    })

    aMgr.onEnded(() => {
      console.log('ended play')
      this.playing = false
    })

    aMgr.onStop((res) => {
      console.log('stop play')
      this.playing = false
    })
  },

  playAudio: function(event) {
    var url = event.currentTarget.dataset.url

    // 如果正在播放
    if (this.playing) {
      if (url == this.aMgr.src) {
        // 如果url相同说明是结束播放
        this.aMgr.stop()
      } else {
        // 如果url不同则说明用户点了另外的音频
        // 需要立即播放新音频
        this.aMgr.src = url
        this.aMgr.play()
      }
    }

    //如果没有播放，那么立即播放
    else {
      console.log(url)
      this.aMgr.src = url
      this.aMgr.play()
    }
  }

})