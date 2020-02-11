using System;
using System.Data.SqlClient;

namespace EducationalAdministration.AdminModule.DepartAdmin
{
    public partial class AltDepart : System.Web.UI.Page
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
            string no = txtDno.Text;
            string name = txtDname.Text;
            string dean = ddlDean.SelectedValue;
            if (no.Length != 3 || name.Length > 20 || dean.Length != 4)
            {
                Response.Write("<script>alert('请输入正确的信息');</script>");
            }
            else
            {
                string sqlCom = "UPDATE department SET no = '" + txtDno.Text + "', name = '" + txtDname.Text + "', dean = '" + ddlDean.SelectedValue + "' WHERE no = '" + ddlDepart.SelectedValue + "'; ";
                OperateDataBase operate = new OperateDataBase();
                if (operate.ExceSql(sqlCom))
                {
                    Response.Write("<sCrIpT>alert(\"部门" + name + "添加成功\");</script>");
                    Response.Redirect(".\\AltDepart.aspx");
                }
                else
                {
                    Response.Write("<sCrIpT>alert(\"部门" + name + "添加失败\");</script>");
                }
            }
        }

        protected void ddlCourse_SelectedIndexChanged(object sender, EventArgs e)
        {
            lblDno.Text = ddlDepart.SelectedValue;
            txtDno.Text = lblDno.Text;
            lblDname.Text = ddlDepart.Text;
            txtDname.Text = lblDname.Text;
            lblDean.Text = ddlDean.Text;
            string cmdsql = "SELECT * " +
                "FROM department " +
                "WHERE no='" + ddlDepart.SelectedValue + "';";
            OperateDataBase odb = new OperateDataBase();
            SqlDataReader myRead = odb.ExceRead(cmdsql);
            if (myRead.HasRows)
            {
                while (myRead.Read())
                {
                    lblDname.Text = myRead["name"].ToString();
                    txtDname.Text = lblDname.Text;
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
            lblDno.Text = ddlDepart.SelectedValue;
            txtDno.Text = lblDno.Text;
            lblDean.Text = ddlDean.Text;
            string cmdsql = "SELECT d.*, t.tname " +
                "FROM department d, teacher t " +
                "WHERE d.no='" + ddlDepart.SelectedValue + "' AND d.dean=t.tno;";
            OperateDataBase odb = new OperateDataBase();
            SqlDataReader myRead = odb.ExceRead(cmdsql);
            if (myRead.HasRows)
            {
                while (myRead.Read())
                {
                    lblDname.Text = myRead["name"].ToString();
                    txtDname.Text = lblDname.Text;
                    ddlDean.SelectedValue = myRead["dean"].ToString();
                    lblDean.Text = myRead["tname"].ToString();
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