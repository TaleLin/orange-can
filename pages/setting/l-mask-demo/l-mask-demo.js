Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onClose:function(){
    this.setData({
      show:false
    })
  },

  
})