using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace EducationalAdministration.AdminModule.StudentAdmin
{
    public partial class AddStudent : System.Web.UI.Page
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
            string sno = txtSno.Text;
            string sname = txtSname.Text;
            string gender = ddlGender.SelectedValue;
            int age = Convert.ToInt32(txtAge.Text);
            string depart = ddlDepart.SelectedValue;
            string specialty = txtSpecialty.Text;
            if (sno.Length != 10 || sname.Length > 20 
                || (gender!="男" && gender!="女") || age < 0 || age > 150 
                || depart.Length != 3 || specialty.Length > 50)
            {
                Response.Write("<script>alert('请输入正确的信息');</script>");
            }
            else
            {
                string sqlCom = "INSERT INTO student(sno, sname, gender, age, depart, specialty, spwd) " +
                    "VALUES('" + sno + "', '" + sname + "', '" + gender + "', " + age + ", '" + depart + "', '" + specialty + "', '" + sno + "');";
                OperateDataBase operate = new OperateDataBase();
                if (operate.ExceSql(sqlCom))
                {
                    Response.Write("<sCrIpT>alert(\"学生" + sname + "添加成功\");</script>");
                }
                else
                {
                    Response.Write("<sCrIpT>alert(\"学生" + sname + "添加失败\");</script>");
                }
            }
        }

        protected void btnClean_Click(object sender, EventArgs e)
        {
            txtSno.Text = "";
            txtSname.Text = "";
            txtAge.Text = "";
            txtSpecialty.Text = "";
        }
    }
}