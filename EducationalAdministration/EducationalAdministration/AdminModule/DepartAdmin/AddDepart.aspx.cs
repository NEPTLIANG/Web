using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace EducationalAdministration.AdminModule.DepartAdmin
{
    public partial class AddDepart : System.Web.UI.Page
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
            string no = txtDno.Text;
            string name = txtDname.Text;
            string dean = ddlDean.SelectedValue;
            if (no.Length != 3 || name.Length > 20 || dean.Length != 4)
            {
                Response.Write("<script>alert('请输入正确的信息');</script>");
            }
            else
            {
                string sqlCom = "INSERT INTO department(no, name, dean) " +
                    "VALUES('" + no + "', '" + name + "', '" + dean + "'); ";
                OperateDataBase operate = new OperateDataBase();
                if (operate.ExceSql(sqlCom))
                {
                    Response.Write("<sCrIpT>alert(\"部门" + name + "添加成功\");</script>");
                }
                else
                {
                    Response.Write("<sCrIpT>alert(\"部门" + name + "添加失败\");</script>");
                }
            }
        }

        protected void btnClean_Click(object sender, EventArgs e)
        {
            txtDno.Text = "";
            txtDname.Text = "";
        }
    }
}