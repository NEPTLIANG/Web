<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Ouput.aspx.cs" Inherits="Experiment5._2.Ouput" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
        您输入的信息为：</div>
    <p>
        姓名：<asp:Label ID="lblName" runat="server"></asp:Label>
    </p>
    血洗方式：<asp:Label ID="lblStudyMethod" runat="server"></asp:Label>
    <p>
        课程：<asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
    </p>
    </form>
</body>
</html>
