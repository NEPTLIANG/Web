using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;  //MS SQL Server 7.0+的连接对象SqlConnection在System.Data.SqlClient里

namespace Experiment6
{
    public partial class zhuCe : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string connectionString = "Server=(local)\\SQLEXPRESS;User Id=test;Pwd=test;DataBase=master";  //设置SQL Server身份验证的连接字符串
            SqlConnection con = new SqlConnection(connectionString);  //创建SqlConnection对象，记得using System.Data.SqlClient
            con.Open();  //打开数据库的连接
            if ( con.State==System.Data.ConnectionState.Open )  //State是属性不是方法
            {
                Response.Write("SQL Server连接开启");
                con.Close();  //关闭数据库的连接
            }
            if ( con.State==System.Data.ConnectionState.Closed )
            {
                Response.Write("连接关闭");
            }
        }

        protected void btnDL_Click(object sender, EventArgs e)
        {
            Response.Redirect("DengLu.aspx");
        }

        protected void btnSubmit_Click(object sender, EventArgs e)
        {
            
        }
    }
}