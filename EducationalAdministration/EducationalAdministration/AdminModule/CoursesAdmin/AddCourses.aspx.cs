using System;

namespace EducationalAdministration.AdminModule.CoursesAdmin
{
    public partial class AddCourses : System.Web.UI.Page
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
            string cno = txtCno.Text;
            string cname = txtCname.Text;
            string pcno = ddlPcno.SelectedValue;
            string tno = ddlTno.SelectedValue;
            if (cno.Length != 8 || cname.Length > 20 || pcno.Length != 8 || tno.Length != 4)
            {
                Response.Write("<script>alert('请输入正确的信息');</script>");
            }
            else
            {
                string sqlCom = "INSERT INTO course(cno, cname, pcno, tno) " +
                    "VALUES('" + cno + "', '" + cname + "', '" + pcno + "', '" + tno + "'); ";
                OperateDataBase operate = new OperateDataBase();
                if (operate.ExceSql(sqlCom))
                {
                    Response.Write("<sCrIpT>alert(/课程" + cname + "添加成功/);</script>");
                }
                else
                {
                    Response.Write("<sCrIpT>alert(/课程" + cname + "添加失败/);</script>");
                }
            }
        }

        protected void btnClean_Click(object sender, EventArgs e)
        {
            txtCno.Text = "";
            txtCname.Text = "";
        }
    }
}