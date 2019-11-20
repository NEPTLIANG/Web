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

        }

        protected void btnDel_Click(object sender, EventArgs e)
        {
            string dno = ddlDno.SelectedValue;
            string sqlCom = "DELETE FROM department " +
                "WHERE dno = '" + dno + "'; ";
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