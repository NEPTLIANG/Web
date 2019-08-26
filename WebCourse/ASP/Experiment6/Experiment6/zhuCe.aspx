<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="zhuCe.aspx.cs" Inherits="Experiment6.zhuCe" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body style="font-family : &quot;苹方&quot;, &quot;微软雅黑&quot;; color : #777;">
    <form id="form1" runat="server">
        <div style="font-size: 32px">
            注册</div>
        <p>
            姓名：<asp:TextBox ID="txtName" runat="server" BorderColor="#B0B0B0" BorderStyle="Solid"></asp:TextBox>
        </p>
        <p>
            账号：<asp:TextBox ID="txtID" runat="server" BorderColor="#B0B0B0" BorderStyle="Solid"></asp:TextBox>
        </p>
        <p>
            密码：<asp:TextBox ID="txtPwd" runat="server" BorderColor="#B0B0B0" BorderStyle="Solid"></asp:TextBox>
        </p>
        <asp:Button ID="btnSubmit" runat="server" BorderColor="#B0B0B0" BorderStyle="Solid" Text="注册" OnClick="btnSubmit_Click" />
        <asp:Button ID="btnDL" runat="server" BorderColor="#B0B0B0" BorderStyle="Solid" OnClick="btnDL_Click" Text="转向登录" />
    </form>
</body>
</html>
