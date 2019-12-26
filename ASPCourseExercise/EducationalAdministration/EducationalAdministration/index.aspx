<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="EducationalAdministration.index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <link href="AdminModule/Style/SubCSS.css" type="text/css" rel="stylesheet" />
</head>
<body id="indexBody">
    <form id="form1" runat="server">
        <div class="head" id="indexTitleDiv" style="float: left; margin-top: 256px">
            <h1>岭南师范学院教务管理系统</h1>
            <h3>登录</h3>
        </div>
        <div class="card" id="indexCard" style="margin-right: 128px; margin-top: 256px; float: right; width: 20%; text-align: center">
            账号<asp:TextBox ID="txtId" runat="server"></asp:TextBox>
            <br />
            密码<asp:TextBox ID="txtPwd" runat="server" TextMode="Password"></asp:TextBox>
            <asp:RadioButtonList ID="rdlIdentity" runat="server" RepeatDirection="Horizontal">
                <asp:ListItem Value="Teacher">教师</asp:ListItem>
                <asp:ListItem Selected="True" Value="Student">学生</asp:ListItem>
                <asp:ListItem Value="Admin">管理员</asp:ListItem>
            </asp:RadioButtonList>
            <p>
                <asp:Button ID="btnLogin" runat="server" OnClick="login_Click" Text="登录" />
            </p>
        </div>
    </form>
</body>
</html>
