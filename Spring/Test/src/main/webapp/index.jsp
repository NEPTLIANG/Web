<%@ page language="java" contentType="text/html;charset=utf-8" pageEncoding="utf-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<html>
    <head>
        <meta charset="UTF-8">
        <base href="<%=basePath%>">
    </head>
<body>
    <h2>首页</h2>
    <a href="login/login1?id=波波">访问地址</a>
    <a href="test/test2?username=波波&password=123456">访问地址</a>
    <a href="test/test3?date=2020/8/31">传日期</a>
    <a href="test/test4?username=波波&password=123456&birthday=1997/10/26&hobby=听音乐">数据自动转化</a>
    <br/>
    <form action="test/test4" method="post">
        <input type="text" name="username" placeholder="用户名/手机号/邮箱"/>
        <br/>
        <input type="password" name="password" placeholder="密码"/>
        <br/>
        <input type="submit"/>
    </form>
</body>
</html>
