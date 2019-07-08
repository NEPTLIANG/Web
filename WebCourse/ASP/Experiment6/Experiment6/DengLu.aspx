<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DengLu.aspx.cs" Inherits="Experiment6.DengLu" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div style="font-size: 32px;">
            登录</div>
        <p>
            账号：<asp:TextBox ID="txtID" runat="server"></asp:TextBox>
        </p>
        <p>
            密码：<asp:TextBox ID="txtPwd" runat="server"></asp:TextBox>
        </p>
        <asp:Button ID="btnSubmit" runat="server" Text="登录" OnClick="btnSubmit_Click" />
        <asp:Button ID="btnZC" runat="server" Text="转向注册" />
    </form>
</body>
</html>
