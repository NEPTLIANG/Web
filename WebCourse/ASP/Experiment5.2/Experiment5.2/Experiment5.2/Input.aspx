<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Input.aspx.cs" Inherits="Experiment5._2.WebForm1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
        请输入你的姓名：<asp:TextBox ID="txtName" runat="server"></asp:TextBox>
    
    </div>
    <p>
        请选择你学习的方式：<asp:RadioButtonList ID="rdlMethod" runat="server" 
            RepeatDirection="Horizontal">
            <asp:ListItem Value="qrz">全日制</asp:ListItem>
            <asp:ListItem Value="zd">走读</asp:ListItem>
            <asp:ListItem Value="hs">函授</asp:ListItem>
        </asp:RadioButtonList>
    </p>
    请选择您所要学习的课程：<asp:CheckBoxList ID="cblCoures" runat="server" 
        RepeatDirection="Horizontal">
        <asp:ListItem Value="jsjjc">计算机基础</asp:ListItem>
        <asp:ListItem Value="c">c语言</asp:ListItem>
        <asp:ListItem Value="java">面向对象程序设计</asp:ListItem>
        <asp:ListItem Value="DataStructer">数据结构</asp:ListItem>
        <asp:ListItem Value="sql">数据库</asp:ListItem>
        <asp:ListItem Value="asp">asp</asp:ListItem>
    </asp:CheckBoxList>
    <asp:Button ID="btnSubmit" runat="server" Text="提交" onclick="btnSubmit_Click" />
    <asp:Button ID="btnReset" runat="server" Text="重置" />
    </form>
</body>
</html>
