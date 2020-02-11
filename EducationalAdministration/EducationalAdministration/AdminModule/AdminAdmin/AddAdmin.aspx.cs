using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace EducationalAdministration.AdminModule.AdminAdmin
{
    public partial class AddAdmin : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["identity"] == null || Session["identity"].ToString() != "admin")
            {
                Response.Redirect("../../404.aspx");
            }
        }

        protected void btnSubmit_Click(object sender, EventArgs e)
        {
            string id = txtId.Text;
            string pwd = txtPwd.Text;
            if (id.Length > 20 || pwd.Length > 20)
            {
                Response.Write("<script>alert('账号或密码长度不超过20字符');</script>");
            }
            else
            {
                string sqlCom = "INSERT admin(adminID, adminPwd) " +
                    "VALUES('" + id + "', '" + pwd + "');";
                OperateDataBase operate = new OperateDataBase();
                if (operate.ExceSql(sqlCom))
                {
                    Response.Write("<sCrIpT>alert(\"管理员" + id + "添加成功\");</script>");
                }
                else
                {
                    Response.Write("<sCrIpT>alert(\"管理员" + id + "添加失败\");</script>");
                }
            }
        }

        protected void btnClean_Click(object sender, EventArgs e)
        {
            txtId.Text = "";
            txtPwd.Text = "";
        }

        protected void txtId_TextChanged(object sender, EventArgs e)
        {
            txtPwd.Text = txtId.Text;
        }
    }
}