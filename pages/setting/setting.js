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
      fail: (error) => {
        console.log(error)
      }
    })
  },

  onJumpToMask: function(event) {
    wx.navigateTo({
      url: 'l-mask-demo/l-mask-demo',
    })
  },

  showSystemInfo: function() {
    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
      }
    })
  },

  showNetWork: function() {
    wx.getNetworkType({
      success: (res) => {
        wx.showToast({
          title: res.networkType,
          icon: 'none'
        })
      }
    })
  },

  getLonLat: function(callback) {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        callback(res.longitude, res.latitude, res.speed);
      }
    });
  },

  showLonLat: function() {
    this.getLonLat((lon, lat, speed) => {
      var lonStr = lon >= 0 ? '东经' : '西经',
        latStr = lat >= 0 ? '北纬' : '南纬';
      lon = lon.toFixed(2);
      lat = lat.toFixed(2);
      lonStr += lon;
      latStr += lat;
      speed = (speed || 0).toFixed(2);
      wx.showModal({
        title: '',
        content: '当前位子：' + lonStr + ', ' + latStr + '。速度：' + speed + 'm / s',
      })
    });
  },

  scanQRCode: function () {
    wx.scanCode({
      success: function (res) {
        console.log(res)
        wx.showModal({
          title:'扫描二维码/条形码',
          content: res.result
        });
      },
      fail: function (res) {
        wx.showModal({
          title: '扫描二维码/条形码',
          content: '扫码失败，请重试'
        });
      }
    })
  },

  onUpLoadFile(){
    wx.chooseImage({
      success: chooseResult => {
        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: 'my-photo.png',
          // 指定要上传的文件的小程序临时文件路径
          filePath: chooseResult.tempFilePaths[0],
          // 成功回调
          success: res => {
            console.log('上传成功', res)
          },
        })
      },
    })
  }

})