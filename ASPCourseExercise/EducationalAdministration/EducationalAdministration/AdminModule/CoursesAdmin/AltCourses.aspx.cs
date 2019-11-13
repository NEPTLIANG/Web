using System;
using System.Data.SqlClient;

namespace EducationalAdministration.AdminModule.CoursesAdmin
{
    public partial class AltCourses : System.Web.UI.Page
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

        protected void btnSubmit_Click(object sender, EventArgs e)
        {
            string cno = txtCno.Text;
            string cname = txtCname.Text;
            string pcno = ddlPcno.SelectedValue;
            string tno = ddlTno.SelectedValue;
            if (cno.Length != 8 || cname.Length > 20 || pcno.Length != 8 || tno.Length != 4)
            {
                Response.Write("<script>alert('请输入正确的信息');</script>");
            }
            else
            {
                string sqlCom = "UPDATE course SET cno = '" + txtCno.Text + "', cname = '" + txtCname.Text + "', pcno = '" + ddlPcno.SelectedValue + "', tno = '" + ddlTno.SelectedValue + "' WHERE cno = '" + ddlCourse.SelectedValue + "'; ";
                OperateDataBase operate = new OperateDataBase();
                if (operate.ExceSql(sqlCom))
                {
                    Response.Write("<sCrIpT>alert(/课程" + cname + "添加成功/);</script>");
                    Response.Redirect(".\\AltCourses.aspx");
                }
                else
                {
                    Response.Write("<sCrIpT>alert(/课程" + cname + "添加失败/);</script>");
                }
            }
        }

        protected void ddlCourse_SelectedIndexChanged(object sender, EventArgs e)
        {
            lblCno.Text = ddlCourse.SelectedValue;
            txtCno.Text = lblCno.Text;
            lblCname.Text = ddlCourse.Text;
            txtCname.Text = lblCname.Text;
            lblPcno.Text = ddlPcno.Text;
            lblTno.Text = ddlTno.Text;
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
                    txtCname.Text = lblCname.Text;
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
            txtCno.Text = lblCno.Text;
            lblPcno.Text = ddlPcno.Text;
            lblTno.Text = ddlTno.Text;
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
                    txtCname.Text = lblCname.Text;
                    if (myRead["pcno"].ToString() != "        ")
                    {
                        ddlPcno.SelectedValue = myRead["pcno"].ToString();
                        lblPcno.Text = ddlPcno.Text;
                    }
                    else
                    {
                        lblPcno.Text = "无";
                    }
                    ddlTno.SelectedValue = myRead["tno"].ToString();
                    lblTno.Text = ddlTno.Text;
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