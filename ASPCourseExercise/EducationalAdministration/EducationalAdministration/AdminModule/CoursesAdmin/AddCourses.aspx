<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AddCourses.aspx.cs" Inherits="EducationalAdministration.AdminModule.CoursesAdmin.AddCourses" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            添加课程</div>
        <asp:Label ID="Label1" runat="server" Text="课程号"></asp:Label>
        <asp:TextBox ID="txtCno" runat="server"></asp:TextBox>
        <br />
        课程名称<asp:TextBox ID="txtCname" runat="server"></asp:TextBox>
        <br />
        前导课程<asp:DropDownList ID="ddlPcno" runat="server" DataSourceID="SqlDataSource2" DataTextField="cname" DataValueField="cno">
        </asp:DropDownList>
        <asp:SqlDataSource ID="SqlDataSource2" runat="server" ConnectionString="Data Source=localhost;Initial Catalog=EducationalAdministration;Integrated Security=True" ProviderName="System.Data.SqlClient" SelectCommand="SELECT [cname], [cno] FROM [course]"></asp:SqlDataSource>
        <br />
        教师<asp:DropDownList ID="ddlTno" runat="server" DataSourceID="SqlDataSourceTeacher1" DataTextField="tname" DataValueField="tno">
        </asp:DropDownList>
        <asp:SqlDataSource ID="SqlDataSourceTeacher1" runat="server" ConnectionString="Data Source=localhost;Initial Catalog=EducationalAdministration;Integrated Security=True" ProviderName="System.Data.SqlClient" SelectCommand="SELECT [tno], [tname] FROM [teacher]"></asp:SqlDataSource>
        <br />
        <asp:Button ID="btnSubmit" runat="server" Text="提交" />
    </form>
</body>
</html>
