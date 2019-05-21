// pages/dati/dati.js
const road_url = require('../../config').road_url
const people_url = require('../../config').people_url
const book_url = require('../../config').book_url
const result_url = require('../../config').result_url
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    road: {
      progress: 20,
      title: "",
      option: {},
      result: [],
      timuData: [],
      i: 1
    },
    id: '',
    rurl: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    var that = this
    var id = options.id
    if (id == '1') {
      that.data.id = id
      that.data.rurl = road_url
    } else if (id == '2') {
      that.data.id = id
      that.data.rurl = people_url
    } else if (id == '3') {
      that.data.id = id
      that.data.rurl = book_url
    }
    wx.request({
      url: that.data.rurl,
      success: function(res) {
        var timuData = res.data.data
        // console.log(typeof(timuData))
        // console.log(timuData)
        // console.log(timuData[0])        
        that.setData({
          'road.timuData': res.data.data,
          'road.title': timuData[0].title,
          'road.option': timuData[0].option
        })
      }
    })
  },
  radioChange: function(e) {
    //如果没有发生选择变化则不会执行这个函数
    var nu = this.data.road.i - 1
    // console.log(nu)
    // console.log(typeof(nu))
    this.setData({
      [`road.result[${nu}]`]: e.detail.value
    })
  },
  nextTitle: function() {
    //如果没有被选择需要提醒

    var nu = this.data.road.i
    // console.log(nu)
    if (nu < 5) {
      var nextData = this.data.road.timuData
      var progress = this.data.road.progress
      this.setData({
        'road.title': nextData[nu].title,
        'road.option': nextData[nu].option,
        'road.progress': progress + 20,
        'road.i': nu + 1
      })
    } else if (nu == 5) {
      // console.log(app.globalData.userInfo.nickName)
      var road_result = this.data.road.result
      var that = this
      wx.request({
        url: result_url,
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          'id': this.data.id,
          'openId': app.globalData.openId,
          'result': road_result
        },
        success: function() {
          // console.log('POST sucess!')          
        }
      })
      wx.navigateTo({
        url: '../share/share?id=' + that.data.id
      })
      // wx.setStorageSync('roal_result',road_result)
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})