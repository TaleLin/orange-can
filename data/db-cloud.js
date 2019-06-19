import {
  getDiffTime,
  promisic,
  randomStr
} from '../util/util.js'

class DBPost {
  constructor(id) {
    this.storageKeyName = 'postList'
    this.id = id
    this.db = wx.cloud.database()
  }

  //得到全部文章信息
  static async getAllPostData() {
    const db = wx.cloud.database()
    const res = await db.collection('post').get()
    return res.data
  }

  async newComment(comment) {
    comment.postId = this.id
    await this.db.collection('comment')
    .add({
      data:comment
    })
  }

  // 保存或者更新缓存数据
  execSetStorageSync(data) {
    wx.setStorageSync(this.storageKeyName, data);
  }

  async collect() {
    const status = await this.getUserStatus()
    console.log(status)
    if (!status) {
      this.db.collection('user_post')
        .add({
          data: {
            postId: this.id,
            collectionStatus: false,
          }
        })
      this.addCollectionNum()
    } else {
      const _collectionStatus = status.collectionStatus
      this.db.collection('user_post').doc(status._id)
        .update({
          data: {
            collectionStatus: !_collectionStatus,
          }
        })
      console.log(_collectionStatus)
      if (_collectionStatus){
        this.subtractCollectionNum()
      }
      else{
        this.addCollectionNum()
      }
    }
  }

  async addCollectionNum() {
    wx.cloud.callFunction({
      name: 'updatePostData',
      data: {
        category: 'collect',
        id: this.id
      }
    })
  }

  async subtractCollectionNum() {
    wx.cloud.callFunction({
      name: 'updatePostData',
      data: {
        category: 'disCollect',
        id: this.id
      }
    })
  }

  async getUserStatus() {
    const res = await this.db.collection('user_post')
      .where({
        postId: this.id
      })
      .get()
    if (res.data.length === 0) {
      return null
    } else {
      return res.data[0]
    }
  }

  async updatePostData(category, comment) {
    switch (category) {
      case 'collect':
        //处理收藏
        if (!postData.collectionStatus) {
          //如果当前状态是未收藏
          postData.collectionNum++;
          postData.collectionStatus = true;
        } else {
          // 如果当前状态是收藏
          postData.collectionNum--;
          postData.collectionStatus = false;
        }
        break;
      case 'comment':
        postData.comments.push(comment);
        postData.commentNum++;
        break;
      case 'reading':

        break;
      default:
        break;
    }
  }

  async uploadImgsToCloud(imgs, folderName){
    let cloudIds = []
    for (let img of imgs) {
      const info = await promisic(wx.getImageInfo)({
        src: img
      })

      const imgName = randomStr(36)
      const fullCloudPath = './'+folderName+'/' + imgName + '.' + info.type
      // const format = 
      console.log(fullCloudPath)
      const res = await wx.cloud.uploadFile({
        cloudPath: fullCloudPath,
        filePath: img
      })
      cloudIds.push(res.fileID)
    }
    return cloudIds
  }

  async uploadAudioToCloud(audio, folderName){
    const audioName = randomStr(36)
    const fullCloudPath = './' + folderName + '/' + audioName + '.aac'
    const res = await wx.cloud.uploadFile({
      cloudPath: fullCloudPath,
      filePath: audio
    })
    console.log(res)
    return res.fileID
  }


  //获取指定id号的文章数据
  async getPostItemById() {
    const resPost = await this.db.collection('post')
      .doc(this.id)
      .get()
    const post = resPost.data
    const _postId = post._id
    const status = await this.getUserStatus()
    if (!status) {
      post.collectionStatus = false
    } else {
      post.collectionStatus = status.collectionStatus
    }
    return post
  }

  async getCommentData() {
    var post = this.getPostItemById()
    const res = await this.db.collection('comment')
      .where({
        postId:this.id
      })
      .get()
    const comments = res.data
    console.log(comments)
    if(comments.length===0){
      return []
    }
    //按时间降序排列评论
    comments.sort(this.compareWithTime)
    for (let comment of comments) {
      // 将comment中的时间戳转换成可阅读格式
      comment.create_time = getDiffTime(comment.create_time, true)
    }
    return comments
  }

  compareWithTime(value1, value2) {
    var flag = parseFloat(value1.create_time) - parseFloat(value2.create_time);
    if (flag < 0) {
      return 1;
    } else if (flag > 0) {
      return -1
    } else {
      return 0;
    }
  }

  addReadingTimes() {
    wx.cloud.callFunction({
      name: 'updatePostData',
      data: {
        id: this.id,
        category: 'reading'
      }
    })
  }

};
export {
  DBPost
}