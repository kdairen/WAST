//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
  },
  //开始学习
  btnStart: function () {
    wx.navigateTo({
      url: '../lib/libs/libs',
    })
  },
  //使用说明
  btnIntroduce: function () {
    wx.navigateTo({
      url: '../introduce/introduce',
    })
  },
  onLoad: function () {

  }
})
