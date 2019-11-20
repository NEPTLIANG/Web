<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AltDepart.aspx.cs" Inherits="EducationalAdministration.AdminModule.DepartAdmin.AltDepart" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            修改部门信息</div>
        <asp:DropDownList ID="ddlDepart" runat="server" DataSourceID="SeleDepart" DataTextField="dname" DataValueField="dno" OnSelectedIndexChanged="ddlCourse_SelectedIndexChanged" OnTextChanged="ddlCourse_SelectedIndexChanged">
        </asp:DropDownList>
        <asp:SqlDataSource ID="SeleDepart" runat="server" ConnectionString="Data Source=localhost;Initial Catalog=EducationalAdministration;Integrated Security=True" ProviderName="System.Data.SqlClient" SelectCommand="SELECT [dno], [dname] FROM [department]"></asp:SqlDataSource>
        <asp:Button ID="btnSelect" runat="server" OnClick="btnSelect_Click" Text="确定" />
        <br />
        原部门号：<asp:Label ID="lblDno" runat="server" Text="请在上方选择部门后点击确定按钮"></asp:Label>
&nbsp;&nbsp;&nbsp; 新部门号：<asp:TextBox ID="txtDno" runat="server"></asp:TextBox>
        <br />
        原部门名称：<asp:Label ID="lblDname" runat="server" Text="请在上方选择课程后点击确定按钮"></asp:Label>
        &nbsp;&nbsp;&nbsp; 新部门名称：<asp:TextBox ID="txtDname" runat="server"></asp:TextBox>
        <br />
        原部门院长：<asp:Label ID="lblDean" runat="server" Text="请在上方选择课程后点击确定按钮"></asp:Label>
        &nbsp;&nbsp;&nbsp; 新部门院长：<asp:DropDownList ID="ddlDean" runat="server" DataSourceID="SelectTeacher" DataTextField="tname" DataValueField="tno">
        </asp:DropDownList>
        <br />
        <asp:SqlDataSource ID="SelectTeacher" runat="server" ConnectionString="Data Source=localhost;Initial Catalog=EducationalAdministration;Integrated Security=True" ProviderName="System.Data.SqlClient" SelectCommand="SELECT [tno], [tname] FROM [teacher]"></asp:SqlDataSource>
        <br />
        <asp:Button ID="btnSubmit" runat="server" OnClick="btnSubmit_Click" Text="修改" />
    </form>
</body>
</html>
