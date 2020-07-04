onload = () => {
    var loginBtn = document.getElementById("login");
    loginBtn.addEventListener("click", function () {
        var id = document.getElementById("id").value;
        var pwd = CryptoJS.SHA512(document.getElementById("pwd").value).toString();
        // console.log(pwd);
        var url = "http://122.51.3.35/org.php?" + "id=" + id + "&pwd=" + pwd;
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
                                console.log("OK");
                                location = `../../Route/show/show.html?id=${id}`;
                            } else {
                                alert(response.message);
                            }
                        }
                    } else {
                        alert("请求失败");
                    }
                }
            }
            xhr.open("GET", url, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(null);
        }
    })
}