// pages/sub/addSub/addSub.js
var app = getApp()
var hander = require('../../../utils/dataHander.js')
var format = require('../../../utils/format.js')
Page({
  data: {
    windowHeight: 0,
    txt: null,
    formTxt: null,
    inputShow: true,
    btn1Name: '清空',
    btn2Name: "查找",
    name: '',
    rbtnChecked: 'a',
    modalHidden: true,
  },
  radioChange: function (e) {
    this.setData({
      rbtnChecked: e.detail.value
    })
  },
  txtChange: function (e) {
    this.setData({
      txt: e.detail.value
    })
  },
  //得到名称
  getName: function (e) {
    var str = e.detail.value;
    this.setData({
      name: str.replace(/(^\s*)|(\s*$)/g, "")
    })
  }
  ,
  btn1click: function () {
    var that = this;
    if (that.data.btn1Name == "清空") {
      this.setData({
        txt: null
      })
    } else {
      this.setData({
        inputShow: true,
        btn1Name: "清空",
        btn2Name: "查找"
      })
    }

  },
  btn2click: function () {
    var that = this;
    if (that.data.btn2Name == "查找") {
      var str = '';
      if (that.data.rbtnChecked == 'a') {
        str = format.form(that.data.txt, 0);
      }
      else if (that.data.rbtnChecked == 'b') {
        str = format.form(that.data.txt, 1);
      } else if (that.data.rbtnChecked == 'c') {
        str = format.form(that.data.txt, 2);
      }

      this.setData({
        formTxt: str,
        inputShow: false,
        btn1Name: "返回",
        btn2Name: "保存",
      })

      if (app.globalData.form != null) {
        var len = app.globalData.form_len;
        console.log(len);
        wx.showToast({
          title: '找到' + len + '题,请仔细核对'
        })
      }
      else {
        this.setData({
          formTxt: '没有找到该题型,请返回并检查格式！',
        })
      }
    }
    else {
      console.log(app.globalData.form)
      if (app.globalData.form == null) {
        wx.showToast({
          title: '没有题目哦',
        })
      }
      else if (that.data.name == '') {
        wx.showToast({
          title: '名称不能为空',
        })
      }
      else {
        this.setData({
          modalHidden: false
        })
      }
    }
  },
  //确认
  modalFirm: function (e) {
    var that = this;
    this.setData({
      modalHidden: true
    })
    var state = hander.addSub(that.data.name);
    if (state == 1) {
      wx.navigateBack({})
    }
    else if (state == 0){//如果失败，提示题库已存在
      wx.showToast({
        title: that.data.name + '已存在',
      })
    }else{
      wx.showToast({
        title: '题库数量超出限制！',
      })
    }
  },
  //取消
  modalCancel: function (e) {
    this.setData({
      modalHidden: true
    })
  },
  onLoad: function () {
    this.setData({
      windowHeight: app.globalData.windowHeight,
      inputShow: true,
     })
  }
})