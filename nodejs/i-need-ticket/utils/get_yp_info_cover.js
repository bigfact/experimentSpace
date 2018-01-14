/**
 * 获取车票信息
 */
module.exports = function(yp_ex, yp_info_cover) {
  yp_info_cover = yp_info_cover || '';
  yp_info_cover = yp_info_cover.replace(/\s/g, '');
  var returnData = null;
  // G
  if (yp_ex == 'O0M090' || yp_ex == 'O090M0') {
    returnData = {};
    var relations = {
      9: 'swz',
      M: 'ydz',
      O: 'edz'
    };
    for (var i = 0; i < yp_info_cover.length; i += 6 + 4) {
      var relationKey = yp_info_cover.substr(i, 1);
      var returnDataKey = relations[relationKey];
      var returnDataValue = yp_info_cover.substr(i + 6, 4);
      returnData[returnDataKey] = parseInt(returnDataValue);
    }
  }
  // K - todo::
  return returnData;
};

// // test
// console.log(module.exports('O0M090', 'O0734500219230900002M123150000'));
