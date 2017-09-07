

//寻找下一题,返回值[是否存在，开始位置，长度]
function findAllQuestion(s, tp) {
  var all = [];
  s = "\n" + s;//在字符串头加上换行符
  var re = null;
  if (tp == 0) re = /\n.*?[（(][　 ]*[A-D][　 ]*[)）].*?[　 \n;\t]+A(?![　 ]*[)）])/g;
  else if (tp == 1) re = /\n.*?[（(][　 A-F]+[)）].*?[　 \n;\t]+A(?![　 ]*[)）])/g;
  //re.compile();
  var arr = re.exec(s);
  if (arr != null) var start = re.lastIndex - arr[0].length; //得到开始位置
  while (arr != null) {
    arr = re.exec(s);//寻找下一个
    if (arr != null) {
      var next = re.lastIndex - arr[0].length;//得到下一题开始的位置
      all.push(s.slice(start, next));
      start = next;
    }
    else {
      all.push(s.slice(start));
    }
  }
  return all
}

//格式化选择题选项
function formatOption(li) {
  var line = li;
  var re = /^[　 \n;\t]*([A-E])/g;
  var arr = re.exec(line);
  if (arr != null) {
    var op = arr[1];
    line = line.replace(/^[　 \n;\t]*[A-F][　 、.．。;]*/g, ".");
    line = op + line;
    line = line.replace(/\n/g, "");
    line = line.replace(/[　 ;\t]+$/g, "");
  }
  return line;
}

