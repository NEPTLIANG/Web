onload = () => {
    var addBtn = document.getElementById("regist");
    addBtn.addEventListener("click", function () {
        var name = document.getElementById("name").value;
        console.log(name)
        var id = document.getElementById("id").value;
        var pwd = CryptoJS.SHA512(document.getElementById("pwd").value).toString();
        var pwd2 = CryptoJS.SHA512(document.getElementById("pwd2").value).toString();
        if (pwd !== pwd2) {
            alert("两次密码不一致");
            document.getElementById("pwd").value = "";
            document.getElementById("pwd2").value = "";
            return;
        }
        var url = "http://122.51.3.35/user.php"
        content = "name=" + name + "&id=" + id + "&pwd=" + pwd;
        console.log(url)
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
                                // location = "../Map/map.html"
                                console.log("OK")
                                alert("注册成功")
                                location = "../login/login.html"
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