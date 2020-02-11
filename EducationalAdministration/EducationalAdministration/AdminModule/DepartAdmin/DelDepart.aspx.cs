using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace EducationalAdministration.AdminModule.DepartAdmin
{
    public partial class DelDepart : System.Web.UI.Page
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
            string no = ddlDno.SelectedValue;
            string sqlCom = "DELETE FROM department " +
                "WHERE no = '" + no + "'; ";
            OperateDataBase operate = new OperateDataBase();
            if (operate.ExceSql(sqlCom))
            {
                Response.Write("<sCrIpT>alert(\"部门已删除\");</script>");
            }
            else
            {
                Response.Write("<sCrIpT>alert(\"部门删除失败\");</script>");
            }
        }
    }
}