/**
 * 解析包含下载文件链接的 json 数据，下载文件保存到本地
 * @author bigfact
 * @date 2017.08.02
 */

const request = require('request');
const fs = require('fs');
const path = require('path');

// // 当前执行文件名
// console.log(__filename)
// // 当前执行文件目录
// console.log(__dirname)

// 包含下载文件链接的 json 数据文件的年份
const year = 2010

// 下载任务开始时间
const starttime = Date.now()

// 包含下载文件链接的 json 数据
const photo = require('./json/' + year + '.json').photoset.photo
// 需下载文件个数
const length = photo.length
// 已完成下载个数
var completeNum = 0

// 检查保存目录
const saveDir = path.resolve(__dirname, './' + year)
if (!fs.existsSync(saveDir)) {
  console.log('Create save dir: ' + saveDir)
  fs.mkdir(saveDir)
}

// 遍历下载文件链接 json 数据，获取下载链接，并下载文件
for (let i = 0; i < length; i++) {
  try {

    // 获取下载链接
    let url = photo[i].url_k_cdn;
    if (!url) {
      url = photo[i].url_l_cdn;
    }
    console.log('Download link ' + i + ': ' + url);

    // 获取文件名
    let filename = url.replace(/^.*\//, '');

    if (filename) {
      // 发起请求下载文件
      request.get(url)
        // 单个文件下载完成
        .on('complete', function (res) {
          console.log('Complete ' + ++completeNum + ': ' + res.request.uri.href);
          if (completeNum >= length) {
            console.log('Waste time: ' + (Date.now() - starttime) / 1000 + 's');
          }
        })
        // 下载文件保存
        .pipe(fs.createWriteStream(saveDir + '/' + filename));
    }

  } catch (err) {
    console.log(err);
  }
}
