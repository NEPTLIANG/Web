<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="GradeRecord.aspx.cs" Inherits="TeachingAffairAdministration.GradeRecord" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <style>
        * {
            margin : 0 ;
            padding : 0 ;
        }
        body {
            font-size : 16px ;
        }
        .card {
            padding : 32px 64px ;
            margin : 128px auto ;
            width : 960px ;
            height : 270px ;
            position : relative ;
        }
        .h2 {
            margin : 16px 8px ;
        }
        .h3 {
            margin : 16px 8px ;
            font-size : 24px ;
        }
        .name {
            font-size : 64px ;
            margin : 16px 8px ;
        }
        .input {
            text-align : right ;
            bottom : 32px ;
            right : 64px ;
            position : absolute ;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <div class="card">
                <div class="h2">
                <asp:Label ID="lblDepart" runat="server" CssClass="h2" Text="信息工程学院"></asp:Label>
                <asp:Label ID="lblMajor" runat="server" Text="计算机科学与技术" CssClass="h2"></asp:Label>
                </div>
                <div class="name">
                <asp:Label ID="lblName" runat="server" CssClass="name" Text="黄仁勋"></asp:Label>
                </div>
                <div class="h3">
                <asp:Label ID="lblSno" runat="server" CssClass="h3" Text="2017333333"></asp:Label>
                </div>
                <div class="input">
                    <asp:Label ID="Label6" runat="server" Text="成绩："></asp:Label>
                    <br />
                    <br />
                    <asp:TextBox ID="txtGrade" runat="server"></asp:TextBox>
                    <br />
                    <br />
                    <asp:Button ID="Button1" runat="server" Text="提交" OnClick="Button1_Click" />
                </div>
            </div>
        </div>
    </form>
</body>
</html>
