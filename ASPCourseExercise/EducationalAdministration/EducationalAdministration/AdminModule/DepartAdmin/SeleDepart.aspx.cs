using System;
using System.Data.SqlClient;

namespace EducationalAdministration.AdminModule.DepartAdmin
{
    public partial class SeleDepart : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            /*lblDno.Text = ddlDepart.SelectedValue;
            txtDno.Text = lblDno.Text;
            lblDname.Text = ddlDepart.Text;
            txtDname.Text = lblDname.Text;
            lblPcno.Text = ddlPcno.Text;
            lblTno.Text = ddlTno.Text;*/
        }

        protected void ddlDepart_SelectedIndexChanged(object sender, EventArgs e)
        {
            lblDno.Text = ddlDepart.SelectedValue;
            lblDname.Text = ddlDepart.Text;
            string cmdsql = "SELECT * " +
                "FROM department " +
                "WHERE dno='" + ddlDepart.SelectedValue + "';";
            OperateDataBase odb = new OperateDataBase();
            SqlDataReader myRead = odb.ExceRead(cmdsql);
            if (myRead.HasRows)
            {
                while (myRead.Read())
                {
                    lblDname.Text = myRead["dname"].ToString();
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
            string cmdsql = "SELECT * " +
                "FROM department " +
                "WHERE dno='" + ddlDepart.SelectedValue + "';";
            OperateDataBase odb = new OperateDataBase();
            SqlDataReader myRead = odb.ExceRead(cmdsql);
            if (myRead.HasRows)
            {
                while (myRead.Read())
                {
                    lblDname.Text = myRead["dname"].ToString();
                    if (myRead["dean"].ToString() != "        ")
                    {
                        lblDean.Text = myRead["dean"].ToString();
                    }
                    else
                    {
                        lblDean.Text = "无";
                    }
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