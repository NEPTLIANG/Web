using System;
using System.Data.SqlClient;

namespace EducationalAdministration.StudentModule.ScoreAdmin
{
    public partial class SeleScore : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["identity"] == null || Session["identity"].ToString() != "student")
            {
                Response.Redirect("../../404.aspx");
            }
            /*lblDno.Text = ddlDepart.SelectedValue;
            txtDno.Text = lblDno.Text;
            lblDname.Text = ddlDepart.Text;
            txtDname.Text = lblDname.Text;
            lblPcno.Text = ddlPcno.Text;
            lblTno.Text = ddlTno.Text;*/
        }

        protected void ddlDepart_SelectedIndexChanged(object sender, EventArgs e)
        {
            string cmdsql = "SELECT grade FROM score " +
                "WHERE sno='" + Session["id"].ToString() + "' and cno='" + ddlCourse.SelectedValue + "';";
            OperateDataBase odb = new OperateDataBase();
            SqlDataReader myRead = odb.ExceRead(cmdsql);
            if (myRead.HasRows)
            {
                while (myRead.Read())
                {
                    lblGrade.Text = myRead["grade"].ToString();
                }
                myRead.Close();
            }
            else
            {
                Response.Write("<script>alert(\"查询失败\")</script>");
            }
        }

        protected void btnSelect_Click(object sender, EventArgs e)
        {
            string cmdsql = "SELECT grade FROM score " +
                "WHERE sno='" + ddlStudent.SelectedValue + "' and cno='" + ddlCourse.SelectedValue + "';";
            OperateDataBase odb = new OperateDataBase();
            SqlDataReader myRead = odb.ExceRead(cmdsql);
            if (myRead.HasRows)
            {
                while (myRead.Read())
                {
                    lblGrade.Text = myRead["grade"].ToString();
                }
                myRead.Close();
            }
            else
            {
                Response.Write("<script>alert(\"查询失败\")</script>");
            }
        }
    }
}