using System;
using System.Data.SqlClient;

namespace EducationalAdministration.AdminModule.CoursesAdmin
{
    public partial class SeleCourses : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            /*lblCno.Text = ddlCourse.SelectedValue;
            txtCno.Text = lblCno.Text;
            lblCname.Text = ddlCourse.Text;
            txtCname.Text = lblCname.Text;
            lblPcno.Text = ddlPcno.Text;
            lblTno.Text = ddlTno.Text;*/
        }

        protected void ddlCourse_SelectedIndexChanged(object sender, EventArgs e)
        {
            lblCno.Text = ddlCourse.SelectedValue;
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
            lblCno.Text = ddlCourse.SelectedValue;
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
                    if (myRead["pcno"].ToString() != "        ")
                    {
                        lblPcno.Text = myRead["pcno"].ToString();
                    }
                    else
                    {
                        lblPcno.Text = "无";
                    }
                    lblTno.Text = myRead["tno"].ToString();
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