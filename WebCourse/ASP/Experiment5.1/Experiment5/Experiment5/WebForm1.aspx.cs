using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Experiment5
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btnLogin_Click(object sender, EventArgs e)
        {
            string name = Request.Form["txtName"];
            string passwd = Request.Form["txtPasswd"];
            if (name == "江长者" && passwd == "+1s")
            {
                Response.Write("你输入的用户名是：" + name 
                    + "<br/>你输入的密码是：" + passwd
                    + "<br/>密码正确！");
            }
        }

        protected void btnReset_Click(object sender, EventArgs e)
        {
            txtName.Text = "";
            txtPasswd.Text = "";
        }
    }
}