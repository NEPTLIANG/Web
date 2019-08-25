using System;
using System.Data.SqlClient;

namespace TeachingAffairAdministration
{
    public partial class GradeRecord : System.Web.UI.Page  //成绩录入页面
    {
        private string sno;  //学号
        public static string courseNo;
        public static bool isFirstLoad;  //标记成绩录入页面是否是首次加载
        public static bool isFirstStudent;
        private static string connectionString = SQLOperation.connectionString;
        private SqlConnection con = new SqlConnection(connectionString);
        private SqlCommand com;
        private static SqlDataReader myRead;
        private static SqlDataReader myReadForSubmit;

        protected void Page_Load(object sender, EventArgs e)
        {
            con.Open();
            //string a = DropDownList1.SelectedValue;
            //Response.Write(a);
            //SqlDataReader myRead = Main.myRead;  //获取跳转过来前创建的DataReader对象
            if (isFirstLoad)  //若为初次加载，则先读取一行以将学生信息显示于页面上，否则等到点击确定后再读取信息以便出现异常时回退
            {
                /*try
                {
                    sno = Convert.ToInt32(myRead["sno"].ToString());
                }
                catch (System.InvalidOperationException tmp) { }*/
                //courseNo = "08181060";
                string cmdsql = "SELECT * " +
                    "FROM score JOIN (" +
                    "student JOIN department " +
                    "ON student.depart = department.no) " +
                    "ON score.sno = student.sno " +
                    "WHERE cno = '" + courseNo + "'";  //拼接查询选了某门课的学生列表的SQL语句
                com = new SqlCommand(cmdsql, con);  //针对对应的语句和连接创建命令对象
                myRead = com.ExecuteReader();  //执行查询命令并创建DataReader对象
                DropDownList1.Items.Add("高级语言程序设计    "); DropDownList1.Items.Add("数据结构            ");
                DropDownList1.Items.Add("数据库原理          "); DropDownList1.Items.Add("数据库课程设计      ");
                DropDownList1.Items.Add("大型数据库设计      "); DropDownList1.Items.Add("C#程序设计          ");
                DropDownList1.Items.Add("软件测试设计        "); DropDownList1.Items.Add("算法分析与设计      ");
                if (myRead.HasRows && myRead.Read())  //若结果中有下一行，则读取一行学生信息并显示在页面上，否则关闭DataReader、弹框提示输入完成并回到主页
                {
                    lblDepart.Text = myRead["name"].ToString();
                    lblMajor.Text = myRead["specialty"].ToString();
                    lblName.Text = myRead["sname"].ToString();
                    lblSno.Text = myRead["sno"].ToString();
                }
                else
                {
                    myRead.Close();
                    Response.Write("<script>" +
                        "alert(\"录入完成\");" +
                        "</script>");
                    Response.Redirect("indexer.aspx");
                }
                isFirstLoad = false;  //首次加载完后设置标记为false
                //myRead.Close();
            }
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            //int grade = int.Parse(txtGrade.Text);
            //SqlDataReader myRead = Main.myRead;  //获取跳转过来前创建的DataReader对象
            try
            {
                string grade = txtGrade.Text;  //获取输入的成绩
                if (int.Parse(grade) > 100 || int.Parse(grade) < 0)  //判断成绩是否超出范围
                {
                    Response.Write("<script>" +
                    "alert(\"成绩超出范围\");" +
                    "</script>");
                    //flag = false;
                    return;  //中止输入
                }
                if (Main.conForGradeRecord.State == System.Data.ConnectionState.Closed)
                {
                    Main.conForGradeRecord.Open();
                }
                if (isFirstStudent)
                {
                    string cmdsql2 = "SELECT * " +
                   "FROM score JOIN (" +
                   "student JOIN department " +
                   "ON student.depart = department.no) " +
                   "ON score.sno = student.sno " +
                   "WHERE cno = '" + courseNo + "'";  //拼接查询选了某门课的学生列表的SQL语句
                    SqlCommand com2 = new SqlCommand(cmdsql2, Main.conForGradeRecord);  //针对对应的语句和连接创建命令对象
                    myRead = com2.ExecuteReader();  //执行查询命令并创建DataReader对象
                    isFirstStudent = false;
                }
                string cmdsql3 = "SELECT * " +
               "FROM score JOIN (" +
               "student JOIN department " +
               "ON student.depart = department.no) " +
               "ON score.sno = student.sno " +
               "WHERE cno = '" + courseNo + "'";  //拼接查询选了某门课的学生列表的SQL语句
                SqlConnection con3 = new SqlConnection(SQLOperation.connectionString);
                SqlCommand com3 = new SqlCommand(cmdsql3, con3);  //针对对应的语句和连接创建命令对象
                con3.Open();
                myReadForSubmit = com3.ExecuteReader();
                if (myRead.HasRows && myRead.Read())
                {
                    sno = myRead["sno"].ToString();  //获取当前学生的学号
                    myReadForSubmit.Read();
                }
                //myRead.Close();

                string strSqlCom = "UPDATE score " +
                    "SET grade = '" + grade +
                    "' WHERE sno = '" + sno + "' AND cno = '" + courseNo + "'";  //拼接修改成绩的SQL语句
                SqlCommand sqlcom = new SqlCommand(strSqlCom, Main.conForGradeRecord);
                if (Main.conForGradeRecord.State == System.Data.ConnectionState.Closed)
                {
                    Main.conForGradeRecord.Open();
                }
                sqlcom.ExecuteNonQuery();  //执行修改
                //flag = true;
                //Response.Write("<script> " +
                //    "alert(\"录入成功\");");
            }
            catch (System.FormatException tmp)  //捕获输入的字符串格式异常
            {
                Response.Write("<script>" +
                    "alert(\"录入失败，错误信息：" + tmp.Message + "\");" +
                    "</script>");
                //flag = false;
                return;  //中止输入
            }
            //string cmdsql = "SELECT * " +
            //   "FROM score JOIN (" +
            //   "student JOIN department " +
            //   "ON student.depart = department.no) " +
            //   "ON score.sno = student.sno " +
            //   "WHERE cno = '" + courseNo + "'";  //拼接查询选了某门课的学生列表的SQL语句
            //SqlCommand com = new SqlCommand(cmdsql, Main.conForGradeRecord);  //针对对应的语句和连接创建命令对象
            //myRead = com.ExecuteReader();  //执行查询命令并创建DataReader对象
            //if (Main.conForGradeRecord.State == System.Data.ConnectionState.Closed)
            //{
            //    Main.conForGradeRecord.Open();
            //}
            if (myReadForSubmit.HasRows && myReadForSubmit.Read())  //显示学生信息
            {
                lblDepart.Text = myReadForSubmit["name"].ToString();
                lblMajor.Text = myReadForSubmit["specialty"].ToString();
                lblName.Text = myReadForSubmit["sname"].ToString();
                lblSno.Text = myReadForSubmit["sno"].ToString();
            }
            else  //结束录入
            {
                myRead.Close();
                Response.Write("<script>" +
                    "alert(\"录入完成\");" +
                    "</script>");
                Response.Redirect("index.aspx");
            }
        }

