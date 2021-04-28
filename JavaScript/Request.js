/*
 * @Author: NeptLiang
 * @Date: 2020-11-25 13:50:49
 * @LastEditors: NeptLiang
 * @LastEditTime: 2020-12-29 13:48:36
 * @Description: Request
 */

// const { userInfo } = require("os")

var request = new XMLHttpRequest()
var method = "POST"
var url = "http://122.51.3.35/device.php"
var content = 'id=test&name=卧槽&route=name&intro='
//key=471ec411c1fac90a900a6ea32752e43c sid=134678 tid=250232772 trid=20
request.onreadystatechange = () => {
    if (request.readyState == 4) {
        // console.log(unescape(request.responseText.replace(/\\u/gi, "%u")))
        console.log(request.responseText)
    }
}
request.open(method, url, true)
request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
request.send(content)

// select ssl_type, ssl_cipher, x509_issuer, x509_subject, max_questions, max_updates, max_connections, max_user_connections, plugin, authentication_string, password_expired, password_last_changed, password_lifetime, account_locked, Create_role_priv, Drop_role_priv, Password_reuse_history, Password_reuse_time, Password_require_current, User_attributes from mysql.user;

var request = new XMLHttpRequest()
var url = "http://localhost:63342/RealTimeBusQuery/Backend/device.php?_ijt=2gkvtrd8c37pdb7up0vnt1kj9s"
//key=471ec411c1fac90a900a6ea32752e43c sid=134678 tid=250232772 trid=20
var content = 'name=car1&id=1&route=1&intro=test'
request.onreadystatechange = () => {
    if (request.readyState == 4) {
        console.log(request.responseText)
    }
}
request.open("PUT", url, true)
request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
request.send(content)


// $GPGLL,4430.94180,N,8607.14679,E,034444.00,A,D*6F
//        度 分  秒

//成绩
var request = new XMLHttpRequest()
var url = "http://jw.lingnan.edu.cn/cjcx/cjcx_cxDgXscj.html?doType=query&gnmkdm=N305005&su=2017324213"
var content = 'xnm=2019&xqm=3&_search=false&nd=1608706801286&queryModel.showCount=15&queryModel.currentPage=1&queryModel.sortName=&queryModel.sortOrder=asc&time=1'
request.onreadystatechange = () => {
    if (request.readyState == 4) {
        console.log(request.responseText)
    }
}
request.open("POST", url, true)
// request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
// Host: jw.lingnan.edu.cn
// Connection: keep-alive
// Content-Length: 147
// Origin: http://jw.lingnan.edu.cn
// Referer: http://jw.lingnan.edu.cn/cjcx/cjcx_cxDgXscj.html?gnmkdm=N305005&layout=default&su=2017324213
// Accept-Encoding: gzip, deflate
// Cookie: X-LB=1.e.6ec.5d125513; JSESSIONID=52F1F362E0950BDE26C23F0A36D8C9DD
// User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36
var headersStr = `Accept: application/json, text/javascript, */*; q=0.01
X-Requested-With: XMLHttpRequest
Content-Type: application/x-www-form-urlencoded;charset=UTF-8
Accept-Language: zh-CN,zh;q=0.9`
var headers = headersStr.split('\n').map(header => header.split(': '))
// console.log(headers)
headers.forEach(header => request.setRequestHeader(header[0], header[1]))
request.send(content)

//选课
var request = new XMLHttpRequest()
var url = "http://jw.lingnan.edu.cn/xsxk/zzxkyzb_cxZzxkYzbPartDisplay.html?gnmkdm=N253512&su=2017324213"
var content = "filter_list%5B0%5D=%E7%A7%91%E5%AD%A6&rwlx=2&xkly=0&bklx_id=0&xqh_id=1&jg_id=08&zyh_id=0832&zyfx_id=wfx&njdm_id=2017&bh_id=20173242&xbm=1&xslbdm=wlb&ccdm=w&xsbj=64&sfkknj=0&sfkkzy=0&sfznkx=0&zdkxms=0&sfkxq=0&sfkcfx=0&kkbk=0&kkbkdj=0&sfkgbcx=0&sfrxtgkcxd=0&tykczgxdcs=0&xkxnm=2020&xkxqm=12&kklxdm=10&rlkz=0&xkzgbj=0&kspage=1&jspage=10&jxbzb="
request.onreadystatechange = () => {
    if (request.readyState == 4) {
        console.log(request.responseText)
    }
}
request.open("POST", url, true)
var headersStr = `
Accept: application/json, text/javascript, */*; q=0.01
X-Requested-With: XMLHttpRequest
Content-Type: application/x-www-form-urlencoded;charset=UTF-8
Accept-Language: zh-CN,zh;q=0.9
`
var headers = headersStr.split('\n').map(header => header.split(': '))
// console.log(headers)
headers.forEach(header => header[0] && request.setRequestHeader(header[0], header[1]))
request.send(content)

// 第二课堂搜索
var request = new XMLHttpRequest()
var url = "http://39.104.103.243:8080/twDekt/api/v1/t/activity/activityList?appkey=x3f3d12db0&token=3b78cac7363a42ab2c06488e73fafb48&name=%E9%9D%92%E5%9B%A2&pageNo=0&pageSize=10"
request.onreadystatechange = () => {
    if (request.readyState == 4) {
        console.log(request.responseText)
    }
}
request.open("GET", url, true)
request.send()

// 第二课堂信息
var request = new XMLHttpRequest()
var url = "http://39.104.103.243:8080/twDekt/api/v1/users/userinfo?appkey=x3f3d12db0&token=3b78cac7363a42ab2c06488e73fafb48"
request.onreadystatechange = () => {
    if (request.readyState == 4) {
        console.log(request.responseText)
    }
}
request.open("GET", url, true)
request.send()

// 第二课堂登录
var request = new XMLHttpRequest()
var url = "https://entryhz.qiye.163.com/domain/domainEntLogin"
var content = "pubid=R8Olf&passtype=3&support_verify_code=1&domain=lingnan.edu.cn&account_name=2017324213&password=5a02df2436f454e32c953f2a80245bac74ee026f6c8b840d68432fe121cfe80caa3de69ac1fd80ddbcf97b6cd374a050ba82cd0d0dcdc6c852f90ff37d6653fbcbdcda76cb2e4b2e6efc44a474cbf451da5047587ca3834e3f7d9af7e316d11db6615242ff6b01df0cd5e5415c6750a1dc76a1fe4f3e63c007c32c3138970070&verify_code=&secure=1&all_secure=1&ch="
request.onreadystatechange = () => {
    if (request.readyState == 4) {
        console.log(request.responseText)
    }
}
request.open("POST", url, true)
request.send(content)