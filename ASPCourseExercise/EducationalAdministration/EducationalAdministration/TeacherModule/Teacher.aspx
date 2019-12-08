<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Teacher.aspx.cs" Inherits="EducationalAdministration.Home" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <link href="Style/Teacher.css" type="text/css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <div class="head" >
            <h1>PHP是世界上最好的语言教务管理系统</h1>
            <h3>教师主页</h3>
        </div>
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
    </form>
</body>
</html>
