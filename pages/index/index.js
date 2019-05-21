//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    photos: [
      {
      data: [{
        bzphoto: "",
        qianming: "喵喵喵",
        name: "Rose|21岁",
        where: "北京"
      }, {
        bzphoto: "",
        qianming: "像风一样！",
        name: "Ailsa|26岁",
        where: "广州"}]
    },{
      data: [{
        bzphoto: "",
        qianming: "喵喵喵",
        name: "Rose|21岁",
        where: "北京"
      }, {
        baphoto: "",
        qianming: "像风一样！",
        name: "Ailsa|26岁",
        where: "广州"}]
    },{
      data: [{
        bzphoto: "",
        qianming: "喵喵喵",
        name: "Rose|21岁",
        where: "北京"
      }, {
        baphoto: "",
        qianming: "像风一样！",
        name: "Ailsa|26岁",
        where: "广州"
      }]
    }]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../userinfo/userinfo'
    })
  },
  bindBigdata: function () {
    wx.navigateTo({
      url: '../bigdata/bigdata'
    })
  },
  bindDati: function () {
    wx.navigateTo({
      url: '../title/title'
    })
  },
  bindBaozhao: function () {
    wx.navigateTo({
      url: '../baozhao/baozhao'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.login({
      success:function(res){
        if (res.code){
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data:{
              appid: 'wx4d9ac396de7f196c',
              secret: '279966e7e1074d5135e1db40f338e88a',
              js_code:res.code,
              grant_type:'authorization_code'
            },
            success:function(res){
              app.globalData.openId=res.data.openid
            }
          })
        }else{
          console.log('登录失败！')
        }
      }
    })  
  },
  getUserInfo: function (e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
