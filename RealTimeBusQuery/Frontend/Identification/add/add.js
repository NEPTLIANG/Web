onload = () => {
    var addBtn = document.getElementById("add");
    addBtn.addEventListener("click", function () {
        var id = document.getElementById("id").value;
        var name = document.getElementById("name").value;
        var route = document.getElementById("route").value;
        var intro = document.getElementById("intro").value;
        var lng = document.getElementById("lnglat").value.split(",")[0];
        var lat = document.getElementById("lnglat").value.split(",")[1];
        intro = intro.length ? intro : "暂无说明";
        var content = "id=" + id + "&name=" + name + "&route=" + route
             + "&lng=" + lng + "&lat=" + lat + "&intro=" + intro;
        console.log(content);
        var url = "http://122.51.3.35/identification.php";
        if (typeof "XMLHttpRequest" !== "undefined") {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == "200") {
                        try {
                            console.log(xhr.responseText)
                            var response = JSON.parse(xhr.responseText);
                        } catch (e) {
                            alert("没有响应");
                        }
                        if (typeof (response) !== "undefined") {
                            if (response.status === 200) {
                                alert("标识点添加成功");
                            } else {
                                alert(response.message);
                            }
                        }
                    } else {
                        alert("请求失败");
                    }
                }
            }
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(content);
        }
    })
}