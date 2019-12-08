<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Student.aspx.cs" Inherits="EducationalAdministration.StudentModule.Admin" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <link href="Style/Student.css" type="text/css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <div class="head" >
            <h1>PHP是世界上最好的语言教务管理系统</h1>
            <h3>学生主页</h3>
        </div>
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
    </form>
</body>
</html>
