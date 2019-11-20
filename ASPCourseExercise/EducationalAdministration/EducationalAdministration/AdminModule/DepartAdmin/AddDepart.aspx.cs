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

        }

        protected void btnSubmit_Click(object sender, EventArgs e)
        {
            string dno = txtDno.Text;
            string dname = txtDname.Text;
            string dean = ddlDean.SelectedValue;
            if (dno.Length != 3 || dname.Length > 20 || dean.Length != 4)
            {
                Response.Write("<script>alert('请输入正确的信息');</script>");
            }
            else
            {
                string sqlCom = "INSERT INTO department(dno, dname, dean) " +
                    "VALUES('" + dno + "', '" + dname + "', '" + dean + "'); ";
                OperateDataBase operate = new OperateDataBase();
                if (operate.ExceSql(sqlCom))
                {
                    Response.Write("<sCrIpT>alert(\"部门" + dname + "添加成功\");</script>");
                }
                else
                {
                    Response.Write("<sCrIpT>alert(\"部门" + dname + "添加失败\");</script>");
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