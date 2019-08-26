using System;

namespace Experiment5._2
{
    public partial class Ouput : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            lblName.Text = Request.QueryString["name"];  //使用QueryString获得的查询字符串是指跟在URL后面的变量及值
            string method = Request.QueryString["method"];
            if ( method == "qrz" )
            {
                lblMethod.Text = "全日制";
            }
            if ( method == "zd" )
            {
                lblMethod.Text = "走读";
            }
            if ( method == "hs" )
            {
                lblMethod.Text = "函授";
            }
            if (Session["couresSession"] != null)
            {
                string coures = Session["couresSession"].ToString();
                Response.Write("hello");
                txtCoures.Text = coures;
            }
        }
    }
}