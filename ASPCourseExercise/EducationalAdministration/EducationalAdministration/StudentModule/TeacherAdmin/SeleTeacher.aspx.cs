using System;
using System.Data.SqlClient;

namespace EducationalAdministration.StudentModule.TeacherAdmin
{
    public partial class SeleTeacher : System.Web.UI.Page
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
            string cmdsql = "SELECT t.*, d.name " +
                "FROM teacher t, department d " +
                "where tno='" + ddlTeacher.SelectedValue + "' and t.depart = d.no;";
            OperateDataBase odb = new OperateDataBase();
            SqlDataReader myRead = odb.ExceRead(cmdsql);
            if (myRead.HasRows)
            {
                while (myRead.Read())
                {
                    lblTno.Text = myRead["tno"].ToString();
                    lblTname.Text = myRead["tname"].ToString();
                    lblGender.Text = myRead["gender"].ToString();
                    lblAge.Text = myRead["age"].ToString();
                    lblDepart.Text = myRead["name"].ToString();
                    lblProf.Text = myRead["prof"].ToString();
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
            string cmdsql = "SELECT t.*, d.name " +
                "FROM teacher t, department d " +
                "where tno='" + ddlTeacher.SelectedValue + "' and t.depart = d.no;";
            OperateDataBase odb = new OperateDataBase();
            SqlDataReader myRead = odb.ExceRead(cmdsql);
            if (myRead.HasRows)
            {
                while (myRead.Read())
                {
                    lblTno.Text = myRead["tno"].ToString();
                    lblTname.Text = myRead["tname"].ToString();
                    lblGender.Text = myRead["gender"].ToString();
                    lblAge.Text = myRead["age"].ToString();
                    lblDepart.Text = myRead["name"].ToString();
                    lblProf.Text = myRead["prof"].ToString();
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