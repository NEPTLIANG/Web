onload = () => {
    getInfo();
    var addBtn = document.getElementById("modify");
    addBtn.addEventListener("click", function () {
        var id = document.getElementById("id").value;
        var name = document.getElementById("name").value;
        var route = document.getElementById("route").value;
        var intro = document.getElementById("intro").value;
        intro = (intro.length > 0) ? intro : "暂无说明";
        var content = "id=" + id + "&name=" + name + "&route=" + route + "&intro=" + intro;
        var url = "http://122.51.3.35/device.php";
        if (typeof "XMLHttpRequest" !== "undefined") {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == "200") {
                        // var x = eval(xhr.responseText);
                        try {
                            console.log(xhr.responseText);
                            var response = JSON.parse(xhr.responseText);
                        } catch (e) {
                            alert("没有响应");
                        }
                        if (typeof (response) !== "undefined") {
                            if (response.status === 200) {
                                alert("设备信息修改成功");
                            } else {
                                alert(response.message);
                            }
                        }
                    } else {
                        alert("请求失败");
                    }
                }
            }
            xhr.open("PUT", url, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(content);
        }
    })
}

function getInfo() {
    console.log(document.location.search.substr(1).split("&"));
    var param = document.location.search.substr(1).split("&");
    console.log(decodeURIComponent(param[0].substr(param[0].indexOf("=") + 1)))
    document.getElementById("id").value = param[0].substr(param[0].indexOf("=") + 1);
    document.getElementById("name").value = decodeURIComponent(param[1].substr(param[1].indexOf("=") + 1));
    document.getElementById("route").value = param[2].substr(param[2].indexOf("=") + 1);
    document.getElementById("intro").value = decodeURIComponent(param[3].substr(param[3].indexOf("=") + 1));
}