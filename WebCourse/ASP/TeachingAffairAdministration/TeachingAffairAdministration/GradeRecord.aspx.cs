using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace TeachingAffairAdministration
{
    public partial class GradeRecord : System.Web.UI.Page
    {
        private int sno;

        protected void Page_Load(object sender, EventArgs e)
        {
            SqlDataReader myRead = Main.myRead;
            if (myRead.HasRows && myRead.Read())
            {
                lblDepart.Text = Main.myRead["name"].ToString();
                lblMajor.Text = myRead["specialty"].ToString();
                lblName.Text = myRead["sname"].ToString();
                lblSno.Text = myRead["sno"].ToString();
                sno = Convert.ToInt32(myRead["sno"].ToString());
            }
            else
            {
                Main.myRead.Close();
                Response.Write("<script>" +
                    "alert(\"录入完成\");" +
                    "</script>");
            }
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            //int grade = int.Parse(txtGrade.Text);
            //try
            //{
                string grade = txtGrade.Text;
                if (int.Parse(grade) > 100 || int.Parse(grade) < 0)
                {
                    Response.Write("<script>" +
                    "alert(\"成绩超出范围\");" +
                    "</script>");
                    return;
                }
                string strSqlCom = "UPDATE score " +
                    "SET grade = '" + grade +
                    "' WHERE sno = '" + sno + "' AND cno = '08181060'";
                SqlCommand sqlcom = new SqlCommand(strSqlCom, Main.conForGradeRecord);
                sqlcom.ExecuteNonQuery();
                //Response.Write("<script> " +
                //    "alert(\"录入成功\");");
                //Main.myRead.Read();
            //}
            //catch
            //{
            //    Response.Write("<script>" +
            //        "alert(\"录入失败\");" +
            //        "</script>");
            //    return;
            //}
        }
    }
}