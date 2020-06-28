// const { userInfo } = require("os")

var request = new XMLHttpRequest()
var method = "DELETE"
var url = "http://122.51.3.35/user.php"
var content = 'id=test'
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