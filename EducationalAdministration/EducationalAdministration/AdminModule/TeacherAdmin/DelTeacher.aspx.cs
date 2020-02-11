using System;

namespace EducationalAdministration.AdminModule.TeacherAdmin
{
    public partial class DelTeacher : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["identity"] == null || Session["identity"].ToString() != "admin")
            {
                Response.Redirect("../../404.aspx");
            }
        }

        protected void btnDel_Click(object sender, EventArgs e)
        {
            string sqlCom = "DELETE FROM teacher " +
                "WHERE tno='" + ddlTeacher.SelectedValue + "';";
            OperateDataBase operate = new OperateDataBase();
            if (operate.ExceSql(sqlCom))
            {
                Response.Write("<sCrIpT>alert(\"成绩记录已删除\");</script>");
            }
            else
            {
                Response.Write("<sCrIpT>alert(\"成绩记录删除失败\");</script>");
            }
        }
    }
}