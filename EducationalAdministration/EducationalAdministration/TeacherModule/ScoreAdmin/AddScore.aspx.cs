using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace EducationalAdministration.TeacherModule.ScoreAdmin
{
    public partial class AddScore : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["identity"] == null || Session["identity"].ToString() != "teacher")
            {
                Response.Redirect("../../404.aspx");
            }
        }

        protected void btnSubmit_Click(object sender, EventArgs e)
        {
            string cno = ddlCourse.SelectedValue;
            string sno = txtSno.Text;
            int grade = Convert.ToInt32(txtGrade.Text);
            if (sno.Length != 10 || grade > 100 || grade < 0)
            {
                Response.Write("<script>alert('请输入正确的信息');</script>");
            }
            else
            {
                string sqlCom = "UPDATE score SET grade=" + grade +
                    " WHERE sno='" + sno + "' AND cno='" + cno + "';";
                OperateDataBase operate = new OperateDataBase();
                if (operate.ExceSql(sqlCom))
                {
                    Response.Write("<sCrIpT>alert(\"学生" + sno + "的成绩录入成功\");</script>");
                }
                else
                {
                    Response.Write("<sCrIpT>alert(\"学生" + sno + "的成绩录入失败\");</script>");
                }
            }
        }

        protected void btnClean_Click(object sender, EventArgs e)
        {
            txtSno.Text = "";
            txtGrade.Text = "";
        }

        protected void btnCourse_Click(object sender, EventArgs e)
        {
            string cno = ddlCourse.SelectedValue;
        }
    }
}