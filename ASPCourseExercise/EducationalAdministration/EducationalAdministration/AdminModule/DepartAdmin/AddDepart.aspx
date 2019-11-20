<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AddDepart.aspx.cs" Inherits="EducationalAdministration.AdminModule.DepartAdmin.AddDepart" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            添加部门</div>
        <asp:Label ID="Label1" runat="server" Text="部门号"></asp:Label>
        <asp:TextBox ID="txtDno" runat="server"></asp:TextBox>
        <br />
        部门名称<asp:TextBox ID="txtDname" runat="server"></asp:TextBox>
        <br />
        部门院长<asp:DropDownList ID="ddlDean" runat="server" DataSourceID="SeleDean" DataTextField="tname" DataValueField="tno">
        </asp:DropDownList>
        <asp:SqlDataSource ID="SeleDean" runat="server" ConnectionString="Data Source=localhost;Initial Catalog=EducationalAdministration;Integrated Security=True" ProviderName="System.Data.SqlClient" SelectCommand="SELECT [tno], [tname] FROM [teacher]"></asp:SqlDataSource>
        <br />
        <asp:Button ID="btnSubmit" runat="server" Text="添加" OnClick="btnSubmit_Click" />
        <asp:Button ID="btnClean" runat="server" OnClick="btnClean_Click" Text="清空" />
    </form>
</body>
</html>
