using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace TeachingAffairAdministration
{
    public partial class Main : System.Web.UI.Page
    {
        static string connectionString = "Server=.;uid=test;Pwd=test;DataBase=mytest1";
        //string connectionString = "server=.; DataBase=master;integrated security=SSPI";
        
        public static SqlConnection con = new SqlConnection(connectionString);
        public static SqlConnection conForGradeRecord = new SqlConnection(connectionString);
        public static SqlDataReader myRead;

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            con.Open();
            Main.conForGradeRecord.Open();
            /*if (con.State == System.Data.ConnectionState.Open) { Response.Write("成功"); con.Close(); }
            else { Response.Write("失败"); }*/
            string cmdsql = "SELECT * " +
                "FROM score JOIN (" +
                "student JOIN department " +
                "ON student.depart = department.no) " +
                "ON score.sno = student.sno " +
                "WHERE cno = '08181060'";
            SqlCommand com = new SqlCommand(cmdsql, con);
            myRead = com.ExecuteReader();
            Response.Redirect("GradeRecord.aspx");
        }
    }
}