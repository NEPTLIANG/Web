using System;
using System.Data.SqlClient;

namespace EducationalAdministration.TeacherModule.DepartAdmin
{
    public partial class SeleDepart : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["identity"] == null || Session["identity"].ToString() != "teacher")
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
            lblDname.Text = ddlDepart.Text;
            string cmdsql = "SELECT * " +
                "FROM department " +
                "WHERE no='" + ddlDepart.SelectedValue + "';";
            OperateDataBase odb = new OperateDataBase();
            SqlDataReader myRead = odb.ExceRead(cmdsql);
            if (myRead.HasRows)
            {
                while (myRead.Read())
                {
                    lblDname.Text = myRead["name"].ToString();
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
            string cmdsql = "SELECT d.*, t.tname " +
                "FROM department d, teacher t " +
                "WHERE d.no='" + ddlDepart.SelectedValue + "' AND d.dean=t.tno;";
            OperateDataBase odb = new OperateDataBase();
            SqlDataReader myRead = odb.ExceRead(cmdsql);
            if (myRead.HasRows)
            {
                while (myRead.Read())
                {
                    lblDname.Text = myRead["name"].ToString();
                    lblDean.Text = myRead["tname"].ToString();
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