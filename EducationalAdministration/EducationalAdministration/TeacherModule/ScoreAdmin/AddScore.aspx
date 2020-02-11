<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AddScore.aspx.cs" Inherits="EducationalAdministration.TeacherModule.ScoreAdmin.AddScore" %>

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
            <h1 class="head" >录入成绩</h1>
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
            选择班级<asp:DropDownList ID="ddlCourse" runat="server" DataSourceID="SqlDataSource1" DataTextField="cname" DataValueField="cno">
            </asp:DropDownList>
            <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="Data Source=localhost;Initial Catalog=EducationalAdministration;Integrated Security=True" ProviderName="System.Data.SqlClient" SelectCommand="SELECT [cno], [cname] FROM [course]"></asp:SqlDataSource>
            <asp:Button ID="btnCourse" runat="server" OnClick="btnCourse_Click" Text="确定" />
            <br />
            <asp:Label ID="Label1" runat="server" Text="学生学号"></asp:Label>
            <asp:TextBox ID="txtSno" runat="server"></asp:TextBox>
            <br />
            成绩<asp:TextBox ID="txtGrade" runat="server"></asp:TextBox>
            <br />
            <asp:Button ID="btnSubmit" runat="server" Text="添加" OnClick="btnSubmit_Click" />
            <asp:Button ID="btnClean" runat="server" OnClick="btnClean_Click" Text="清空" />
        </div>
    </form>
</body>
</html>
