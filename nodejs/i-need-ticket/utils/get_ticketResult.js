/**
 * 获取ticketResult
 */
module.exports = function (resbody) {
  resbody = resbody || {};
  if (resbody.resultStatus == 1000 && resbody.result) {
    return resbody.result.ticketResult || [];
  }
  return [];
}

// // test
// console.log(module.exports({
//   "resultStatus": 1000,
//   "result": {
//     "error_msg": "",
//     "fallbackOperationType": "",
//     "succ_flag": "1",
//     "ticketResult": [1]
//   }
// }));
