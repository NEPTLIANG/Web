using System;
using System.Data.SqlClient;

namespace EducationalAdministration.AdminModule.ScoreAdmin
{
    public partial class AltScore : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["identity"] == null || Session["identity"].ToString() != "admin")
            {
                Response.Redirect("../../404.aspx");
            }
            /*lblDno.Text = ddlCourse.SelectedValue;
            txtDno.Text = lblDno.Text;
            lblDname.Text = ddlCourse.Text;
            txtDname.Text = lblDname.Text;
            lblPcno.Text = ddlPcno.Text;
            lblTno.Text = ddlTno.Text;*/
        }

        protected void btnSubmit_Click(object sender, EventArgs e)
        {
            int grade = Convert.ToInt32(txtNewGrade.Text);
            if (grade < 0 || grade > 100)
            {
                Response.Write("<script>alert('请输入正确的成绩');</script>");
            }
            else
            {
                string sqlCom = "UPDATE score " +
                    "SET grade=" + txtNewGrade.Text + " " +
                    "WHERE sno='" + ddlStudent.SelectedValue + "' and cno='" + ddlCourse.SelectedValue + "';";
                OperateDataBase operate = new OperateDataBase();
                if (operate.ExceSql(sqlCom))
                {
                    Response.Write("<sCrIpT>alert(\"学生" + ddlStudent.SelectedValue + "的成绩修改成功\");</script>");
                    //Response.Redirect(".\\AltScore.aspx");
                }
                else
                {
                    Response.Write("<sCrIpT>alert(\"学生" + ddlStudent.SelectedValue + "的成绩修改失败\");</script>");
                }
            }
        }

        protected void ddlCourse_SelectedIndexChanged(object sender, EventArgs e)
        {
            string cmdsql = "SELECT grade FROM score " +
                "WHERE sno='" + ddlStudent.SelectedValue + "' and cno='" + ddlCourse.SelectedValue + "';";
            OperateDataBase odb = new OperateDataBase();
            SqlDataReader myRead = odb.ExceRead(cmdsql);
            if (myRead.HasRows)
            {
                while (myRead.Read())
                {
                    lblOldGrade.Text = myRead["grade"].ToString();
                    txtNewGrade.Text = lblOldGrade.Text;
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
                    lblOldGrade.Text = myRead["grade"].ToString();
                    txtNewGrade.Text = lblOldGrade.Text;
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