<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AltCourses.aspx.cs" Inherits="EducationalAdministration.AdminModule.CoursesAdmin.AltCourses" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            修改课程信息</div>
        <asp:DropDownList ID="ddlCourse" runat="server" DataSourceID="SqlDataSource1" DataTextField="cname" DataValueField="cno" OnSelectedIndexChanged="ddlCourse_SelectedIndexChanged" OnTextChanged="ddlCourse_SelectedIndexChanged">
        </asp:DropDownList>
        <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="Data Source=localhost;Initial Catalog=EducationalAdministration;Integrated Security=True" ProviderName="System.Data.SqlClient" SelectCommand="SELECT [cno], [cname], [tno] FROM [course]"></asp:SqlDataSource>
        <asp:Button ID="btnSelect" runat="server" OnClick="btnSelect_Click" Text="确定" />
        <br />
        原课程号：<asp:Label ID="lblCno" runat="server" Text="请在上方选择课程后点击确定按钮"></asp:Label>
&nbsp;&nbsp;&nbsp; 新课程号：<asp:TextBox ID="txtCno" runat="server"></asp:TextBox>
        <br />
        原课程名：<asp:Label ID="lblCname" runat="server" Text="请在上方选择课程后点击确定按钮"></asp:Label>
&nbsp;&nbsp;&nbsp; 新课程名：<asp:TextBox ID="txtCname" runat="server"></asp:TextBox>
        <br />
        原前导课：<asp:Label ID="lblPcno" runat="server" Text="请在上方选择课程后点击确定按钮"></asp:Label>
&nbsp;&nbsp;&nbsp; 新前导课：<asp:DropDownList ID="ddlPcno" runat="server" DataSourceID="SqlDataSource1" DataTextField="cname" DataValueField="cno">
        </asp:DropDownList>
        <br />
        原教师：<asp:Label ID="lblTno" runat="server" Text="请在上方选择课程后点击确定按钮"></asp:Label>
&nbsp;&nbsp;&nbsp;&nbsp; 新教师：<asp:DropDownList ID="ddlTno" runat="server" DataSourceID="SelectTeacher" DataTextField="tname" DataValueField="tno">
        </asp:DropDownList>
        <asp:SqlDataSource ID="SelectTeacher" runat="server" ConnectionString="Data Source=localhost;Initial Catalog=EducationalAdministration;Integrated Security=True" ProviderName="System.Data.SqlClient" SelectCommand="SELECT [tno], [tname] FROM [teacher]"></asp:SqlDataSource>
        <br />
        <asp:Button ID="btnSubmit" runat="server" OnClick="btnSubmit_Click" Text="修改" />
    </form>
</body>
</html>