        protected void DropDownList1_SelectedIndexChanged(object sender, EventArgs e)
        {
            string courseName = DropDownList1.SelectedValue;
            //con.Open();
            if (con.State == System.Data.ConnectionState.Closed || con == null)
            {
                Response.Write("<script>" +
                    "alert(\"连接失败\");" +
                    "</script>");
            }
            if (Main.conForGradeRecord.State == System.Data.ConnectionState.Closed)
            {
                Main.conForGradeRecord.Open();
            }
            string strSqlCom = "SELECT cno, cname FROM course";
            SqlCommand sqlcom = new SqlCommand(strSqlCom, Main.conForGradeRecord);
            SqlDataReader read = sqlcom.ExecuteReader();
            while (read.Read())
            {
                if (read["cname"].ToString() == courseName)
                {
                    courseNo = read["cno"].ToString();
                    break;
                }
            }
            read.Close();
            string cmdsql = "SELECT * " +
                "FROM score JOIN (" +
                "student JOIN department " +
                "ON student.depart = department.no) " +
                "ON score.sno = student.sno " +
                "WHERE cno = '" + courseNo + "'";  //拼接查询选了某门课的学生列表的SQL语句
            SqlCommand com = new SqlCommand(cmdsql, Main.conForGradeRecord);  //针对对应的语句和连接创建命令对象
            myRead = com.ExecuteReader();  //执行查询命令并创建DataReader对象
            //Response.Redirect(Request.Url.ToString());
            if (myRead.HasRows && myRead.Read())  //若结果中有下一行，则读取一行学生信息并显示在页面上，否则关闭DataReader、弹框提示输入完成并回到主页
            {
                lblDepart.Text = myRead["name"].ToString();
                lblMajor.Text = myRead["specialty"].ToString();
                lblName.Text = myRead["sname"].ToString();
                lblSno.Text = myRead["sno"].ToString();
            }
            else
            {
                myRead.Close();
                Response.Write("<script>" +
                    "alert(\"录入完成\");" +
                    "</script>");
                Response.Redirect("indexer.aspx");
            }
            Main.conForGradeRecord.Close();
            isFirstStudent = true;
        }
    }
}