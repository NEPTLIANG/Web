using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace EducationalAdministration.StudentModule.ScoreAdmin
{
    public partial class AddScore : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["identity"] == null || Session["identity"].ToString() != "student")
            {
                Response.Redirect("../../404.aspx");
            }
        }

        protected void btnSubmit_Click(object sender, EventArgs e)
        {
            string cno = ddlCourse.SelectedValue;
            string sno = Session["id"].ToString();
            int grade = -1;
            if (sno.Length != 10)
            {
                Response.Write("<script>alert('请输入正确的信息');</script>");
            }
            else
            {
                string sqlCom = "INSERT INTO score(sno, cno, grade) " +
                    "VALUES('" + sno + "', '" + cno + "', " + grade + "); ";
                OperateDataBase operate = new OperateDataBase();
                if (operate.ExceSql(sqlCom))
                {
                    Response.Write("<sCrIpT>alert(\"选课成功\");</script>");
                }
                else
                {
                    Response.Write("<sCrIpT>alert(\"选课失败\");</script>");
                }
            }
        }

        protected void btnClean_Click(object sender, EventArgs e) { }

        protected void btnCourse_Click(object sender, EventArgs e)
        {
            string cno = ddlCourse.SelectedValue;
        }
    }
}