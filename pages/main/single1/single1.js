// pages/main/single1/single1.js
var app = getApp()
var hander = require('../../../utils/dataHander.js')
var fallible = require('../../../utils/fallible.js')
Page({
  data: {
    titleHeight: 0,
    opsHeight: 0,
    items: [],
    tishu: 0,
    index: 0,
    answers: [],
    item: [],
    bc_default: '#FBFBFB',
    bc_select: '#CAE1FF',
    bcA: '',
    bcB: '',
    bcC: '',
    bcD: '',
    bcE: '',
    beginTime: 0,
    pickerMsg: [],
    star: '☆',
    isFall: null,
    starPosition: []
  },
  setQuestion: function () {
    var that = this;
    var on = that.data.order[that.data.index];
    this.setData({
      item: that.data.items[on]
    })
    var ans = that.data.answers[on];
    if (ans == '') {
      this.setData({
        bcA: that.data.bc_default,
        bcB: that.data.bc_default,
        bcC: that.data.bc_default,
        bcD: that.data.bc_default,
        bcE: that.data.bc_default,
      });
    }
    else if (ans == 'A') {
      this.setData({
        bcA: that.data.bc_select,
        bcB: that.data.bc_default,
        bcC: that.data.bc_default,
        bcD: that.data.bc_default,
        bcE: that.data.bc_default,
      });
    }
    else if (ans == 'B') {
      this.setData({
        bcB: that.data.bc_select,
        bcA: that.data.bc_default,
        bcC: that.data.bc_default,
        bcD: that.data.bc_default,
        bcE: that.data.bc_default,
      });
    }
    else if (ans == 'C') {
      this.setData({
        bcC: that.data.bc_select,
        bcA: that.data.bc_default,
        bcB: that.data.bc_default,
        bcD: that.data.bc_default,
        bcE: that.data.bc_default,
      });
    }
    else if (ans == 'D') {
      this.setData({
        bcD: that.data.bc_select,
        bcA: that.data.bc_default,
        bcB: that.data.bc_default,
        bcC: that.data.bc_default,
        bcE: that.data.bc_default,
      });
    }
    else if (ans == 'E') {
      this.setData({
        bcE: that.data.bc_select,
        bcA: that.data.bc_default,
        bcB: that.data.bc_default,
        bcC: that.data.bc_default,
        bcA: that.data.bc_default,
      });
    }
    if (app.globalData.starMsg[on] == 0) {
      this.setData({ star: '☆' });
    } else {
      this.setData({ star: '★' });
    }
  },
  btnOpClick: function (e) {
    var that = this;
    var select = e.currentTarget.id;
    var on = that.data.order[that.data.index];
    this.data.answers[on] = select;
    if (select == 'A') {
      this.setData({
        bcA: that.data.bc_select,
        bcB: that.data.bc_default,
        bcC: that.data.bc_default,
        bcD: that.data.bc_default,
        bcE: that.data.bc_default,
      });
    }
    else if (select == 'B') {
      this.setData({
        bcB: that.data.bc_select,
        bcA: that.data.bc_default,
        bcC: that.data.bc_default,
        bcD: that.data.bc_default,
        bcE: that.data.bc_default,
      });
    }
    else if (select == 'C') {
      this.setData({
        bcC: that.data.bc_select,
        bcA: that.data.bc_default,
        bcB: that.data.bc_default,
        bcD: that.data.bc_default,
        bcE: that.data.bc_default,
      });
    }
    else if (select == 'D') {
      this.setData({
        bcD: that.data.bc_select,
        bcA: that.data.bc_default,
        bcB: that.data.bc_default,
        bcC: that.data.bc_default,
        bcE: that.data.bc_default,
      });
    }
    else if (select == 'E') {
      this.setData({
        bcE: that.data.bc_select,
        bcA: that.data.bc_default,
        bcB: that.data.bc_default,
        bcC: that.data.bc_default,
        bcD: that.data.bc_default,
      });
    }
  },
  nextQuestion: function () {
    var that = this;
    if (that.data.index < that.data.items.length - 1) {
      this.setData({ index: that.data.index + 1 });
      that.setQuestion();
    }
  },
  lastQuestion: function () {
    var that = this;
    if (that.data.index > 0) {
      this.setData({ index: that.data.index - 1 });
      that.setQuestion();
    }
  },
  submit: function () {
    var that = this;
    app.globalData.answers = that.data.answers;
    app.globalData.time = new Date().getTime() - that.data.beginTime;
    wx.redirectTo({ url: '../result/result' })
  },
  bindPickerChange: function (e) {
    this.setData({ index: parseInt(e.detail.value) })
    var that = this;
    that.setQuestion();
  },
  changeStar: function () {
    var that = this;
    var starMsg = app.globalData.starMsg;
    var on = that.data.order[that.data.index];
    if (starMsg[on] == 0) {
      this.setData({ star: '★' });
      starMsg[on] = 1;
      if (!that.data.isFall) {
        fallible.add(app.globalData.selectLib, app.globalData.selectSub, on);
      }
      else {
        var position = that.data.starPosition[on];
        fallible.add(position[0], position[1], position[2]);
      }

    }
    else {
      this.setData({ star: '☆' });
      starMsg[on] = 0;
      if (!that.data.isFall) {
        fallible.cut(app.globalData.selectLib, app.globalData.selectSub, on);
      }
      else {
        var position = that.data.starPosition[on];
        fallible.cut(position[0], position[1], position[2]);
      }
    }
  },
  onLoad: function () {
    var windowHeight = app.globalData.windowHeight - 58;
    var titleHeight = Math.round(windowHeight * 0.3);
    var opsHeight = windowHeight - titleHeight;
    var len = app.globalData.items.length;
    var answers = new Array(len);
    answers.fill('');
    var pickerMsg = new Array(len);
    for (var i = 0; i < len; i++) {
      pickerMsg[i] = app.globalData.items[i][1].substring(0, 22);
    }
    this.setData({
      titleHeight: titleHeight,
      opsHeight: opsHeight,
      items: app.globalData.items,
      order: app.globalData.order,
      tishu: len,
      answers: answers,
      beginTime: new Date().getTime(),
      pickerMsg: pickerMsg,
      isFall: app.globalData.isFall,
      starPosition: app.globalData.starPosition
    });
    var that = this;
    this.setQuestion();
  }
})