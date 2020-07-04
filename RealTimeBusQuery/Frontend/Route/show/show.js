onload = () => {
    var refresh = document.getElementById("refresh")
    refresh.addEventListener("click", loadData)
    loadData()
}

function loadData() {
    var org = location.search.split("=")[1]
    console.log(org)
    var response
    var request = new XMLHttpRequest()
    var method = "GET"
    var url = `http://122.51.3.35/route.php?org=${org}`
    request.onreadystatechange = () => {
        if (request.readyState == 4) {
            if ((request.status >= 200 && request.status < 300) || request.status == 304) {
                try {
                    console.log(request.responseText)
                    response = JSON.parse(request.responseText)
                } catch (e) {}
                if (response) {
                    if (response.status == 200) {
                        if (!response.routes.length) {
                            var prompt = document.createElement("div")
                            prompt.className = "card"
                            prompt.innerHTML = "<h2>暂未查询到路线</h2>"
                            document.getElementById("list").appendChild(prompt)
                            console.log(prompt)
                        } else {
                            document.getElementById("list").innerHTML = ""
                            var routes = response.routes
                            for (var index in routes) {
                                show(JSON.parse(routes[index]))
                            }
                        }
                    } else {
                        alert(response.message)
                        var prompt = document.createElement("div")
                        prompt.className = "card"
                        prompt.innerHTML = "<h2>暂未查询到路线</h2>"
                        document.getElementById("list").appendChild(prompt)
                        console.log(prompt)
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
    var intro = item.intro ? item.intro : "暂无说明"
    card.className = "card"
    card.innerHTML = `<h2>${item.name}</h2>
        <span class="id">id: ${item.id}</span>
        <div>${intro}</div>
        <a href='../modify/modify.html?id=${item.id}&name=${item.name}&org=${item.org}&intro=${item.intro}' class="edit">编辑</a>
        <button onclick="del('${item.id}')" class="del">删除</button>`
    var link = document.createElement("a")
    link.href = `../../Device/show/show.html?route=${item.id}`
    link.appendChild(card)
    document.getElementById("list").appendChild(link)
}

var del = (id) => {
    if (!confirm("确定要删除路线吗？")) {
        return;
    }
    var request = new XMLHttpRequest()
    var method = "DELETE"
    var url = "http://122.51.3.35/route.php"
    var content = `id=${id}`
    request.onreadystatechange = () => {
        if (request.readyState == 4) {
            if ((request.status >= 200 && request.status < 300) || request.status == 304) {
                try {
                    console.log(request.responseText)
                    response = JSON.parse(request.responseText);
                } catch (e) {}
                if (typeof(response) !== "undefined") {
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
                alert(`${request.status}：出现错误，请稍后重试`)
            }
        }
    }
    request.open(method, url, true)
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    request.send(content)
}