using System;
using System.Data.SqlClient;

namespace EducationalAdministration.AdminModule.TeacherAdmin
{
    public partial class AltTeacher : System.Web.UI.Page
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
            string tno = txtNewTno.Text;
            string tname = txtNewTname.Text;
            string gender = ddlNewGender.SelectedValue;
            int age = Convert.ToInt32(txtNewAge.Text);
            string depart = ddlNewDepart.SelectedValue;
            string prof = txtNewProf.Text;
            if (tno.Length != 4 || tname.Length > 20 
                || (gender!="男" && gender!="女") || age < 0 || age > 150 
                || depart.Length != 3 || prof.Length > 10)
            {
                Response.Write("<script>alert('请输入正确的信息');</script>");
            }
            else
            {
                string sqlCom = "UPDATE teacher " +
                    "SET tno='" + tno + "', tname='" + tname + "', gender='" + gender + "', age=" + age + ", prof='" + prof + "', depart='" + depart + "' WHERE tno='" + ddlTeacher.SelectedValue + "';";
                OperateDataBase operate = new OperateDataBase();
                if (operate.ExceSql(sqlCom))
                {
                    Response.Write("<sCrIpT>alert(\"教师" + ddlTeacher.SelectedValue + "的信息修改成功\");</script>");
                    //Response.Redirect(".\\AltTeacher.aspx");
                }
                else
                {
                    Response.Write("<sCrIpT>alert(\"教师" + ddlTeacher.SelectedValue + "的信息修改失败\");</script>");
                }
            }
        }

        protected void ddlCourse_SelectedIndexChanged(object sender, EventArgs e)
        {
            string cmdsql = "SELECT * FROM teacher " +
                "where tno='" + ddlTeacher.SelectedValue + "';";
            OperateDataBase odb = new OperateDataBase();
            SqlDataReader myRead = odb.ExceRead(cmdsql);
            if (myRead.HasRows)
            {
                while (myRead.Read())
                {
                    lblOldTno.Text = myRead["tno"].ToString();
                    txtNewTno.Text = lblOldTno.Text;
                    lblOldTname.Text = myRead["tname"].ToString();
                    txtNewTname.Text = lblOldTname.Text;
                    lblOldGender.Text = myRead["gender"].ToString();
                    ddlNewGender.SelectedValue = lblOldGender.Text;
                    lblOldAge.Text = myRead["age"].ToString();
                    txtNewAge.Text = lblOldAge.Text;
                    lblOldDepart.Text = myRead["depart"].ToString();
                    ddlNewDepart.SelectedValue = lblOldDepart.Text;
                    lblOldProf.Text = myRead["prof"].ToString();
                    txtNewProf.Text = lblOldProf.Text;
                }
                myRead.Close();
            }
            else
            {
                Response.Write("<script>alert(\"查询失败\")</script>");
            }
        }

        protected void btnSelect_Click(object sender, EventArgs e)
        {
            string cmdsql = "SELECT t.*, d.name AS dname " +
                "FROM teacher t, department d " +
                "WHERE t.depart=d.no AND tno='" + ddlTeacher.SelectedValue + "';";
            OperateDataBase odb = new OperateDataBase();
            SqlDataReader myRead = odb.ExceRead(cmdsql);
            if (myRead.HasRows)
            {
                while (myRead.Read())
                {
                    lblOldTno.Text = myRead["tno"].ToString();
                    txtNewTno.Text = lblOldTno.Text;
                    lblOldTname.Text = myRead["tname"].ToString();
                    txtNewTname.Text = lblOldTname.Text;
                    lblOldGender.Text = myRead["gender"].ToString();
                    ddlNewGender.SelectedValue = lblOldGender.Text;
                    lblOldAge.Text = myRead["age"].ToString();
                    txtNewAge.Text = lblOldAge.Text;
                    lblOldDepart.Text = myRead["dname"].ToString();
                    ddlNewDepart.SelectedValue = myRead["depart"].ToString();
                    lblOldProf.Text = myRead["prof"].ToString();
                    txtNewProf.Text = lblOldProf.Text;
                }
                myRead.Close();
            }
            else
            {
                Response.Write("<script>alert(\"查询失败\")</script>");
            }
        }
    }
}