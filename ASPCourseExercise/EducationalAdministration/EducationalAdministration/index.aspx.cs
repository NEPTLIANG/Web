﻿using System;
using System.Data;
using System.Data.SqlClient;

namespace EducationalAdministration
{
    public partial class index : System.Web.UI.Page
    {
        //protected SqlConnection
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void login_Click(object sender, EventArgs e)
        {
            string username = txtId.Text;
            string password = txtPwd.Text;
            if (username != "" && password != "")
            {
                if (rdlIdentity.SelectedValue == "Admin")
                {
                    string cmdsql = "SELECT adminPwd " +
                        "FROM admin " +
                        "WHERE adminID='" + username + "'";
                    OperateDataBase odb = new OperateDataBase();
                    SqlDataReader myRead = odb.ExceRead(cmdsql);
                    if (myRead.HasRows)
                    {
                        while (myRead.Read())
                        {
                            if (password == myRead["adminPwd"].ToString())
                            {
                                Session.Add("identity", "admin");
                                Session.Add("id", username);
                                Response.Redirect("AdminModule/Admin.aspx");
                            }
                            else
                            {
                                Response.Write("<script>alert(\"密码错误\")</script>");
                            }
                        }
                        myRead.Close();
                    }
                    else
                    {
                        Response.Write("<script>alert(\"未找到用户\")</script>");
                    }
                }
                if (rdlIdentity.SelectedValue == "Teacher")
                {
                    string cmdsql = "SELECT tpwd FROM teacher " +
                        "WHERE tno='" + username + "';";
                    OperateDataBase odb = new OperateDataBase();
                    SqlDataReader myRead = odb.ExceRead(cmdsql);
                    if (myRead.HasRows)
                    {
                        while (myRead.Read())
                        {
                            if (password == myRead["tpwd"].ToString())
                            {
                                Session.Add("identity", "teacher");
                                Session.Add("id", username);
                                Response.Redirect("TeacherModule/Teacher.aspx");
                            }
                            else
                            {
                                Response.Write("<script>alert(\"密码错误\")</script>");
                            }
                        }
                        myRead.Close();
                    }
                    else
                    {
                        Response.Write("<script>alert(\"未找到用户\")</script>");
                    }
                }
                if (rdlIdentity.SelectedValue == "Student")
                {
                    string cmdsql = "SELECT spwd FROM student " +
                        "WHERE sno='" + username + "';";
                    OperateDataBase odb = new OperateDataBase();
                    SqlDataReader myRead = odb.ExceRead(cmdsql);
                    if (myRead.HasRows)
                    {
                        while (myRead.Read())
                        {
                            if (password == myRead["spwd"].ToString())
                            {
                                Session.Add("identity", "student");
                                Session.Add("id", username);
                                Response.Redirect("StudentModule/Student.aspx");
                            }
                            else
                            {
                                Response.Write("<script>alert(\"密码错误\")</script>");
                            }
                        }
                        myRead.Close();
                    }
                    else
                    {
                        Response.Write("<script>alert(\"未找到用户\")</script>");
                    }
                }
            }
            else
            {
                Response.Write("<script>alert(\"请输入账户名和密码\")</script>");
            }
        }
    }

    public class OperateDataBase
    {
        protected SqlConnection conn;
        protected string constr;
        public OperateDataBase()
        {
            constr = "server=.; DataBase=EducationalAdministration; integrated security=SSPI";
        }
        private void Open()  //打开数据库连接
        {
            if (conn == null)
            {
                conn = new SqlConnection(constr);
                conn.Open();
            }
            else
            {
                if (conn.State.Equals(ConnectionState.Closed))
                {
                    conn.Open();
                }
            }
        }
        public void Close()  //关闭数据库连接
        {
            if (conn.State.Equals(ConnectionState.Open))
            {
                conn.Close();
            }
        }
        public bool ExceSql(string strSqlCom)  //执行SQL增删改语句
        {
            Open();
            SqlCommand sqlcom = new SqlCommand(strSqlCom, conn);
            try
            {
                sqlcom.ExecuteNonQuery();
                return true;
            }
            catch
            {
                return false;
            }
            finally { }
        }
        public SqlDataReader ExceRead(string sqlCom)  //执行SQL查询语句
        {
            Open();
            SqlCommand com = new SqlCommand(sqlCom, conn);
            SqlDataReader read = com.ExecuteReader();
            return read;
        }
    }
}