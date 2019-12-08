using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace EducationalAdministration.AdminModule.TeacherAdmin
{
    public partial class AddTeacher : System.Web.UI.Page
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
            string tno = txtTno.Text;
            string tname = txtTname.Text;
            string gender = ddlGender.SelectedValue;
            int age = Convert.ToInt32(txtAge.Text);
            string depart = ddlDepart.SelectedValue;
            string prof = txtProf.Text;
            if (tno.Length != 4 || tname.Length > 20 
                || (gender!="男" && gender!="女") || age < 0 || age > 150 
                || depart.Length != 3 || prof.Length > 10)
            {
                Response.Write("<script>alert('请输入正确的信息');</script>");
            }
            else
            {
                string sqlCom = "INSERT teacher(tno, tname, gender, age, prof, depart, tpwd) " +
                    "VALUES('" + tno + "', '" + tname + "', '" + gender + "', " + age + ", '" + prof + "', '" + depart + "', '" + tno + "');";
                OperateDataBase operate = new OperateDataBase();
                if (operate.ExceSql(sqlCom))
                {
                    Response.Write("<sCrIpT>alert(\"教师" + tname + "添加成功\");</script>");
                }
                else
                {
                    Response.Write("<sCrIpT>alert(\"教师" + tname + "添加失败\");</script>");
                }
            }
        }

        protected void btnClean_Click(object sender, EventArgs e)
        {
            txtTno.Text = "";
            txtTname.Text = "";
            txtAge.Text = "";
            txtProf.Text = "";
        }
    }
}