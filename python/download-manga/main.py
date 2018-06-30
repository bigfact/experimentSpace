# -*- coding: UTF-8 -*-

# 
# 下载从某一话开始指定话数漫画
# 可从 598 话开始下载，之前的没有资源
# @example
# # python3 main.py 开始话 需要往后下载多少话
# python3 main.py 598 10
#

import requests
import json
import urllib.request
from urllib.request import quote
import os
import sys

# 开始话
startNumber = str(100)

# 最大下载次数
max = 3

# 获取命令行参数 开始话
try:
    startNumber = sys.argv[1]
except IndexError as err:
    print('默认从 ' + startNumber + ' 话开始下载')
finally:

    # 获取命令行参数 最大下载次数
    try:
        max = int(sys.argv[2])
    except IndexError as err:
        print('默认下载 ' + str(max) + ' 话')
    finally:

        # 包含整个漫画信息的接口
        allInOneUrl = 'http://api.ishuhui.com/cartoon/book_ish/ver/07218148/id/1.json'

        # 解析获取数据
        print('get all datas from ' + allInOneUrl + '\n')
        allInOneRes = requests.get(allInOneUrl)
        allInOneData = json.loads(allInOneRes.text, encoding="utf-8")
        allInOneDataPosts = allInOneData['data']['cartoon']['0']['posts']

        # 每一话对应的接口 id ，例如： 8659 对应第 860 话， 10174 对应第 886 话， 10210 对应第 887 话
        id = str(1)

        # 查找开始话所对应的 id
        for i in allInOneDataPosts:
            if i == ('n-' + startNumber):
                id = str(allInOneDataPosts[i][0]['id'])
                break

        print('download from number ' + startNumber + ' id ' + id + '\n')

        # 接口前部分
        urlPrev = 'http://hhzapi.ishuhui.com/cartoon/post/ver/76906890/id/'

        # 接口后部分
        urlNext = '.json'

        # 图片域名
        imgDomain = 'http://hhzapi.ishuhui.com'

        # 文件夹名字前面部分
        dirNamePrev = "./downloans/"

        # 向后（使用 next 字段）开始下载
        for i in range(0, max):
            # 拼接完整的接口地址
            url = urlPrev + id + urlNext

            # 请求并解析接口数据
            print('get id ' + id + ' datas from ' + url)
            res = requests.get(url)
            data = json.loads(res.text, encoding="utf-8")
            
            # 判断该接口数据是否是《海贼王》的，如果不是，则字段上一话 prev 和下一话 next 所关联的话也不是《海贼王》，因此退出搜索
            if(data['data']['book_text'] != "海賊王"):
                break
            
            # 解析图片信息数据
            try:
                imgs = json.loads(data['data']['content_img'], encoding="utf-8")
            except TypeError as err:
                print(str(data['data']['number']) + ' ' + data['data']['title'] + ' - 没有下载资源，自动跳过')
            else:
                # 创建文件夹
                dirName = dirNamePrev + str(data['data']['number']) + ' - ' + data['data']['title']
                print('make dir ' + dirName)
                if not os.path.exists(dirName):
                    os.makedirs(dirName)

                # 开始下载
                for name in imgs:
                    imgurl = imgDomain + quote(imgs[name])
                    filename = dirName + '/' + name
                    if not os.path.isfile(filename):
                        print('download img ' + filename + ' ' + imgurl)
                        f = urllib.request.urlopen(imgurl)
                        with open(filename, "wb") as code:
                            code.write(f.read())
                    else:
                        print(filename + ' is already downloaded')
                
            # 判断下一话 id 的值
            if (('id' in data['data']['next']) == False):
                break
            
            # 下一话
            id = str(data['data']['next']['id'])
            print('\n')
