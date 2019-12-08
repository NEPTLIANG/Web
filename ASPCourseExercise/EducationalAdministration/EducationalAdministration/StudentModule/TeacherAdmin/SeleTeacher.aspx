<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SeleTeacher.aspx.cs" Inherits="EducationalAdministration.StudentModule.TeacherAdmin.SeleTeacher" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <link href="../Style/SubCSS.css" type="text/css" rel="stylesheet" />
    <style type="text/css"></style>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <h1 class="head" >查询教师信息</h1>
        </div>
        <div class="left">
        <asp:Menu ID="Menu1" runat="server">
            <Items>
                <asp:MenuItem Text="查询课程信息" Value="查询课程信息" NavigateUrl="~/StudentModule/CoursesAdmin/SeleCourses.aspx">
                </asp:MenuItem>
                <asp:MenuItem Text="查询部门信息" Value="查询部门信息" NavigateUrl="~/StudentModule/DepartAdmin/SeleDepart.aspx">
                </asp:MenuItem>
                <asp:MenuItem Text="查询教师信息" Value="查询教师信息" NavigateUrl="~/StudentModule/TeacherAdmin/SeleTeacher.aspx">
                </asp:MenuItem>
                <asp:MenuItem Text="学生信息管理" Value="学生信息管理" Selectable="False">
                    <asp:MenuItem NavigateUrl="~/StudentModule/StudentAdmin/SeleStudent.aspx" Text="查询学生信息" Value="查询学生信息"></asp:MenuItem>
                    <asp:MenuItem NavigateUrl="~/StudentModule/StudentAdmin/AltStudent.aspx" Text="修改密码" Value="修改密码"></asp:MenuItem>
                </asp:MenuItem>
                <asp:MenuItem Text="选课管理" Value="选课/成绩管理" Selectable="False">
                    <asp:MenuItem Text="选课" Value="增加选课信息/录入成绩" NavigateUrl="~/StudentModule/ScoreAdmin/AddScore.aspx"></asp:MenuItem>
                    <asp:MenuItem Text="查询选课信息/成绩记录" Value="查询选课信息/成绩记录" NavigateUrl="~/StudentModule/ScoreAdmin/SeleScore.aspx"></asp:MenuItem>
                </asp:MenuItem>
            </Items>
        </asp:Menu>
        </div>
        <div class="card" >
            选择教师：<asp:DropDownList ID="ddlTeacher" runat="server" DataSourceID="SqlDataSourceStudent" DataTextField="tname" DataValueField="tno">
            </asp:DropDownList>
            <asp:SqlDataSource ID="SqlDataSourceStudent" runat="server" ConnectionString="Data Source=localhost;Initial Catalog=EducationalAdministration;Integrated Security=True" ProviderName="System.Data.SqlClient" SelectCommand="SELECT [tno], [tname] FROM [teacher]"></asp:SqlDataSource>
            <br />
            工号：<asp:Label ID="lblTno" runat="server" Text="请在上方选择教师后点击确定按钮"></asp:Label>
            <br />
            姓名：<asp:Label ID="lblTname" runat="server" Text="请在上方选择教师后点击确定按钮"></asp:Label>
            <br />
            性别：<asp:Label ID="lblGender" runat="server" Text="请在上方选择教师后点击确定按钮"></asp:Label>
            <br />
            年龄：<asp:Label ID="lblAge" runat="server" Text="请在上方选择教师后点击确定按钮"></asp:Label>
            <br />
            部门：<asp:Label ID="lblDepart" runat="server" Text="请在上方选择教师后点击确定按钮"></asp:Label>
            <br />
            职称：<asp:Label ID="lblProf" runat="server" Text="请在上方选择教师后点击确定按钮"></asp:Label>
            <p>
            <asp:Button ID="btnSelect" runat="server" OnClick="btnSelect_Click" Text="确定" />
            </p>
        </div>
    </form>
</body>
</html>
