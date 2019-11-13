﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DelCourses.aspx.cs" Inherits="EducationalAdministration.AdminModule.CoursesAdmin.DelCourses" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            删除课程</div>
        <asp:DropDownList ID="ddlCno" runat="server" DataSourceID="SqlDataSource1" DataTextField="cname" DataValueField="cno">
        </asp:DropDownList>
        <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="Data Source=localhost;Initial Catalog=EducationalAdministration;Integrated Security=True" ProviderName="System.Data.SqlClient" SelectCommand="SELECT [cno], [cname] FROM [course]"></asp:SqlDataSource>
        <br />
        <asp:Button ID="btnDel" runat="server" OnClick="btnDel_Click" Text="删除" />
    </form>
</body>
</html>