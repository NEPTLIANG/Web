#!/bin/python
# coding=utf-8
import serial
import re
from urllib import request
import time
#import urllib

device = "car1"

# import urllib.request
# DATA = b'some data'
# req = urllib.request.Request(url='http://localhost:8080', data=DATA,method='PUT')
# with urllib.request.urlopen(req) as f:
#     pass
# print(f.status)
# print(f.reason)

# lng = 100.451451
# lat = 30.1451451541515
# curl -X "PUT" http://122.51.3.35/device.php -d "id=car1&lng=1&lat=1"
# url = "http://122.51.3.35/test.php?device=" + device + "&lng=" + str(lng) + "&lat=" + str(lat)


def submitLocation(res):
    url = "http://122.51.3.35/device.php"
    resList = res.split(",")
    latdu = int(float(resList[1]) / 100)
    latfen = int(float(resList[1]) % 100)
    latmiao = int(float(resList[1]) % 1)
    lat = str(float(latdu) + float(latdu)/60 + float(latmiao)/3600)
    lngdu = int(float(resList[3]) / 100)
    lngfen = int(float(resList[3]) % 100)
    lngmiao = int(float(resList[3]) % 1)
    lng = str(float(lngdu) + float(lngdu)/60 + float(lngmiao)/3600)
    # lat = str(float(resList[1]) / 100)
    # lng = str(float(resList[3]) / 100)
    data = "id=" + device + "&lat=" + lat + "&lng=" + lng
    req = request.Request(url=url, data=data.encode(), method="PUT")
    try:
        f = request.urlopen(req)
        if f.status == 200:
            print(f.read().decode("utf-8"))
        else:
            print("请求失败：" + f.reason)
    except:
        print("网络错误")
#f = urllib.urlopen("http://122.51.3.35/test.php")
# print("%d %s" % (f.status, f.reason))
# for key, value in f.getheaders():
#     print("%s: %s" % (key, value))
# print("\n")


# ser=serial.Serial("/dev/ttyAMA0",9600,timeout=0.5) #使用树莓派的GPIO口连接串行口
ser = serial.Serial("/dev/ttyS0", 9600, timeout=0.5)  # Linux系统使用com1口连接串行口
ser.close()  # 关闭端口
print(ser.name)  # 打印设备名称
print(ser.port)  # 打印设备名
ser.open()  # 打开端口
# s = ser.read(10)#从端口读10个字节
# ser.write(“hello”)#向端口些数据
times = 0
while(True):
    res = ser.readline().decode('utf-8')  # 是读一行，以/n结束，要是没有/n就一直读，阻塞。
    if re.match("^\$GPGLL", res):
        print(res)
        if times >= 5:
            strs = res.split(",")
            lng = float(strs[3]) / 100  # 经度
            lat = float(strs[1]) / 100  # 纬度
            if (lng >= 0 and lng <= 180) and (lat >= 0 and lat <= 90):
                submitLocation(res)
            else:
                print("无法获取经纬度")
            times = 0
        else:
            times += 1
# data = ser.readlines()和ser.xreadlines()#都需要设置超时时间
# ser.baudrate = 9600 #设置波特率
# print(ser.isOpen()) #看看这个串口是否已经被打开
ser.close()  # 关闭端口
