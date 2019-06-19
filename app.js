App({
  onLaunch: function() {
    this._initCloud()
  },

  _initCloud() {
    wx.cloud.init({
      env: 'lin-bnvfq'
    })
  },

  baseUrl: 'http://t.yushu.im/',
  appKey: 'test'
})