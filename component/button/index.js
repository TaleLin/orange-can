// component/button/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text:{
      type:String,
      value:''
    }
  },

  attached: function () {
    this.setData({
      content: this.properties.text
    })
    console.log('attached')
  },

  created: function () {
    console.log('created')
  },

  ready: function () {
    console.log('ready')
  },

  detached: function () {
    console.log('detached')
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
