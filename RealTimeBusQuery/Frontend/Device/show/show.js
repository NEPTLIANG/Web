onload = () => {
    var response
    var request = new XMLHttpRequest()
    var method = "GET"
    var url = "http://122.51.3.35/device.php?route=name"
    var content = ''
    //key=471ec411c1fac90a900a6ea32752e43c sid=134678 tid=250232772 trid=20
    request.onreadystatechange = () => {
        if (request.readyState == 4) {
            response = JSON.parse(request.responseText);
            if (response && response.status == 200) {
                if (!response.devices.length) {
                    var alert = document.createElement("div")
                    alert.innerHTML = "<h2>暂无校车</h2>"
                    document.getElementById("list").append(alert)
                }
                var devices = response.devices
                for (var index in devices) {
                    show(JSON.parse(devices[index]))
                }
            }
        }
    }
    request.open(method, url, true)
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    request.send(content)
}

function show(item) {
    var card = document.createElement("div")
    var position = (item.lng && item.lat) ? (item.lng + "<br/>" + item.lat) : "暂无定位"
    var intro = item.intro ? item.intro : "暂无说明"
    card.className = "card"
    card.innerHTML = "<h2>" + item.name + "</h2>"
        + "<span class=\"id\">id: " + item.id + "</span>"
        + "<div class=\"position\">"
            + "<div style=\"font-weight: bold\">位置</div>" 
            + position + "</div>"
        + "<div>" + intro + "</div>"
        + "<a href='../modify/modify.html?id=" + item.id 
        + "&" + "' class=\"edit\">编辑</a>"
        + "<button class=\"del\">删除</button>"
    document.getElementById("list").appendChild(card)
}