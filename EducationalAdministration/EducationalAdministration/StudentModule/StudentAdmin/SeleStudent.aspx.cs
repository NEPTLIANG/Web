using System;
using System.Data.SqlClient;

namespace EducationalAdministration.StudentModule.StudentAdmin
{
    public partial class SeleStudent : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["identity"] == null || Session["identity"].ToString() != "student")
            {
                Response.Redirect("../../404.aspx");
            }
            string cmdsql = "SELECT s.*, d.name " +
                "FROM student s, department d " +
                "WHERE sno='" + Session["id"].ToString() + "' and s.depart=d.no;";
            OperateDataBase odb = new OperateDataBase();
            SqlDataReader myRead = odb.ExceRead(cmdsql);
            if (myRead.HasRows)
            {
                while (myRead.Read())
                {
                    lblSno.Text = myRead["sno"].ToString();
                    lblSname.Text = myRead["sname"].ToString();
                    lblGender.Text = myRead["gender"].ToString();
                    lblAge.Text = myRead["age"].ToString();
                    lblDepart.Text = myRead["name"].ToString();
                    lblSpecialst.Text = myRead["specialty"].ToString();
                }
                myRead.Close();
            }
            else
            {
                Response.Write("<script>alert(\"查询失败\")</script>");
            }
            /*lblDno.Text = ddlDepart.SelectedValue;
            txtDno.Text = lblDno.Text;
            lblDname.Text = ddlDepart.Text;
            txtDname.Text = lblDname.Text;
            lblPcno.Text = ddlPcno.Text;
            lblTno.Text = ddlTno.Text;*/
        }

        protected void ddlDepart_SelectedIndexChanged(object sender, EventArgs e)
        {
            string cmdsql = "SELECT s.*, d.name " +
                "FROM student s, department d " +
                "WHERE sno='" + Session["id"].ToString() + "' and s.depart=d.no;";
            OperateDataBase odb = new OperateDataBase();
            SqlDataReader myRead = odb.ExceRead(cmdsql);
            if (myRead.HasRows)
            {
                while (myRead.Read())
                {
                    lblSno.Text = myRead["sno"].ToString();
                    lblSname.Text = myRead["sname"].ToString();
                    lblGender.Text = myRead["gender"].ToString();
                    lblAge.Text = myRead["age"].ToString();
                    lblDepart.Text = myRead["name"].ToString();
                    lblSpecialst.Text = myRead["specialst"].ToString();
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
            string cmdsql = "SELECT s.*, d.name " +
                "FROM student s, department d " +
                "WHERE sno='" + Session["id"].ToString() + "' and s.depart=d.no;";
            OperateDataBase odb = new OperateDataBase();
            SqlDataReader myRead = odb.ExceRead(cmdsql);
            if (myRead.HasRows)
            {
                while (myRead.Read())
                {
                    lblSno.Text = myRead["sno"].ToString();
                    lblSname.Text = myRead["sname"].ToString();
                    lblGender.Text = myRead["gender"].ToString();
                    lblAge.Text = myRead["age"].ToString();
                    lblDepart.Text = myRead["name"].ToString();
                    lblSpecialst.Text = myRead["specialty"].ToString();
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