/**
 * 转换curl字符串为node request代码
 */

var curlconverter = require('curlconverter');

var fs = require('fs');

var curlFilePath = './curl.txt';

var curlFileData = fs.readFileSync(curlFilePath).toString();

var curlCovertResult = curlconverter.toNode(curlFileData);

var tmpPath = './.tmp/'
if (!fs.existsSync(tmpPath)) {
  fs.mkdir(tmpPath);
}

var curlCovertResultFilePath = tmpPath + 'curl_covert_result_' + Date.now() + '.js';

fs.writeFile(curlCovertResultFilePath, curlCovertResult);
