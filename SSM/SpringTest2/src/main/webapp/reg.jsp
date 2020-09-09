<%@ page language="java" contentType="text/html;charset=utf-8" pageEncoding="utf-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>

<html>
<head>
    <meta charset="UTF-8">
    <base href="<%=basePath%>">
</head>
<body>
<h2>注册</h2>
<center>
    <p id="message" style="color:red;height:16px"></p>
    <form action="" method="">
        <input type="text" id="username" name="username" placeholder="账号"/>
        </br>
        <input type="password" id="password" name="password" placeholder="密码"/>
    </form>
    <button id="bt">提交</button>
</center>

<script src="js/jquery-2.1.0.js"></script>
<script>
    $(function () {
        $("#bt").click(function () {
            var username = $("#username").val();
            var password = $("#password").val();
            var user = {"username": username, "password": password};
            $.ajax({
                //编写json 设置属性 值
                //请求路径
                url: "user/reg",
                //编码类型
                contentType: 'application/json;charset=UTF-8',
                //数据
                //data:'{"name":"王五","age":"30"}',
                //json对象需要 json转化
                data: JSON.stringify(user),
                //返回数据类型
                dataType: "json",
                //请求类型
                type: "POST",
                //处理函数
                success: function (data) {
                    //date服务器的json数据
                    //alert(data.success);
                    $("#message").html(data.message);
                    if (data.success == "true") {
                        open("index.jsp", "_self");
                    }
                }
            })
        })
    });
</script>
</body>
</html>
