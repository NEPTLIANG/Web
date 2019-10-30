<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Admin.aspx.cs" Inherits="EducationalAdministration.Home" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            后台管理主页</div>
        <asp:Menu ID="Menu1" runat="server">
            <Items>
                <asp:MenuItem Text="课程信息管理" Value="课程信息管理">
                    <asp:MenuItem Text="增加课程信息" Value="增加课程信息"></asp:MenuItem>
                    <asp:MenuItem Text="删除课程信息" Value="删除课程信息"></asp:MenuItem>
                    <asp:MenuItem Text="修改课程信息" Value="修改课程信息"></asp:MenuItem>
                    <asp:MenuItem Text="查询课程信息" Value="查询课程信息"></asp:MenuItem>
                </asp:MenuItem>
                <asp:MenuItem Text="部门信息管理" Value="部门信息管理">
                    <asp:MenuItem Text="增加部门信息" Value="增加部门信息"></asp:MenuItem>
                    <asp:MenuItem Text="删除部门信息" Value="删除课程信息"></asp:MenuItem>
                    <asp:MenuItem Text="修改部门信息" Value="修改部门信息"></asp:MenuItem>
                    <asp:MenuItem Text="查询部门信息" Value="查询部门信息"></asp:MenuItem>
                </asp:MenuItem>
                <asp:MenuItem Text="选课信息管理" Value="选课信息管理">
                    <asp:MenuItem Text="增加选课信息" Value="增加选课信息"></asp:MenuItem>
                    <asp:MenuItem Text="删除选课信息" Value="删除选课信息"></asp:MenuItem>
                    <asp:MenuItem Text="修改选课信息" Value="修改选课信息"></asp:MenuItem>
                    <asp:MenuItem Text="查询选课信息" Value="查询选课信息"></asp:MenuItem>
                </asp:MenuItem>
                <asp:MenuItem Text="学生信息管理" Value="学生信息管理">
                    <asp:MenuItem Text="增加学生信息" Value="增加学生信息"></asp:MenuItem>
                    <asp:MenuItem Text="删除学生信息" Value="删除学生信息"></asp:MenuItem>
                    <asp:MenuItem Text="修改学生信息" Value="修改学生信息"></asp:MenuItem>
                    <asp:MenuItem Text="查询学生信息" Value="查询学生信息"></asp:MenuItem>
                </asp:MenuItem>
                <asp:MenuItem Text="教师信息管理" Value="教师信息管理">
                    <asp:MenuItem Text="增加教师信息" Value="增加教师信息"></asp:MenuItem>
                    <asp:MenuItem Text="删除教师信息" Value="删除教师信息"></asp:MenuItem>
                    <asp:MenuItem Text="修改教师信息" Value="修改教师信息"></asp:MenuItem>
                    <asp:MenuItem Text="查询教师信息" Value="查询教师信息"></asp:MenuItem>
                </asp:MenuItem>
                <asp:MenuItem Text="系统用户管理" Value="系统用户管理">
                    <asp:MenuItem Text="增加系统用户" Value="增加系统用户"></asp:MenuItem>
                    <asp:MenuItem Text="删除系统用户" Value="删除系统用户"></asp:MenuItem>
                    <asp:MenuItem Text="修改系统用户" Value="修改系统用户"></asp:MenuItem>
                    <asp:MenuItem Text="查询系统用户" Value="查询系统用户"></asp:MenuItem>
                </asp:MenuItem>
            </Items>
        </asp:Menu>
    </form>
</body>
</html>
