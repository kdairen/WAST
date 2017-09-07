// pages/main/multiple/multiple.js
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
    bcF: '',
    answer: '',
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
      bcF: that.data.bc_default,
      answer: '',
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
    if (that.data.answer.indexOf(select) < 0) {
      this.setData({ answer: that.data.answer + select });//更新用户答案

      if (this.data.item[0].indexOf(select) >= 0) {//如果是正确答案

        if (this.data.index < that.data.tishu - 1) {//如果不是最后一题
          //如果正确选项没有全部回答完
          if (!this.isRight(that.data.item[0], that.data.answer)) {
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
            else if (select == 'F') {
              this.setData({ bcF: that.data.bc_right });
            }
          }
          else {//否则，下一题
            that.nextQuestion();
          }
        } else {//如果是最后一题
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
          else if (select == 'F') {
            this.setData({ bcF: that.data.bc_right });
          }
        }
      }
      else {//如果是错误答案
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
        else if (select == 'F') {
          this.setData({ bcF: that.data.bc_wrong });
        }
      }
    }
  },
  nextQuestion: function () {
    var that = this;
    if (that.data.index < that.data.tishu - 1) {
      this.setData({ index: that.data.index + 1 });
      this.setQuestion();
    }
  },
  lastQuestion: function () {
    var that = this;
    if (that.data.index > 0) {
      this.setData({ index: that.data.index - 1 });
      this.setQuestion();
    }
  },
  //显示正确答案
  showRight: function () {
    var that = this;
    if (that.data.item[0].indexOf('A') >= 0) {
      this.setData({ bcA: that.data.bc_right, });
    }
    if (that.data.item[0].indexOf('B') >= 0) {
      this.setData({ bcB: that.data.bc_right, });
    }
    if (that.data.item[0].indexOf('C') >= 0) {
      this.setData({ bcC: that.data.bc_right, });
    }
    if (that.data.item[0].indexOf('D') >= 0) {
      this.setData({ bcD: that.data.bc_right, });
    }
    if (that.data.item[0].indexOf('E') >= 0) {
      this.setData({ bcE: that.data.bc_right, });
    }
    if (that.data.item[0].indexOf('F') >= 0) {
      this.setData({ bcF: that.data.bc_right, });
    }
  },
  bindPickerChange: function (e) {
    this.setData({
      index: parseInt(e.detail.value)
    })
    var that = this;
    that.setQuestion();
  },
  //判断多选答案是否正确
  isRight(daan, answer) {
    if (answer.length >= daan.length) {
      for (var i = 0; i < daan.length; i++) {
        if (answer.indexOf(daan.charAt(i)) < 0) {
          return false;
        }
      }
      return true;
    }
    else return false;
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
    that.setQuestion();
  }
})