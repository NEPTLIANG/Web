using System;
using System.Data.SqlClient;

namespace EducationalAdministration.AdminModule.AdminAdmin
{
    public partial class AltAdmin : System.Web.UI.Page
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
            string id = txtId.Text;
            string pwd = txtPwd.Text;
            if (id.Length > 20 || pwd.Length > 20)
            {
                Response.Write("<script>alert('账号和密码长度不能超过20字符');</script>");
            }
            else
            {
                string sqlCom = "UPDATE admin " +
                    "SET adminID='" + id + "', adminPwd='" + pwd + "' WHERE adminID='" + ddlAdmin.SelectedValue + "';";
                OperateDataBase operate = new OperateDataBase();
                if (operate.ExceSql(sqlCom))
                {
                    Response.Write("<sCrIpT>alert(\"管理员" + ddlAdmin.SelectedValue + "的信息修改成功\");</script>");
                    Response.Redirect(".\\AltAdmin.aspx");
                }
                else
                {
                    Response.Write("<sCrIpT>alert(\"管理员" + ddlAdmin.SelectedValue + "的信息修改失败\");</script>");
                }
            }
        }
    }
}