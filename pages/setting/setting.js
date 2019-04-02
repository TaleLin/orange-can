Page({
  data: {
    userInfo: {},
  },

  getMyInfo: function(event) {
    console.log(event)
    if (event.detail.userInfo) {
      this.setData({
        userInfo: event.detail.userInfo,
      })
    }
  },

  onLoad: function(options) {
    this._authorize()
  },

  authorize: function() {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          this._authorize()
        }
      }
    })
  },

  _authorize: function() {
    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    wx.getUserInfo({
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
        })
      },
      fail:(error)=>{
        console.log(error)
      }
    })
  },

  onJumpToMask:function(event){
    wx.navigateTo({
      url: 'l-mask-demo/l-mask-demo',
    })
  }

})