var request = new XMLHttpRequest()
var url = "https://tsapi.amap.com/v1/track/point/upload"
//key=471ec411c1fac90a900a6ea32752e43c sid=134678 tid=250232772 trid=20
var contentObj = {
    key: "471ec411c1fac90a900a6ea32752e43c",
    sid: "134678",
    tid: "250232772",
    trid: "20",
    points: [
        {
            "location": "111.796994,22.171718",
            "locatetime": 1544176895000
        }
    ]
}
var content = JSON.stringify(contentObj)
// var content = '{"key":"471ec411c1fac90a900a6ea32752e43c","sid":"134678","tid":"250232772","trid":"20","points":[{"location":"111.796994,22.171718","locatetime":1544176895000},{"location":"111.795320,22.145096","locatetime":1544176913000}]}'
request.onreadystatechange = () => {
    if (request.readyState == 4) {
        console.log(request.responseText)
    }
}
request.open("POST", url, false)
request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
request.send(content)






var request = new XMLHttpRequest()
var url = "http://localhost:63342/RealTimeBusQuery/Backend/device.php?_ijt=p9dpt33ph0rve3snu0oam4demd"
//key=471ec411c1fac90a900a6ea32752e43c sid=134678 tid=250232772 trid=20
var content = "id=123&name=car1&route=r1"
// var content = '{"key":"471ec411c1fac90a900a6ea32752e43c","sid":"134678","tid":"250232772","trid":"20","points":[{"location":"111.796994,22.171718","locatetime":1544176895000},{"location":"111.795320,22.145096","locatetime":1544176913000}]}'
request.onreadystatechange = () => {
    if (request.readyState == 4) {
        console.log(request.responseText)
    }
}
request.open("POST", url, false)
request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
request.send(content)