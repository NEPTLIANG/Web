<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AltTeacher.aspx.cs" Inherits="EducationalAdministration.AdminModule.TeacherAdmin.AltTeacher" %>

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
            <h1 class="head" >修改教师信息</h1>
        </div>
            <div class="left">
        <asp:Menu ID="Menu1" runat="server">
            <Items>
                <asp:MenuItem Text="课程信息管理" Value="课程信息管理" Selectable="False">
                    <asp:MenuItem Text="增加课程信息" Value="增加课程信息" NavigateUrl="~/AdminModule/CoursesAdmin/AddCourses.aspx"></asp:MenuItem>
                    <asp:MenuItem Text="删除课程信息" Value="删除课程信息" NavigateUrl="~/AdminModule/CoursesAdmin/DelCourses.aspx"></asp:MenuItem>
                    <asp:MenuItem Text="修改课程信息" Value="修改课程信息" NavigateUrl="~/AdminModule/CoursesAdmin/AltCourses.aspx"></asp:MenuItem>
                    <asp:MenuItem Text="查询课程信息" Value="查询课程信息" NavigateUrl="~/AdminModule/CoursesAdmin/SeleCourses.aspx"></asp:MenuItem>
                </asp:MenuItem>
                <asp:MenuItem Text="部门信息管理" Value="部门信息管理" Selectable="False">
                    <asp:MenuItem Text="增加部门信息" Value="增加部门信息" NavigateUrl="~/AdminModule/DepartAdmin/AddDepart.aspx"></asp:MenuItem>
                    <asp:MenuItem Text="删除部门信息" Value="删除课程信息" NavigateUrl="~/AdminModule/DepartAdmin/DelDepart.aspx"></asp:MenuItem>
                    <asp:MenuItem Text="修改部门信息" Value="修改部门信息" NavigateUrl="~/AdminModule/DepartAdmin/AltDepart.aspx"></asp:MenuItem>
                    <asp:MenuItem Text="查询部门信息" Value="查询部门信息" NavigateUrl="~/AdminModule/DepartAdmin/SeleDepart.aspx"></asp:MenuItem>
                </asp:MenuItem>
                <asp:MenuItem Text="学生信息管理" Value="学生信息管理" Selectable="False">
                    <asp:MenuItem Text="增加学生信息" Value="增加学生信息" NavigateUrl="~/AdminModule/StudentAdmin/AddStudent.aspx"></asp:MenuItem>
                    <asp:MenuItem Text="删除学生信息" Value="删除学生信息" NavigateUrl="~/AdminModule/StudentAdmin/DelStudent.aspx"></asp:MenuItem>
                    <asp:MenuItem Text="修改学生信息" Value="修改学生信息" NavigateUrl="~/AdminModule/StudentAdmin/AltStudent.aspx"></asp:MenuItem>
                    <asp:MenuItem Text="查询学生信息" Value="查询学生信息" NavigateUrl="~/AdminModule/StudentAdmin/SeleStudent.aspx"></asp:MenuItem>
                </asp:MenuItem>
                <asp:MenuItem Text="教师信息管理" Value="教师信息管理" Selectable="False">
                    <asp:MenuItem Text="增加教师信息" Value="增加教师信息" NavigateUrl="~/AdminModule/TeacherAdmin/AddTeacher.aspx"></asp:MenuItem>
                    <asp:MenuItem Text="删除教师信息" Value="删除教师信息" NavigateUrl="~/AdminModule/TeacherAdmin/DelTeacher.aspx"></asp:MenuItem>
                    <asp:MenuItem Text="修改教师信息" Value="修改教师信息" NavigateUrl="~/AdminModule/TeacherAdmin/AltTeacher.aspx"></asp:MenuItem>
                    <asp:MenuItem Text="查询教师信息" Value="查询教师信息" NavigateUrl="~/AdminModule/TeacherAdmin/SeleTeacher.aspx"></asp:MenuItem>
                </asp:MenuItem>
                <asp:MenuItem Text="选课/成绩管理" Value="选课/成绩管理" Selectable="False">
                    <asp:MenuItem Text="增加选课信息/录入成绩" Value="增加选课信息/录入成绩" NavigateUrl="~/AdminModule/ScoreAdmin/AddScore.aspx"></asp:MenuItem>
                    <asp:MenuItem Text="删除选课信息/成绩记录" Value="删除选课信息/成绩记录" NavigateUrl="~/AdminModule/ScoreAdmin/DelScore.aspx"></asp:MenuItem>
                    <asp:MenuItem Text="修改选课信息/成绩记录" Value="修改选课信息/成绩记录" NavigateUrl="~/AdminModule/ScoreAdmin/AltScore.aspx"></asp:MenuItem>
                    <asp:MenuItem Text="查询选课信息/成绩记录" Value="查询选课信息/成绩记录" NavigateUrl="~/AdminModule/ScoreAdmin/SeleScore.aspx"></asp:MenuItem>
                </asp:MenuItem>
                <asp:MenuItem Text="管理员管理" Value="管理员账号管理" Selectable="False">
                    <asp:MenuItem Text="增加管理员" Value="增加管理员" NavigateUrl="~/AdminModule/AdminAdmin/AddAdmin.aspx"></asp:MenuItem>
                    <asp:MenuItem Text="删除管理员" Value="删除管理员" NavigateUrl="~/AdminModule/AdminAdmin/DelAdmin.aspx"></asp:MenuItem>
                    <asp:MenuItem Text="修改管理员" Value="修改管理员" NavigateUrl="~/AdminModule/AdminAdmin/AltAdmin.aspx"></asp:MenuItem>
                </asp:MenuItem>
            </Items>
        </asp:Menu>
        </div>
        <div class="card" >
            选择教师：<asp:DropDownList ID="ddlTeacher" runat="server" DataSourceID="SqlDataSourceTeacher" DataTextField="tname" DataValueField="tno">
            </asp:DropDownList>
            <asp:SqlDataSource ID="SqlDataSourceTeacher" runat="server" ConnectionString="Data Source=localhost;Initial Catalog=EducationalAdministration;Integrated Security=True" ProviderName="System.Data.SqlClient" SelectCommand="SELECT [tno], [tname] FROM [teacher]"></asp:SqlDataSource>
            <asp:Button ID="btnSelect" runat="server" OnClick="btnSelect_Click" Text="确定" />
            <br />
            原工号：<asp:Label ID="lblOldTno" runat="server" Text="请在上方选择学生后点击确定按钮"></asp:Label>
            &nbsp;&nbsp;&nbsp; 
            <br />
            新工号：<asp:TextBox ID="txtNewTno" runat="server"></asp:TextBox>
            <br />
            原姓名：<asp:Label ID="lblOldTname" runat="server" Text="请在上方选择学生后点击确定按钮"></asp:Label>
    &nbsp;&nbsp;&nbsp; 
            <br />
            新姓名：<asp:TextBox ID="txtNewTname" runat="server"></asp:TextBox>
            <br />
            原性别：<asp:Label ID="lblOldGender" runat="server" Text="请在上方选择学生后点击确定按钮"></asp:Label>
    &nbsp;&nbsp;&nbsp; 
            <br />
            新性别：<asp:DropDownList ID="ddlNewGender" runat="server">
                <asp:ListItem>男</asp:ListItem>
                <asp:ListItem>女</asp:ListItem>
            </asp:DropDownList>
            <br />
            原年龄：<asp:Label ID="lblOldAge" runat="server" Text="请在上方选择学生后点击确定按钮"></asp:Label>
    &nbsp;&nbsp;&nbsp; 
            <br />
            新年龄：<asp:TextBox ID="txtNewAge" runat="server"></asp:TextBox>
            <br />
            原部门：<asp:Label ID="lblOldDepart" runat="server" Text="请在上方选择学生后点击确定按钮"></asp:Label>
    &nbsp;&nbsp;&nbsp; 
            <br />
            新部门：<asp:DropDownList ID="ddlNewDepart" runat="server" DataSourceID="SqlDataDepart" DataTextField="name" DataValueField="no">
            </asp:DropDownList>
            <asp:SqlDataSource ID="SqlDataDepart" runat="server" ConnectionString="Data Source=localhost;Initial Catalog=EducationalAdministration;Integrated Security=True" ProviderName="System.Data.SqlClient" SelectCommand="SELECT [no], [name] FROM [department]"></asp:SqlDataSource>
            <br />
            原职称：<asp:Label ID="lblOldProf" runat="server" Text="请在上方选择学生后点击确定按钮"></asp:Label>
    &nbsp;&nbsp;&nbsp; 
            <br />
            新职称：<asp:TextBox ID="txtNewProf" runat="server"></asp:TextBox>
            <br />
            <asp:Button ID="btnSubmit" runat="server" OnClick="btnSubmit_Click" Text="修改" />
        </div>
    </form>
</body>
</html>
