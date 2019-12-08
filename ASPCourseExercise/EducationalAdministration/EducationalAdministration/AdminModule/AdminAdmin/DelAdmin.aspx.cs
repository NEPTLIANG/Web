using System;

namespace EducationalAdministration.AdminModule.AdminAdmin
{
    public partial class DelAdmin : System.Web.UI.Page
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
            string sqlCom = "DELETE FROM admin " +
                "WHERE adminID='" + ddlAdmin.SelectedValue + "';";
            OperateDataBase operate = new OperateDataBase();
            if (operate.ExceSql(sqlCom))
            {
                Response.Write("<sCrIpT>alert(\"管理员账号已删除\");</script>");
                Response.Redirect(".\\DelAdmin.aspx");
            }
            else
            {
                Response.Write("<sCrIpT>alert(\"管理员账号删除失败\");</script>");
            }
        }
    }
}