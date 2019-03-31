/*
 *根据客户端的时间信息得到发表评论的时间格式
 *多少分钟前，多少小时前，然后是昨天，然后再是月日
 * Para :
 * recordTime - {float} 时间戳
 * yearsFlag -{bool} 是否要年份
 */
function getDiffTime(recordTime,yearsFlag) {
    if (recordTime) {
        recordTime=new Date(parseFloat(recordTime)*1000);
        var minute = 1000 * 60,
            hour = minute * 60,
            day = hour * 24,
            now=new Date(),
            diff = now -recordTime;
        var result = '';
        if (diff < 0) {
            return result;
        }
        var weekR = diff / (7 * day);
        var dayC = diff / day;
        var hourC = diff / hour;
        var minC = diff / minute;
        if (weekR >= 1) {
            var formate='MM-dd hh:mm';
            if(yearsFlag){
                formate='yyyy-MM-dd hh:mm';
            }
            return recordTime.format(formate);
        }
        else if (dayC == 1 ||(hourC <24 && recordTime.getDate()!=now.getDate())) {
            result = '昨天'+recordTime.format('hh:mm');
            return result;
        }
        else if (dayC > 1) {
            var formate='MM-dd hh:mm';
            if(yearsFlag){
                formate='yyyy-MM-dd hh:mm';
            }
            return recordTime.format(formate);
        }
        else if (hourC >= 1) {
            result = parseInt(hourC) + '小时前';
            return result;
        }
        else if (minC >= 1) {
            result = parseInt(minC) + '分钟前';
            return result;
        } else {
            result = '刚刚';
            return result;
        }
    }
    return '';
}

/*
 *拓展Date方法。得到格式化的日期形式
 *date.format('yyyy-MM-dd')，date.format('yyyy/MM/dd'),date.format('yyyy.MM.dd')
 *date.format('dd.MM.yy'), date.format('yyyy.dd.MM'), date.format('yyyy-MM-dd HH:mm')
 *使用方法 如下：
 *                       var date = new Date();
 *                       var todayFormat = date.format('yyyy-MM-dd'); //结果为2015-2-3
 *Parameters:
 *format - {string} 目标格式 类似('yyyy-MM-dd')
 *Returns - {string} 格式化后的日期 2015-2-3
 *
 */
(function initTimeFormat(){
    Date.prototype.format = function (format) {
        var o = {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(), //day
            "h+": this.getHours(), //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
            "S": this.getMilliseconds() //millisecond
        }
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length));
        return format;
    };
})()

function processServerMovies(data) {
  var movies = [];

  for (var idx in data.subjects) {
    var subject = data.subjects[idx];
    var title = subject.title;
    if (title.length >= 6) {
      title = title.substring(0, 6) + "...";
    }

    var temp = {
      stars: subject.rating.stars,
      title: title,
      score: subject.rating.average,
      coverageUrl: subject.images.large,
      movieId: subject.id
    }
    movies.push(temp)
  }
  return movies
}

function http(url, callback) {
  var app = getApp()
  wx.request({
    url: url,
    header: {
      appKey: app.appKey
    },
    success: (res) => {
      callback(res.data)
    }
  })
}

function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}


function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}


export {
  getDiffTime,
  http,
  processServerMovies,
  convertToCastInfos,
  convertToCastString
}