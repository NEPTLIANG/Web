var request = new XMLHttpRequest()
var url = "http://localhost:63342/RealTimeBusQuery/Backend/device.php?_ijt=7hdkj3i67r4vg1iv6tie0advnr"
//key=471ec411c1fac90a900a6ea32752e43c sid=134678 tid=250232772 trid=20
var content = 'id=123&lng=0&lat=0'
request.onreadystatechange = () => {
    if (request.readyState == 4) {
        console.log(request.responseText)
    }
}
request.open("PUT", url, true)
request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
request.send(content)