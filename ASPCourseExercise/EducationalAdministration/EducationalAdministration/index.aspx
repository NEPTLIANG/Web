<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="EducationalAdministration.index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            PHP是世界上最好的语言教务系统<br />
            登录</div>
        账号：<asp:TextBox ID="id" runat="server"></asp:TextBox>
        <br />
        密码：<asp:TextBox ID="pwd" runat="server" TextMode="Password"></asp:TextBox>
        <p>
            <asp:Button ID="login" runat="server" OnClick="login_Click" Text="登录" />
        </p>
    </form>
</body>
</html>
