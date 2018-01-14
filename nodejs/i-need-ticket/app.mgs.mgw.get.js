var request = require('request');
var fs = require('fs');
var get_ticketResult = require('./utils/get_ticketResult');
var get_yp_info_cover = require('./utils/get_yp_info_cover');
var getRandom = require('../utils/getRandom');
var notice = require('./utils/notice');

var headers = {
  Host: 'mobile.12306.cn',
  nbappid: '',
  uuid: '',
  WorkspaceId: 'product',
  'Keep-Alive': 'timeout=180, max=100',
  AppId: '',
  tk: '',
  Accept: '*/*',
  nbversion: '1.1.7.6',
  'Accept-Language': 'zh-cn',
  Platform: '',
  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  UniformGateway: 'https://mobile.12306.cn/otsmobile/app/mds/mgw.htm',
  did: '',
  'User-Agent': 'MTPotal/3 CFNetwork/893.14.2 Darwin/17.3.0',
  Cookie: ''
};

var requestData = [
  {
    train_date: '20180210',
    purpose_codes: '00',
    from_station: 'SHH',
    to_station: 'GIW',
    station_train_code: '',
    start_time_begin: '0000',
    start_time_end: '2400',
    train_headers: 'QB#',
    train_flag: '',
    seat_type: '',
    seatBack_Type: '',
    ticket_num: '',
    dfpStr: '',
    baseDTO: {
      time_str: '',
      os_type: 'i',
      mobile_no: '',
      device_no: '',
      user_name: '',
      check_code: '',
      version_no: '3.0.2'
    }
  }
];

var options = {
  url: 'https://mobile.12306.cn/otsmobile/app/mgs/mgw.htm',
  headers: headers,
  qs: {
    operationType: 'com.cars.otsmobile.queryLeftTicketZ',
    requestData: JSON.stringify(requestData),
    ts: '',
    sign: ''
  }
};

// 数据缓存目录
var tmpPath = './.tmp/';
var jsonsPath = tmpPath + 'app.mgs.mgw.get/';
if (!fs.existsSync(jsonsPath)) {
  if (!fs.existsSync(tmpPath)) {
    fs.mkdir(tmpPath);
  }
  fs.mkdir(jsonsPath);
}

// 请求回调
function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    // // 输出响应数据到缓存文件
    // fs.writeFile(jsonsPath + (new Date()).toLocaleString() + '.json', JSON.stringify(JSON.parse(body), null, '  '));
    // 解析车票信息
    var ticketResult = get_ticketResult(JSON.parse(body));
    ticketResult.forEach(function(item) {
      var yp_info_cover = get_yp_info_cover(item.yp_ex, item.yp_info_cover);
      if (yp_info_cover) {
        console.log(
          '%s %s-%s from %s to %s %s %s',
          item.start_train_date,
          item.start_time,
          item.arrive_time,
          item.from_station_name,
          item.to_station_name,
          item.station_train_code,
          JSON.stringify(yp_info_cover)
        );
        // 有 edz
        if (yp_info_cover.edz > 0) {
          notice(
            '有票啦！',
            item.start_train_date +
              ' ' +
              item.start_time +
              '-' +
              item.arrive_time +
              ' from ' +
              item.from_station_name +
              ' to ' +
              item.to_station_name +
              ' ' +
              item.station_train_code,
            '余票 ' + JSON.stringify(yp_info_cover)
          );
        }
      }
    });
  }
  console.log('request end');
}

// 每隔一段时间请求一次
var times = 0;
var num = 0;
var requestNum = 0;
setInterval(function() {
  if (times <= num) {
    console.log('request #%s start', requestNum++);
    // 请求
    request(options, callback);
    // 重置时间
    times = getRandom(3, 8);
    num = 0;
  }
  num++;
}, 1000);
