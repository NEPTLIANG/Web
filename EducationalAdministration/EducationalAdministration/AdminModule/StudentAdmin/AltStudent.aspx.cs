using System;
using System.Data.SqlClient;

namespace EducationalAdministration.AdminModule.StudentAdmin
{
    public partial class AltStudent : System.Web.UI.Page
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
            string sno = txtNewSno.Text;
            string sname = txtNewSname.Text;
            string gender = ddlNewGender.SelectedValue;
            int age = Convert.ToInt32(txtNewAge.Text);
            string depart = ddlNewDepart.SelectedValue;
            string specialty = txtNewSpecialty.Text;
            if (sno.Length != 10 || sname.Length > 20 
                || (gender!="男" && gender!="女") || age < 0 || age > 150 
                || depart.Length != 3 || specialty.Length > 50)
            {
                Response.Write("<script>alert('请输入正确的信息');</script>");
            }
            else
            {
                string sqlCom = "UPDATE student " +
                    "SET sno='" + sno + "', sname='" + sname + "', gender='" + gender + "', age=" + age + ", depart='" + depart + "', specialty='" + specialty + "' WHERE sno='" + ddlStudent.SelectedValue + "';";
                OperateDataBase operate = new OperateDataBase();
                if (operate.ExceSql(sqlCom))
                {
                    Response.Write("<sCrIpT>alert(\"学生" + ddlStudent.SelectedValue + "的信息修改成功\");</script>");
                    //Response.Redirect(".\\AltStudent.aspx");
                }
                else
                {
                    Response.Write("<sCrIpT>alert(\"学生" + ddlStudent.SelectedValue + "的信息修改失败\");</script>");
                }
            }
        }

        protected void ddlCourse_SelectedIndexChanged(object sender, EventArgs e)
        {
            string cmdsql = "SELECT * FROM student " +
                "WHERE sno='" + ddlStudent.SelectedValue + "';";
            OperateDataBase odb = new OperateDataBase();
            SqlDataReader myRead = odb.ExceRead(cmdsql);
            if (myRead.HasRows)
            {
                while (myRead.Read())
                {
                    lblOldSno.Text = myRead["sno"].ToString();
                    txtNewSno.Text = lblOldSno.Text;
                    lblOldSname.Text = myRead["sname"].ToString();
                    txtNewSname.Text = lblOldSname.Text;
                    lblOldGender.Text = myRead["gender"].ToString();
                    ddlNewGender.SelectedValue = lblOldGender.Text;
                    lblOldAge.Text = myRead["age"].ToString();
                    txtNewAge.Text = lblOldAge.Text;
                    lblOldDepart.Text = myRead["depart"].ToString();
                    ddlNewDepart.SelectedValue = lblOldDepart.Text;
                    lblOldSpecialty.Text = myRead["specialty"].ToString();
                    txtNewSpecialty.Text = lblOldSpecialty.Text;
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
            string cmdsql = "SELECT s.*, d.name AS dname " +
                "FROM student s, department d " +
                "WHERE sno='" + ddlStudent.SelectedValue + "' and s.depart=d.no;";
            OperateDataBase odb = new OperateDataBase();
            SqlDataReader myRead = odb.ExceRead(cmdsql);
            if (myRead.HasRows)
            {
                while (myRead.Read())
                {
                    lblOldSno.Text = myRead["sno"].ToString();
                    txtNewSno.Text = lblOldSno.Text;
                    lblOldSname.Text = myRead["sname"].ToString();
                    txtNewSname.Text = lblOldSname.Text;
                    lblOldGender.Text = myRead["gender"].ToString();
                    ddlNewGender.SelectedValue = lblOldGender.Text;
                    lblOldAge.Text = myRead["age"].ToString();
                    txtNewAge.Text = lblOldAge.Text;
                    lblOldDepart.Text = myRead["dname"].ToString();
                    ddlNewDepart.SelectedValue = myRead["depart"].ToString();
                    lblOldSpecialty.Text = myRead["specialty"].ToString();
                    txtNewSpecialty.Text = lblOldSpecialty.Text;
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