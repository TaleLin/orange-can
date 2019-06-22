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
        data: comment
      })
    this.addCommentNum()
  }


  async collect() {
    const status = await this.getUserStatus()
    // console.log(status)

    //如果用户状态表未创建
    if (status === null) {
      this.db.collection('user_post')
        .add({
          data: {
            postId: this.id,
            collectionStatus: true,
          }
        })
      this.addCollectionNum()
    } else {
      const _collectionStatus = status.collectionStatus
      console.log(_collectionStatus)
      this.db.collection('user_post').doc(status._id)
        .update({
          data: {
            collectionStatus: !_collectionStatus,
          }
        })
      console.log(_collectionStatus)
      if (_collectionStatus) {
        this.subtractCollectionNum()
      }
      else {
        this.addCollectionNum()
      }
    }
  }

  addCollectionNum() {
    wx.cloud.callFunction({
      name: 'updatePostData',
      data: {
        category: 'collect',
        id: this.id
      }
    })
  }

  subtractCollectionNum() {
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


  async uploadImgsToCloud(imgs, folderName) {
    let cloudIds = []
    for (let img of imgs) {
      const info = await promisic(wx.getImageInfo)({
        src: img
      })

      const imgName = randomStr(36)
      const fullCloudPath = folderName + '/' + imgName + '.' + info.type
      // const format = 

      const res = await wx.cloud.uploadFile({
        cloudPath: fullCloudPath,
        filePath: img
      })
      cloudIds.push(res.fileID)
    }
    console.log(cloudIds)
    return cloudIds
  }

  async uploadAudioToCloud(audio, folderName) {
    const audioName = randomStr(36)
    const format = audio.split('.').pop()
    const fullCloudPath = folderName + '/' + audioName + '.' + format
    const res = await wx.cloud.uploadFile({
      cloudPath: fullCloudPath,
      filePath: audio
    })
    console.log(res)
    return res.fileID
  }


  //获取指定id号的文章数据
  async getPostItemById() {
    // 获取post实体
    const resPost = await this.db.collection('post')
      .doc(this.id)
      .get()
    const post = resPost.data
    const _postId = post._id

    // 获取用户对于当前post的状态
    const status = await this.getUserStatus()
    if (!status) {
      post.collectionStatus = false
    } else {
      post.collectionStatus = status.collectionStatus
    }

    return post
  }

  async getCommentData() {
    // var post = this.getPostItemById()
    const res = await this.db.collection('comment')
      .where({
        postId: this.id
      })
      .get()
    const comments = res.data
    console.log(comments)
    if (comments.length === 0) {
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

  addCommentNum() {
    wx.cloud.callFunction({
      name: 'updatePostData',
      data: {
        id: this.id,
        category: 'comment'
      }
    }).then(res => {
      console.log(res)
    })
  }

};
export {
  DBPost
}