using System;
using System.Data.SqlClient;

namespace EducationalAdministration.StudentModule.CoursesAdmin
{
    public partial class SeleCourses : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["identity"] == null || Session["identity"].ToString() != "student")
            {
                Response.Redirect("../../404.aspx");
            }
            /*lblCno.Text = ddlCourse.SelectedValue;
            txtCno.Text = lblCno.Text;
            lblCname.Text = ddlCourse.Text;
            txtCname.Text = lblCname.Text;
            lblPcno.Text = ddlPcno.Text;
            lblTno.Text = ddlTno.Text;*/
        }

        protected void ddlCourse_SelectedIndexChanged(object sender, EventArgs e)
        {
            lblCname.Text = ddlCourse.Text;
            string cmdsql = "SELECT * " +
                "FROM course " +
                "WHERE cno='" + ddlCourse.SelectedValue + "';";
            OperateDataBase odb = new OperateDataBase();
            SqlDataReader myRead = odb.ExceRead(cmdsql);
            if (myRead.HasRows)
            {
                while (myRead.Read())
                {
                    lblCname.Text = myRead["cname"].ToString();
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
            string cmdsql = "SELECT c1.*, c2.cname AS pcname, t.tname " +
                "FROM course c1 LEFT JOIN course c2 ON c1.pcno=c2.cno , teacher t " +
                "WHERE t.tno=c1.tno and c1.cno='" + ddlCourse.SelectedValue + "';";
            OperateDataBase odb = new OperateDataBase();
            SqlDataReader myRead = odb.ExceRead(cmdsql);
            if (myRead.HasRows)
            {
                while (myRead.Read())
                {
                    lblCname.Text = myRead["cname"].ToString();
                    if (myRead["pcno"].ToString() != "        ")
                    {
                        lblPcno.Text = myRead["pcname"].ToString();
                    }
                    else
                    {
                        lblPcno.Text = "无";
                    }
                    lblTno.Text = myRead["tname"].ToString();
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