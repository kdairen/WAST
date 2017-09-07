var app = getApp();

function saveData() {
  wx.setStorage({
    key: 'fallible',
    data: app.globalData.fallible
  })
}

//增加,科目，题库，第几个
function add(libName,subName,itemOrder){
  app.globalData.fallible[libName][subName][itemOrder] = 1;
  saveData();
}

//删除
function cut(libName, subName, itemOrder){
  app.globalData.fallible[libName][subName][itemOrder] = 0;
  saveData();
}

//读取本科目的易错题数据
function setFallibleData(libName , tp){
  var items = [];
  var starPosition = [];
  var libMsg = app.globalData.fallible[libName];
  var lib = app.globalData.libs[libName];
  for (var key in lib){
    var sub = lib[key];
    if (sub['type'] == tp){
      var subItems = sub['items'];
      var subMsg = libMsg[key];
      for(var i = 0; i <subMsg.length ; i++){
        if(subMsg[i] == 1){
          items.push(subItems[i]);
          starPosition.push([libName, key , i])
        }
      }
    }
  }
  var starMsg = new Array(items.length);
  starMsg.fill(1);
  app.globalData.starMsg = starMsg;
  app.globalData.items = items;
  app.globalData.starPosition = starPosition;
}

module.exports = {
  add,
  cut,
  setFallibleData
}
