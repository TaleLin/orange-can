class DBPost {
  constructor(url) {
    this.storageKeyName = 'postList';
  }

  //得到全部文章信息
  getAllPostData() {
    var res = wx.getStorageSync(this.storageKeyName);
    return res;
  }

  // 保存或者更新缓存数据
  execSetStorageSync(data) {
    wx.setStorageSync(this.storageKeyName, data);
  }
};
export { DBPost }