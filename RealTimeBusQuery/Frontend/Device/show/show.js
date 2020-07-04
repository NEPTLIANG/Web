onload = () => {
    document.getElementById("identification").onclick = () => {
        location = `../../Identification/show/show.html?route=${location.search.split("=")[1]}`
    }
    var refresh = document.getElementById("refresh")
    refresh.addEventListener("click", loadData)
    loadData()
}

function loadData() {
    var route = location.search.split("=")[1]
    var response
    var request = new XMLHttpRequest()
    var method = "GET"
    var url = `http://122.51.3.35/device.php?route=${route}`
    request.onreadystatechange = () => {
        if (request.readyState == 4) {
            if ((request.status >= 200 && request.status < 300) || request.status == 304) {
                try {
                    response = JSON.parse(request.responseText);
                } catch (e) {}
                if (response) {
                    if (response.status == 200) {
                        if (!response.devices.length) {
                            var prompt = document.createElement("div")
                            prompt.className = "card"
                            prompt.innerHTML = "<h2>暂未查询到标识点</h2>"
                            document.getElementById("list").appendChild(prompt)
                            console.log(prompt)
                        } else {
                            document.getElementById("list").innerHTML = ""
                            var devices = response.devices
                            for (var index in devices) {
                                show(JSON.parse(devices[index]))
                                console.log(devices[index])
                            }
                        }
                    } else {
                        alert(response.describe)
                        var prompt = document.createElement("div")
                        prompt.className = "card"
                        prompt.innerHTML = "<h2>暂未查询到标识点</h2>"
                        document.getElementById("list").appendChild(prompt)
                        console.log(response)
                    }
                } else {
                    alert("响应格式错误，请稍后重试")
                }
            } else {
                alert(`${response.status}：出现错误，请稍后重试`)
            }
        }
    }
    request.open(method, url, true)
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    request.send(null)
}

function show(item) {
    var card = document.createElement("div")
    var position = (item.lng && item.lat) ? (item.lng + "<br/>" + item.lat) : "暂无定位"
    var intro = item.intro ? item.intro : "暂无说明"
    card.className = "card"
    card.innerHTML = `<h2>${item.name}</h2>
        <span class="id">id: ${item.id}</span>
        <div class="position"><div style="font-weight: bold">位置</div>${position}</div>
        <div>${intro}</div>
        <a href='../modify/modify.html?id=${item.id}&name=${item.name}&route=${item.route}&intro=${item.intro}' class="edit">编辑</a>
        <button onclick="del('${item.id}')" class="del">删除</button>`
    document.getElementById("list").appendChild(card)
}

var del = (id) => {
    if (!confirm("确定要删除设备吗？")) {
        return;
    }
    var request = new XMLHttpRequest()
    var method = "DELETE"
    var url = "http://122.51.3.35/device.php"
    var content = `id=${id}`
    request.onreadystatechange = () => {
        if (request.readyState == 4) {
            if ((request.status >= 200 && request.status < 300) || request.status == 304) {
                try {
                    response = JSON.parse(request.responseText);
                } catch (e) {}
                if (response) {
                    if (response.status == 200) {
                        alert("删除成功")
                        loadData()
                    } else {
                        alert(response.message)
                    }
                } else {
                    alert("响应格式错误，请稍后重试")
                }
            } else {
                alert(`${response.status}：出现错误，请稍后重试`)
            }
        }
    }
    request.open(method, url, true)
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    request.send(content)
}