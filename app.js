App({
  onLaunch: function () {
    var storageData = wx.getStorageSync('postList');
    if (!storageData) {
      //如果postList缓存不存在
      var dataObj = require("data/data.js")
      wx.clearStorageSync();
      wx.setStorageSync('postList', dataObj.postList);
    }
  },
  baseUrl:'http://t.yushu.im/',
  appKey:'123'
})