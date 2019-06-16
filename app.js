App({
  onLaunch: function () {
    this._initCloud()
    var storageData = wx.getStorageSync('postList');
    if (!storageData) {
      //如果postList缓存不存在
      var dataObj = require("data/data.js")
      wx.clearStorageSync();
      wx.setStorageSync('postList', dataObj.postList);
    }
  },
  _initCloud(){
    wx.cloud.init({
      env: 'lin-bnvfq'
    })
  },
  baseUrl:'http://t.yushu.im/',
  appKey:'test'
})