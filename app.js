//app.js
App({
  globalData: {
    windowHeight: 0,//屏幕高度
    libs: {},//全部科目列表
    name_order: [],//记录所有科目和题库的排序
    fallible:{},//记录收藏的易错题
    selectLib: null,//当前选择的科目
    selectSub: null,//当前选择的题库
    tp: null,//题型
    form: {},//格式化的数据
    form_len: 0,//格式化题目的个数
    items: [],//当前做的题
    order: [],//题目顺序
    answers: [],//用户的答案
    time :0, //做题时间
    starMsg: [],//记录当前题库标记的重点
    starPosition:[], //记录做起错题时的位置
    isFall : false, //判断是否是做易错题模式
  },
  onLaunch: function () {

    //调用API从本地缓存中获取数据
    var version = wx.getStorageSync('version'); //读取版本号

    if (version == '1.0'){
      //读取本地题库，赋值到全局变量
      var libs = wx.getStorageSync('libs');
      var name_order = wx.getStorageSync('name_order');
      var fallible = wx.getStorageSync('fallible');
      if (libs != '' && name_order != '' && fallible !='') {
        this.globalData.libs = libs;
        this.globalData.name_order = name_order;
        this.globalData.fallible = fallible;
      }
      else {
        var that = this;
        that.setDefaultData();
      }
    }
    else{
      wx.setStorage({
        key: 'version',
        data: '1.0'
      });
      var that = this;
      that.setDefaultData();
    }

    //获取屏幕高度
    var windowHeight = 0;
    wx.getSystemInfo({
      success: function (res) {
        windowHeight = res.windowHeight;
        }
    })
    this.globalData.windowHeight = windowHeight;
  },
  //设置默认科目和题库排序
  setDefaultData: function () {
    var defaultLibs = require('/utils/defaultLib.js').defaultLibs;
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
    this.globalData.libs = defaultLibs;
    this.globalData.name_order = name_order;
    this.globalData.fallible = fallible;
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
  }
})