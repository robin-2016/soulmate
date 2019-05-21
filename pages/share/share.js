// pages/share/share.js
const static_url = require('../../config').static_url
const result_url = require('../../config').result_url
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    rwidth: 0,
    rheight: 0,
    sharetmp: '',
    bname:'',
    yanzhi:'',
    jiating:'',
    shiye:'',
    langman:''
  },

  savePhoto: function() {
    var that = this
    wx.canvasToTempFilePath({
      canvasId: 'shareCanvas',
      sucess: function(res) {
        that.setData({
          sharetmp: res.tempFilePath
        })
      }
    })
    // console.log(this.data.sharetmp)
    // console.log(typeof(this.data.sharetmp))
    wx.saveImageToPhotosAlbum({
        filePath: this.data.sharetmp,
        success: function() {
          wx.showModal({
            title: '提示',
            content: '成功保存到相册中',
            showCancel:false
          })
        },
        fail: function (err) {
          console.log(err)
          wx.showModal({
            title: '错误',
            content: '保存失败，请重新尝试保存',
            showCancel:false
          })
      }
    })
},
pipei: function() {

},
/**
 * 生命周期函数--监听页面加载
 */
onLoad: function(options) {
  var that = this
  that.data.id=options.id
  wx.getSystemInfo({
    success: function(res) {
      that.setData({
        rwidth: res.windowWidth,
        rheight: res.windowHeight
      })
    },
  })
  wx.request({
    url: result_url,
    method:'get',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    data:{
      'id':that.data.id,
      'openId': app.globalData.openId,
    },
    success:function(res){
      that.setData({
        bname:res.data.name,
        yanzhi:res.data.yanzhi,
        jiating:res.data.jiating,
        shiye:res.data.shiye,
        langman:res.data.langman
      })
    },
    fail:function(err){
      console.log(err)
    }
  })
},

/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady: function() {
  let that = this;
  let rwidth = that.data.rwidth * 0.8
  let rheight = that.data.rheight * 0.7
  // console.log(that.uinfo)
  // wx.getImageInfo({
  //   src: static_url+'touxiang01.jpg',
  // }).then()
  const ctx = wx.createCanvasContext('shareCanvas')
  ctx.setFontSize(20)
  ctx.setTextAlign('center')
  ctx.setFillStyle('#44BBBB')
  ctx.fillText('恭喜', (rwidth / 2), (rheight * 0.06))
  // ctx.drawImage("../images/first1.png", (rwidth/2), (rheight * 0.052), (rwidth * 0.091), (rheight * 0.091));
  ctx.drawImage(app.globalData.userInfo.avatarUrl, ((rwidth / 2) - 32), (rheight * 0.10), (64), (64));
  ctx.setFontSize(16)
  ctx.setTextAlign('center')
  ctx.setFillStyle('black')
  ctx.fillText(app.globalData.userInfo.nickName + ' 属于：', (rwidth / 2), (rheight * 0.33));
  ctx.setFontSize(18)
  // ctx.setTextAlign('center')
  ctx.setFillStyle('#44BBBB')
  ctx.fillText(that.data.bname, (rwidth / 2), (rheight * 0.39));
  ctx.setFontSize(16)
  ctx.setFillStyle('black')
  ctx.fillText('颜控值：'+that.data.yanzhi, (rwidth / 2), (rheight * 0.45));
  ctx.fillText('家庭责任感：'+that.data.jiating, (rwidth / 2), (rheight * 0.51));
  ctx.fillText('事业心：'+that.data.shiye, (rwidth / 2), (rheight * 0.57));
  ctx.fillText('浪漫度：'+that.data.langman, (rwidth / 2), (rheight * 0.63));
  ctx.drawImage('../images/xiaochengxuma.jpg', ((rwidth / 2) - 64), (rheight * 0.68), (128), (128));
  ctx.draw()
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
  wx.navigateTo({
    url: '../title/title'
  })
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