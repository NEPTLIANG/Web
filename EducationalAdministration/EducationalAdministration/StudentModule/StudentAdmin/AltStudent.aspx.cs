using System;
using System.Data.SqlClient;

namespace EducationalAdministration.StudentModule.StudentAdmin
{
    public partial class AltStudent : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["identity"] == null || Session["identity"].ToString() != "student")
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
            string oldPwd = txtOld.Text;
            string newPwd = txtNew.Text;
            string newPwd2 = txtNew2.Text;
            if (oldPwd.Length > 20 || newPwd.Length > 20)
            {
                Response.Write("<script>alert('密码长度不能超过20字符');</script>");
            }
            else if (newPwd != newPwd2)
            {
                Response.Write("<script>alert('两次输入的密码不一致');</script>");
            }
            else
            {
                string sqlCom = "UPDATE student SET spwd='" + newPwd + "' " +
                    "WHERE sno='" + Session["id"].ToString() + "';";
                OperateDataBase operate = new OperateDataBase();
                if (operate.ExceSql(sqlCom))
                {
                    Response.Write("<sCrIpT>alert(\"密码修改成功\");</script>");
                }
                else
                {
                    Response.Write("<sCrIpT>alert(\"密码修改失败\");</script>");
                }
            }
        }
    }
}