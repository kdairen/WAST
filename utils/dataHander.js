var app = getApp()

//保存题库
function saveData() {
  wx.setStorage({
    key: 'libs',
    data: app.globalData.libs,
  })
  wx.setStorage({
    key: 'name_order',
    data: app.globalData.name_order,
  })
  wx.setStorage({
    key: 'fallible',
    data: app.globalData.fallible,
  });
}

//得到Lib名称排序
function getLibsName() {
  var name_order = app.globalData.name_order;
  var libsName = [];
  for (var i = 0; i < name_order.length; i++) {
    libsName.push(name_order[i][0]);
  }
  return libsName
}

//得到指定Lib下的题库名
function getSubsName() {
  var libName = app.globalData.selectLib;
  var name_order = app.globalData.name_order;
  var subsName = [];
  for (var i = 0; i < name_order.length; i++) {
    if (name_order[i][0] == libName) {
      subsName = name_order[i].slice(1);
      break;
    }
  }
  return subsName
}

//增加一个新的Lib，如果成功返回true,已存在返回false
function addLib(libName) {
  var libs = app.globalData.libs;
  var name_order = app.globalData.name_order;
  if (name_order.length >= 100) return -1;//对科目数量做限制
  if (libs[libName] == null) {
    app.globalData.libs[libName] = {};
    name_order[name_order.length] = [libName];
    app.globalData.fallible[libName] = {};
    saveData();
    return 1
  }
  else {
    return 0
  }
}

//增加一个Sub
function addSub(subName) {
  var libName = app.globalData.selectLib;
  var lib = app.globalData.libs[libName];
  var name_order = app.globalData.name_order;
  if (lib[subName] == null) {
    for (var i = 0; i < name_order.length; i++) {
      if (name_order[i][0] == libName){
        var libItem = name_order[i];
        if (libItem.length > 100) return -1;//对题库数量做限制
        name_order[i].push(subName);
        break
      }
    }
    var sub = app.globalData.form;
    lib[subName] = sub;
    var len = sub['items'].length;
    var a = new Array(len);
    a.fill(0);
    app.globalData.fallible[libName][subName] = a;
    saveData();
    return 1;
  }
  else {
    return 0;
  }
}

//删除一个Lib
function removeLib(libName) {
  var name_order = app.globalData.name_order;
  for (var i = 0; i < name_order.length; i++) {
    if (name_order[i][0] == libName) {
      delete app.globalData.libs[libName];
      name_order.splice(i, 1);
      delete app.globalData.fallible[libName];
      break;
    }
  }
  saveData();
  return true;
}

//删除一个Sub
function removeSub(subName) {
  var libName = app.globalData.selectLib;
  var lib = app.globalData.libs[libName];
  var name_order = app.globalData.name_order;
  for (var i = 0; i < name_order.length; i++) {
    if (name_order[i][0] == libName) {
      var libItem = name_order[i];
      for (var j = 1; j < libItem.length; j++) {
        if (libItem[j] == subName){
          delete lib[subName];
          libItem.splice(j, 1);
          delete app.globalData.fallible[libName][subName];
          break;
        }
      }
    }
  }
  saveData();
  return true;
}

//移动Lib,direction; 0,上移,1,下移
function moveLib(libName, direction) {
  var name_order = app.globalData.name_order;
  for (var i = 0; i < name_order.length; i++) {
    if (name_order[i][0] == libName) {
      var libItem = name_order[i];
      if (direction == 0 && i > 0) {
        name_order[i] = name_order[i - 1];
        name_order[i - 1] = libItem;
        wx.setStorage({
          key: 'name_order',
          data: app.globalData.name_order,
        })
        return true;
      }
      else if (direction == 1 && i < name_order.length - 1) {
        name_order[i] = name_order[i + 1];
        name_order[i + 1] = libItem;
        wx.setStorage({
          key: 'name_order',
          data: app.globalData.name_order,
        })
        return true;
      }
    }
  }
  return false;
}

//移动Sub
function moveSub(subName, direction) {
  var libName = app.globalData.selectLib;
  var name_order = app.globalData.name_order;
  for (var i = 0; i < name_order.length; i++) {
    if (name_order[i][0] == libName) {
      var libItem = name_order[i];
      for (var j = 1; j < libItem.length; j++) {
        if (libItem[j] == subName) {
          var item = libItem[j];
          if (direction == 0 && j > 1) {
            libItem[j] = libItem[j - 1];
            libItem[j - 1] = item;
            wx.setStorage({
              key: 'name_order',
              data: app.globalData.name_order,
            })
            return true;
          }
          else if (direction == 1 && j < libItem.length - 1) {
            libItem[j] = libItem[j + 1];
            libItem[j + 1] = item;
            wx.setStorage({
              key: 'name_order',
              data: app.globalData.name_order,
            })
            return true;
          }
        }
      }
    }
  }
  return false;
}

//重命名科目
function alterLib(libName,newName){
  var libs = app.globalData.libs;
  if (libs[newName] != null) return 0;
  var lib = libs[libName];
  var name_order = app.globalData.name_order;
  for (var i = 0; i < name_order.length; i++){
    if (name_order[i][0] == libName) {
      libs[newName] = lib;
      delete libs[libName];
      name_order[i][0] = newName;
      app.globalData.fallible[newName] = app.globalData.fallible[libName];
      delete app.globalData.fallible[libName];
      break;
    }
  }
  saveData();
  return 1;
}


//重名名题库
function alterSub(subName, newName) {
  var libName = app.globalData.selectLib;
  var lib = app.globalData.libs[libName];
  if (lib[newName] != null) return 0;//如果存在
  var sub = lib[subName];
  var name_order = app.globalData.name_order;
  for (var i = 0; i < name_order.length; i++) {
    if (name_order[i][0] == libName) {
      var libItem = name_order[i];
      for (var j = 1; j < libItem.length; j++) {
        if (libItem[j] == subName) {
          lib[newName] = sub;
          delete lib[subName];
          libItem[j] = newName;
          app.globalData.fallible[libName][newName] = app.globalData.fallible[libName][subName];
          delete app.globalData.fallible[libName][subName];
          break;
        }
      }
    }
  }
  saveData();
  return 1;
  
}


//乱序
function outOfOrder(items) {
  var newitems = items.slice(0);
  var len = items.length;
  //将列表随机打乱3*len次
  for (var i = 0; i < 3 * len; i++) {
    //得到随机数
    var rnd = parseInt(Math.random() * len, 10);
    //交换选项
    var item = newitems[0];
    newitems[0] = newitems[rnd];
    newitems[rnd] = item;
  }
  return newitems;
}

module.exports = {
  getLibsName,
  getSubsName,
  addLib,
  addSub,
  removeLib,
  removeSub,
  moveLib,
  moveSub,
  alterLib,
  alterSub,
  outOfOrder
}
