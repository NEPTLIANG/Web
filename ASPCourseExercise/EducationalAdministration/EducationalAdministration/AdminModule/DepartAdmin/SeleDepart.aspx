<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SeleDepart.aspx.cs" Inherits="EducationalAdministration.AdminModule.DepartAdmin.SeleDepart" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            查询部门信息</div>
        <asp:DropDownList ID="ddlDepart" runat="server" DataSourceID="SqlDataSourceDepart" DataTextField="dname" DataValueField="dno" OnSelectedIndexChanged="ddlDepart_SelectedIndexChanged" OnTextChanged="ddlDepart_SelectedIndexChanged">
        </asp:DropDownList>
        <asp:SqlDataSource ID="SqlDataSourceDepart" runat="server" ConnectionString="Data Source=localhost;Initial Catalog=EducationalAdministration;Integrated Security=True" ProviderName="System.Data.SqlClient" SelectCommand="SELECT [dno], [dname] FROM [department]"></asp:SqlDataSource>
        <asp:Button ID="btnSelect" runat="server" OnClick="btnSelect_Click" Text="确定" />
        <br />
        部门号：<asp:Label ID="lblDno" runat="server" Text="请在上方选择部门后点击确定按钮"></asp:Label>
        <br />
        部门名称：<asp:Label ID="lblDname" runat="server" Text="请在上方选择部门后点击确定按钮"></asp:Label>
        <br />
        部门院长：<asp:Label ID="lblDean" runat="server" Text="请在上方选择课程后点击确定按钮"></asp:Label>
    </form>
</body>
</html>
