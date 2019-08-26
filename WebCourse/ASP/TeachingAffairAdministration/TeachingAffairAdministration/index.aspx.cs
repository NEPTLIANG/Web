using System;
using System.Data.SqlClient;  //要引用System.Data.SqlClient命名空间

namespace TeachingAffairAdministration
{
    public class SQLOperation  //数据库操作类
    {
        public static string userName = "test";  //SQL Server用户名
        public static string pwd = "test";  //SQL Server用户密码
        public static string connectionString = "Server=." +
            ";uid=" + userName +
            ";Pwd=" + pwd +
            ";DataBase=mytest1";  //拼接SQL Server身份验证的连接字符串
        //string connectionString = "server=.; DataBase=master;integrated security=SSPI";
    }

    public partial class Main : System.Web.UI.Page  //主页
    {
        public static SqlConnection con = new SqlConnection(SQLOperation.connectionString);  //针对连接字符串创建查询选了某科目的学生的连接对象
        public static SqlConnection conForGradeRecord = new SqlConnection(SQLOperation.connectionString);
        //第二次查询要先关闭第一次查询创建的连接，否则会产生异常：System.InvalidOperationException:“已有打开的与此 Command 相关联的 DataReader，必须首先将它关闭。”
        //所以干脆针对连接字符串再创建一个成绩录入用的连接对象
        public static SqlDataReader myRead;

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            con.Open();  //打开数据库连接
            conForGradeRecord.Open();  //打开数据库连接
            if (con.State == System.Data.ConnectionState.Closed || con == null)
            {
                Response.Write("<script>" +
                    "alert(\"连接失败\");" +
                    "</script>");
            }
            /*if (con.State == System.Data.ConnectionState.Open) { Response.Write("成功"); con.Close(); }
            else { Response.Write("失败"); }*/
            GradeRecord.isFirstLoad = true;  //标记成绩录入页面为首次加载
            GradeRecord.courseNo = "08181060";
            Response.Redirect("GradeRecord.aspx");  //转向成绩录入页面
        }
    }
}