//格式化单选的题目
function getSingleTitle(li) {
  var title = [];
  var line = li;
  var re = /[(（][　 ]*([A-D])[　 ]*[[）)]/g;
  var arr = re.exec(line);
  if (arr != null) {
    title[0] = arr[1];//得到答案
    line = line.replace(re, "___");
    line = line.replace("\n", "");
    line = line.replace(/^[　 ;\t]+|[　 ;\t]+$/g, "");
    //格式化序号
    var re = /^(\d+)[[、.．　 ;\t]+/g;
    var arr = re.exec(line);
    if (arr != null) {
      line = arr[1] + line.replace(re, "．");
    }

    title[1] = line;//得到题目
  }
  return title;
}

//格式化多选的题目
function getMultipleTitle(li) {
  var title = [];
  var line = li;
  var re = /[(（]([　 A-F]+)[[）)]/g;
  var arr = re.exec(line);
  if (arr != null) {
    title[0] = arr[1].replace(/[　 ]/g, "");
    line = line.replace(re, "___");
    line = line.replace("\n", "");
    line = line.replace(/^[　 ;\t]+|[　 ;\t]+$/g, "");
    //格式化序号
    var re = /^(\d+)[[、.．　 ;\t]+/g;
    var arr = re.exec(line);
    if (arr != null) {
      line = arr[1] + line.replace(re, "．");
    }
    title[1] = line;//得到题目
  }
  return title;
}


//得到一个单选题
function getASingle(s) {
  s = s + "\n";
  var ti = [];
  var re = /(.*[（(][　 ]*[A-D][　 ]*[)）].*?)[　 \n;\t]+(A.*?)[　 \n;\t]+(B.*?)[　 \n;\t]+(C.*?)[　 \n;\t]+(D.*?)[　 \n;\t]+(E.*?)\n/g;
  var arr = re.exec(s);
  if (arr != null) {//尝试匹配五个选项
    var title = getSingleTitle(arr[1]);
    ti.push(title[0]);
    ti.push(title[1]);
    ti.push(formatOption(arr[2]));
    ti.push(formatOption(arr[3]));
    ti.push(formatOption(arr[4]));
    ti.push(formatOption(arr[5]));
    ti.push(formatOption(arr[6]));
  }
  else {
    var re = /(.*[（(][　 ]*[A-D][　 ]*[)）].*?)[　 \n;\t]+(A.*?)[　 \n;\t]+(B.*?)[　 \n;\t]+(C.*?)[　 \n;\t]+(D.*?)\n/g;
    var arr = re.exec(s);
    if (arr != null) {
      var title = getSingleTitle(arr[1]);
      ti.push(title[0]);
      ti.push(title[1]);
      ti.push(formatOption(arr[2]));
      ti.push(formatOption(arr[3]));
      ti.push(formatOption(arr[4]));
      ti.push(formatOption(arr[5]));
    }
    else {//尝试匹配三个选项
      var re = /(.*[（(][　 ]*[A-C][　 ]*[)）].*?)[　 \n;\t]+(A.*?)[　 \n;\t]+(B.*?)[　 \n;\t]+(C.*?)\n/g;
      var arr = re.exec(s);
      if (arr != null) {
        var title = getSingleTitle(arr[1]);
        ti.push(title[0]);
        ti.push(title[1]);
        ti.push(formatOption(arr[2]));
        ti.push(formatOption(arr[3]));
        ti.push(formatOption(arr[4]));
      }
      else return null;
    }
    
  }
  return ti;
}

//得到一个多选题
function getAMultiple(s) {
  s = s + "\n";
  var ti = [];
  //尝试匹配六个选项的多选题
  var re = /(.*[（(][　 A-F]+[)）].*?)[　 \n;\t]+(A.*?)[　 \n;\t]+(B.*?)[　 \n;\t]+(C.*?)[　 \n;\t]+(D.*?)[　 \n;\t]+(E.*?)[　 \n;\t]+(F.*?)\n/g;
  var arr = re.exec(s);
  if (arr != null) {
    var title = getMultipleTitle(arr[1]);
    ti.push(title[0]);
    ti.push(title[1]);
    ti.push(formatOption(arr[2]));
    ti.push(formatOption(arr[3]));
    ti.push(formatOption(arr[4]));
    ti.push(formatOption(arr[5]));
    ti.push(formatOption(arr[6]));
    ti.push(formatOption(arr[7]));
  }
  else {
    //尝试匹配五个选项的多选题
    var re = /(.*[（(][　 A-E]+[)）].*?)[　 \n;\t]+(A.*?)[　 \n;\t]+(B.*?)[　 \n;\t]+(C.*?)[　 \n;\t]+(D.*?)[　 \n;\t]+(E.*?)\n/g;
    var arr = re.exec(s);
    if (arr != null) {
      var title = getMultipleTitle(arr[1]);
      ti.push(title[0]);
      ti.push(title[1]);
      ti.push(formatOption(arr[2]));
      ti.push(formatOption(arr[3]));
      ti.push(formatOption(arr[4]));
      ti.push(formatOption(arr[5]));
      ti.push(formatOption(arr[6]));
    } else {
      //尝试匹配四个选项的多选题
      var re = /(.*[（(][　 A-D]+[)）].*?)[　 \n;\t]+(A.*?)[　 \n;\t]+(B.*?)[　 \n;\t]+(C.*?)[　 \n;\t]+(D.*?)\n/g;
      var arr = re.exec(s);
      if (arr != null) {
        var title = getMultipleTitle(arr[1]);
        ti.push(title[0]);
        ti.push(title[1]);
        ti.push(formatOption(arr[2]));
        ti.push(formatOption(arr[3]));
        ti.push(formatOption(arr[4]));
        ti.push(formatOption(arr[5]));
      }
      else return null;
    }
  }
  return ti;
}

//格式化判断题
function formAllJudge(s) {
  var items = [];
  s = "\n" + s;//在字符串头加上换行符
  var re = /\n(.*?)[（(][　 ]*([对错√×是非✔✘否])[　 ]*[)）]/g;
  var arr = re.exec(s);
  while (arr != null) {
    var ti = arr[1];
    var daan = arr[2];

    //去掉头尾空格
    ti = ti.replace(/^[　 ;\t]+|[　 ;\t。]+$/g, "");
    //格式化题目序号
    var re1 = /^(\d+)[[、.．　 ;\t]+/g;
    var arr1 = re1.exec(ti);
    if (arr1 != null) {
      ti = arr1[1] + ti.replace(re1, ".");
    }
    //格式化答案
    var right = "对√是✔";
    if (right.indexOf(daan) >= 0) {
      daan = "T";
    }
    else {
      daan = "F";
    }
    var item = [];
    item.push(daan);
    item.push(ti);
    items.push(item);
    arr = re.exec(s);//寻找下一个
  }
  return items
}



function form(s, tp) {
  var items = [];

  if (tp == 0) {//如果是单选类型
    var all = findAllQuestion(s, tp);
    for (var i = 0; i < all.length; i++) {
      var ti = getASingle(all[i]);
      if (ti != null) items.push(ti);
    }
  }
  else if (tp == 1) {//如果是多选类型
    var all = findAllQuestion(s, tp);
    for (var i = 0; i < all.length; i++) {
      var ti = getAMultiple(all[i]);
      if (ti != null) {
        items.push(ti);
      }
    }
  }
  else if (tp == 2) {
    items = formAllJudge(s);
  }

  var app = getApp();
  if (items.length > 0) {
    app.globalData.form_len = items.length;
    app.globalData.form = { "type": tp, "items": items };
  }
  else {
    app.globalData.form = null
  }

  var str = "";
  for (var i = 0; i < items.length; i++) {
    for (var j = 0; j < items[i].length; j++) {
      str = str + items[i][j] + "\n";
    }
    str = str + "\n";
  }
  return str;
}

module.exports = {
  form
}
