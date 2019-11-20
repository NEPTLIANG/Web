<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SeleCourses.aspx.cs" Inherits="EducationalAdministration.AdminModule.CoursesAdmin.SeleCourses" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            查询课程信息</div>
        <asp:DropDownList ID="ddlCourse" runat="server" DataSourceID="SqlDataSource1" DataTextField="cname" DataValueField="cno" OnSelectedIndexChanged="ddlCourse_SelectedIndexChanged" OnTextChanged="ddlCourse_SelectedIndexChanged">
        </asp:DropDownList>
        <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="Data Source=localhost;Initial Catalog=EducationalAdministration;Integrated Security=True" ProviderName="System.Data.SqlClient" SelectCommand="SELECT [cno], [cname], [tno] FROM [course]"></asp:SqlDataSource>
        <asp:Button ID="btnSelect" runat="server" OnClick="btnSelect_Click" Text="确定" />
        <br />
        课程号：<asp:Label ID="lblCno" runat="server" Text="请在上方选择课程后点击确定按钮"></asp:Label>
        <br />
        课程名称：<asp:Label ID="lblCname" runat="server" Text="请在上方选择课程后点击确定按钮"></asp:Label>
        <br />
        前导课程：<asp:Label ID="lblPcno" runat="server" Text="请在上方选择课程后点击确定按钮"></asp:Label>
        <br />
        任课教师：<asp:Label ID="lblTno" runat="server" Text="请在上方选择课程后点击确定按钮"></asp:Label>
    </form>
</body>
</html>
