// pages/main/result/result.js
var app = getApp()
var hander = require('../../../utils/dataHander.js')
Page({
  data: {
    windowHeight: 0,
    tp: 0,//题库类型
    total: 0,
    done: 0,
    wrongNum: 0,
    wrongText: "",
    wrongItems: [],
    time: '',
    starIndex: []
  },
  practice: function () {
    var that = this;
    if (that.data.wrongNum == 0) {
      wx.showToast({
        title: "没有错题哦(●'◡'●)ﾉ♥",
      })
    }
    else {
      app.globalData.ifFall = true;
      app.globalData.items = that.data.wrongItems;
      var order = new Array(that.data.wrongNum);
      for (var i = 0; i < order.length; i++) {
        order[i] = i;
      }
      app.globalData.order = order;

      if (that.data.tp == 0) {
        wx.navigateTo({ url: '../single/single' })
      }
      else if (that.data.tp == 1) {
        wx.navigateTo({ url: '../multiple/multiple' })
      }
      else if (that.data.tp == 2) {
        wx.navigateTo({ url: '../judge/judge' })
      }
    }
  },
  //批改单选题
  checkSingle: function () {
    var items = app.globalData.items;
    var answers = app.globalData.answers;
    var order = app.globalData.order;
    var wrongNum = 0;
    var doneNum = 0;
    var wrongItems = [];
    var starPosition = [];
    var wrongText = "";
    var isFall = app.globalData.ifFall;
    var starMsg = [];
    for (var i = 0; i < items.length; i++) {
      var on = order[i];
      if (answers[on] != '') {
        doneNum++;
        if (answers[on] != items[on][0]) {
          wrongNum++;
          wrongItems.push(items[on]);
          starMsg.push(app.globalData.starMsg[on]);
          if (!isFall) {
            starPosition.push([app.globalData.selectLib, app.globalData.selectSub, on]);
          }
          else {
            starPosition.push(app.globalData.starPosition[on]);
          }
          wrongText += items[on][0] + " - - - - 错:" + answers[on] + "\n";
          for (var j = 1; j < items[on].length; j++) {
            wrongText += items[on][j] + "\n";
          }
          wrongText += "\n";
        }
      }
    }
    app.globalData.starMsg = starMsg;
    app.globalData.starPosition = starPosition;

    this.setData({
      total: items.length,
      done: doneNum,
      wrongNum: wrongNum,
      wrongText: wrongText,
      wrongItems: wrongItems
    });
  },
  //判断多选答案是否正确
  isRight(daan, answer) {
    if (answer.length == daan.length) {
      for (var i = 0; i < daan.length; i++) {
        if (answer.indexOf(daan.charAt(i)) < 0) {
          return false;
        }
      }
      return true;
    }
    else return false;
  },
  //批改多选题
  checkMultiple: function () {
    var that = this;
    var items = app.globalData.items;
    var answers = app.globalData.answers;
    var order = app.globalData.order;
    var wrongNum = 0;
    var doneNum = 0;
    var starPosition = [];
    var wrongItems = [];
    var wrongText = "";
    var isFall = app.globalData.ifFall;
    var starMsg = [];
    for (var i = 0; i < items.length; i++) {
      var on = order[i];
      if (answers[i] != '') {
        doneNum++;
        if (!that.isRight(items[i][0], answers[i])) {
          wrongNum++;
          wrongItems.push(items[i]);
          starMsg.push(app.globalData.starMsg[on]);
          if (!isFall) {
            starPosition.push([app.globalData.selectLib, app.globalData.selectSub, on]);
          }
          else {
            starPosition.push(app.globalData.starPosition[on]);
          }
          wrongText += items[i][0] + " - - - - 错:" + answers[i] + "\n";

          for (var j = 1; j < items[i].length; j++) {
            wrongText += items[i][j] + "\n";
          }
          wrongText += "\n";
        }
      }
    }
    app.globalData.starMsg = starMsg;
    app.globalData.starPosition = starPosition;
    this.setData({
      total: items.length,
      done: doneNum,
      wrongNum: wrongNum,
      wrongText: wrongText,
      wrongItems: wrongItems
    });
  },
  //批改判断题
  checkJudge: function () {
    var items = app.globalData.items;
    var answers = app.globalData.answers;
    var order = app.globalData.order;
    var wrongNum = 0;
    var doneNum = 0;
    var starPosition = [];
    var wrongItems = [];
    var wrongText = "";
    var isFall = app.globalData.ifFall;
    var starMsg = [];
    for (var i = 0; i < items.length; i++) {
      var on = order[i];
      if (answers[i] != '') {
        doneNum++;
        if (answers[i] != items[on][0]) {
          wrongNum++;
          wrongItems.push(items[on]);
          starMsg.push(app.globalData.starMsg[on]);
          if (!isFall) {
            starPosition.push([app.globalData.selectLib, app.globalData.selectSub, on]);
          }
          else {
            starPosition.push(app.globalData.starPosition[on]);
          }
          if (items[on][0] == "T") {
            wrongText += "对" + "\n" + items[on][1] + "\n\n";
          } else {
            wrongText += "错" + "\n" + items[on][1] + "\n\n";
          }
        }
      }
    }
    app.globalData.starMsg = starMsg;
    app.globalData.starPosition = starPosition;
    this.setData({
      total: items.length,
      done: doneNum,
      wrongNum: wrongNum,
      wrongText: wrongText,
      wrongItems: wrongItems
    });
  },
  formatTime: function (value) {
    var theTime = parseInt(value);// 秒
    var theTime1 = 0;// 分
    var theTime2 = 0;// 小时
    if (theTime > 60) {
      theTime1 = parseInt(theTime / 60);
      theTime = parseInt(theTime % 60);
      if (theTime1 > 60) {
        theTime2 = parseInt(theTime1 / 60);
        theTime1 = parseInt(theTime1 % 60);
      }
    }
    var result = "" + parseInt(theTime) + "秒";
    if (theTime1 > 0) {
      result = "" + parseInt(theTime1) + "分" + result;
    }
    if (theTime2 > 0) {
      result = "" + parseInt(theTime2) + "小时" + result;
    }
    return result;
  },
  onLoad: function () {
    var that = this;
    var tp = app.globalData.tp;
    this.setData({ tp: tp });
    if (tp == 0) that.checkSingle();
    else if (tp == 1) that.checkMultiple();
    else if (tp == 2) that.checkJudge();
    this.setData({
      time: that.formatTime(app.globalData.time / 1000),
      windowHeight: app.globalData.windowHeight,
    });
  }
})