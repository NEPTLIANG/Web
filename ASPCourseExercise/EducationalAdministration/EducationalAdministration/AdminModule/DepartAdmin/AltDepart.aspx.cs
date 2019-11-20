using System;
using System.Data.SqlClient;

namespace EducationalAdministration.AdminModule.DepartAdmin
{
    public partial class AltDepart : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            /*lblDno.Text = ddlCourse.SelectedValue;
            txtDno.Text = lblDno.Text;
            lblDname.Text = ddlCourse.Text;
            txtDname.Text = lblDname.Text;
            lblPcno.Text = ddlPcno.Text;
            lblTno.Text = ddlTno.Text;*/
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
                string sqlCom = "UPDATE department SET dno = '" + txtDno.Text + "', dname = '" + txtDname.Text + "', dean = '" + ddlDean.SelectedValue + "' WHERE dno = '" + ddlDepart.SelectedValue + "'; ";
                OperateDataBase operate = new OperateDataBase();
                if (operate.ExceSql(sqlCom))
                {
                    Response.Write("<sCrIpT>alert(\"部门" + dname + "添加成功\");</script>");
                    Response.Redirect(".\\AltDepart.aspx");
                }
                else
                {
                    Response.Write("<sCrIpT>alert(\"部门" + dname + "添加失败\");</script>");
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
                "WHERE dno='" + ddlDepart.SelectedValue + "';";
            OperateDataBase odb = new OperateDataBase();
            SqlDataReader myRead = odb.ExceRead(cmdsql);
            if (myRead.HasRows)
            {
                while (myRead.Read())
                {
                    lblDname.Text = myRead["dname"].ToString();
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
                    txtDname.Text = lblDname.Text;
                    if (myRead["dean"].ToString() != "        ")
                    {
                        ddlDean.SelectedValue = myRead["dean"].ToString();
                        lblDean.Text = ddlDean.Text;
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