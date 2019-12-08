using System;
using System.Data.SqlClient;

namespace EducationalAdministration.TeacherModule.TeacherAdmin
{
    public partial class SeleTeacher : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["identity"] == null || Session["identity"].ToString() != "teacher")
            {
                Response.Redirect("../../404.aspx");
            }
            string cmdsql = "SELECT t.*, d.name " +
                "FROM teacher t, department d " +
                "where tno='" + Session["id"].ToString() + "' and t.depart = d.no;";
            OperateDataBase odb = new OperateDataBase();
            SqlDataReader myRead = odb.ExceRead(cmdsql);
            if (myRead.HasRows)
            {
                while (myRead.Read())
                {
                    lblTname.Text = myRead["tname"].ToString();
                    lblGender.Text = myRead["gender"].ToString();
                    lblDepart.Text = myRead["name"].ToString();
                    lblProf.Text = myRead["prof"].ToString();
                }
                myRead.Close();
            }
            else
            {
                Response.Write("<script>alert(\"查询失败\")</script>");
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
                "where tno='" + Session["id"].ToString() + "' and t.depart = d.no;";
            OperateDataBase odb = new OperateDataBase();
            SqlDataReader myRead = odb.ExceRead(cmdsql);
            if (myRead.HasRows)
            {
                while (myRead.Read())
                {
                    lblTname.Text = myRead["tname"].ToString();
                    lblGender.Text = myRead["gender"].ToString();
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
                "where tno='" + Session["id"].ToString() + "' and t.depart = d.no;";
            OperateDataBase odb = new OperateDataBase();
            SqlDataReader myRead = odb.ExceRead(cmdsql);
            if (myRead.HasRows)
            {
                while (myRead.Read())
                {
                    lblTname.Text = myRead["tname"].ToString();
                    lblGender.Text = myRead["gender"].ToString();
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