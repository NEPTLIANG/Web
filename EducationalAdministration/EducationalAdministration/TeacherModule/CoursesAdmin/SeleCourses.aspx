<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SeleCourses.aspx.cs" Inherits="EducationalAdministration.TeacherModule.CoursesAdmin.SeleCourses" %>

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
        <div class="head" >
            <h1>查询课程信息</h1>
        </div>
        <div class="left" >
            <asp:Menu ID="Menu1" runat="server">
                <Items>
                    <asp:MenuItem Text="查询课程信息" Value="查询课程信息" NavigateUrl="~/TeacherModule/CoursesAdmin/SeleCourses.aspx">
                    </asp:MenuItem>
                    <asp:MenuItem Text="查询部门信息" Value="查询部门信息" NavigateUrl="~/TeacherModule/DepartAdmin/SeleDepart.aspx">
                    </asp:MenuItem>
                    <asp:MenuItem Text="查询学生信息" Value="查询学生信息" NavigateUrl="~/TeacherModule/StudentAdmin/SeleStudent.aspx">
                    </asp:MenuItem>
                    <asp:MenuItem Text="教师信息管理" Value="教师信息管理" Selectable="False">
                        <asp:MenuItem NavigateUrl="~/TeacherModule/TeacherAdmin/SeleTeacher.aspx" Text="查询教师信息" Value="查询教师信息"></asp:MenuItem>
                        <asp:MenuItem NavigateUrl="~/TeacherModule/TeacherAdmin/AltTeacher.aspx" Text="修改密码" Value="修改密码"></asp:MenuItem>
                    </asp:MenuItem>
                    <asp:MenuItem Text="成绩信息管理" Value="选课/成绩管理" Selectable="False">
                        <asp:MenuItem Text="录入成绩" Value="增加选课信息/录入成绩" NavigateUrl="~/TeacherModule/ScoreAdmin/AddScore.aspx"></asp:MenuItem>
                        <asp:MenuItem Text="查询成绩" Value="查询选课信息/成绩记录" NavigateUrl="~/TeacherModule/ScoreAdmin/SeleScore.aspx"></asp:MenuItem>
                    </asp:MenuItem>
                </Items>
            </asp:Menu>
        </div>
        <div class="card" >
            <asp:DropDownList ID="ddlCourse" runat="server" DataSourceID="SqlDataSource1" DataTextField="cname" DataValueField="cno" OnSelectedIndexChanged="ddlCourse_SelectedIndexChanged" OnTextChanged="ddlCourse_SelectedIndexChanged">
            </asp:DropDownList>
            <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="Data Source=localhost;Initial Catalog=EducationalAdministration;Integrated Security=True" ProviderName="System.Data.SqlClient" SelectCommand="SELECT [cno], [cname], [tno] FROM [course]"></asp:SqlDataSource>
            <asp:Button ID="btnSelect" runat="server" OnClick="btnSelect_Click" Text="确定" />
            <br />
            课程名称：<asp:Label ID="lblCname" runat="server" Text="请在上方选择课程后点击确定按钮"></asp:Label>
            <br />
            前导课程：<asp:Label ID="lblPcno" runat="server" Text="请在上方选择课程后点击确定按钮"></asp:Label>
            <br />
            任课教师：<asp:Label ID="lblTno" runat="server" Text="请在上方选择课程后点击确定按钮"></asp:Label>
        </div>
    </form>
</body>
</html>
