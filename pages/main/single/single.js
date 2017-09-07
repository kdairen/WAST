// pages/main/single/single.js
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
    item: [],
    order: [],
    bc_default: '#FBFBFB',
    bc_right: '#98FB98',
    bc_wrong: '#FF99B4',
    bcA: '',
    bcB: '',
    bcC: '',
    bcD: '',
    bcE: '',
    pickerMsg: [],
    star: '☆',
    isFall: null,
    starPosition: []
  },
  setQuestion: function () {
    var that = this;
    var on = that.data.order[that.data.index];
    this.setData({
      item: that.data.items[on],
      bcA: that.data.bc_default,
      bcB: that.data.bc_default,
      bcC: that.data.bc_default,
      bcD: that.data.bc_default,
      bcE: that.data.bc_default,
    })
    if (app.globalData.starMsg[on] == 0) {
      this.setData({ star: '☆' });
    } else {
      this.setData({ star: '★' });
    }
  },
  btnOpClick: function (e) {
    var that = this;
    var select = e.currentTarget.id;
    if (select == that.data.item[0]) {
      if (that.data.index == that.data.tishu - 1) {
        if (select == 'A') {
          this.setData({ bcA: that.data.bc_right });
        }
        else if (select == 'B') {
          this.setData({ bcB: that.data.bc_right });
        }
        else if (select == 'C') {
          this.setData({ bcC: that.data.bc_right });
        }
        else if (select == 'D') {
          this.setData({ bcD: that.data.bc_right });
        }
        else if (select == 'E') {
          this.setData({ bcE: that.data.bc_right });
        }
      }
      that.nextQuestion();
    }
    else {
      if (select == 'A') {
        this.setData({ bcA: that.data.bc_wrong });
      }
      else if (select == 'B') {
        this.setData({ bcB: that.data.bc_wrong });
      }
      else if (select == 'C') {
        this.setData({ bcC: that.data.bc_wrong });
      }
      else if (select == 'D') {
        this.setData({ bcD: that.data.bc_wrong });
      }
      else if (select == 'E') {
        this.setData({ bcE: that.data.bc_wrong });
      }
    }
  },
  nextQuestion: function () {
    var that = this;
    if (that.data.index < that.data.tishu - 1) {
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
  showRight: function () {
    var that = this;
    if (that.data.item[0] == 'A') {
      this.setData({ bcA: that.data.bc_right });
    }
    else if (that.data.item[0] == 'B') {
      this.setData({ bcB: that.data.bc_right });
    }
    else if (that.data.item[0] == 'C') {
      this.setData({ bcC: that.data.bc_right });
    }
    else if (that.data.item[0] == 'D') {
      this.setData({ bcD: that.data.bc_right });
    }
    else if (that.data.item[0] == 'E') {
      this.setData({ bcE: that.data.bc_right });
    }
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
      pickerMsg: pickerMsg,
      isFall: app.globalData.isFall,
      starPosition: app.globalData.starPosition
    });
    var that = this;
    this.setQuestion();
  }
})