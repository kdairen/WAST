// pages/lib/addLib/addLib.js
var app = getApp()
var hander = require('../../../utils/dataHander.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    modalHidden: true,
    name: '',
    modalTitle: '添加科目',
    modalMsg: '',
    modaltap: 0,
  },
  //得到名称
  getName: function (e) {
    var str = e.detail.value;
    this.setData({
      name: str.replace(/(^\s*)|(\s*$)/g, "")
    })
  },
  //切换到modal对话框,添加科目
  modalTap0: function (e) {
    var that = this;
    if (that.data.name == '') {
      wx.showToast({
        title: '名称不能为空',
      })
    }
    else {
      this.setData({
        modaltap: 0,
        modalTitle: '添加科目',
        modalMsg: that.data.name,
        modalHidden: false
      })
    }
  },
  //切换到modal对话框，设置默认题库
  modalTap1: function (e) {
    var that = this;
    this.setData({
      modaltap: 1,
      modalTitle: '恢复默认科目！',
      modalMsg: '',
      modalHidden: false
    })
  },
  //确认
  modalFirm: function (e) {
    var that = this;
    this.setData({
      modalHidden: true
    })
    if (that.data.modaltap == 0){
      var state = hander.addLib(that.data.name);
      if (state == 1) {
        wx.navigateBack({})
      }
      else if (state == 0){//如果失败，提示题库已存在
        wx.showToast({
          title: that.data.name + '已存在',
        })
      }else{
        wx.showToast({
          title: '科目数量超出限制！',
        })
      }
    } else if (that.data.modaltap == 1) {
      this.setDefaultData();
      wx.showToast({
        title: '已恢复',
      })
    }
  },
  //设置默认科目和题库排序
  setDefaultData: function () {
    var defaultLibs = require('../../../utils/defaultLib.js').defaultLibs;
    var name_order = [];
    var fallible = {};
    for (var key in defaultLibs) {
      var lib = defaultLibs[key];
      var itemOrder = [];
      itemOrder.push(key);
      var libMsg = {};
      for (var subKey in lib) {
        itemOrder.push(subKey);
        var len = lib[subKey]['items'].length;
        var a = new Array(len);
        a.fill(0);
        libMsg[subKey] = a;
      }
      name_order.push(itemOrder);
      fallible[key] = libMsg;
    }
    app.globalData.libs = defaultLibs;
    app.globalData.name_order = name_order;
    app.globalData.fallible = fallible;
    wx.setStorage({
      key: 'libs',
      data: defaultLibs,
    });
    wx.setStorage({
      key: 'name_order',
      data: name_order,
    });
    wx.setStorage({
      key: 'fallible',
      data: fallible
    });
  },
  //取消
  modalCancel: function (e) {
    this.setData({ modalHidden: true })
  }
})