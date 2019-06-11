using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Experiment5._2
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btnSubmit_Click(object sender, EventArgs e)
        {
            string coures="";
            Response.Redirect("./Ouput.aspx"/*?name=" + txtName.Text
                + "&method=" + rdlMethod.SelectedValue*/);  //用URL传参
            foreach (ListItem i in cblCoures.Items)
            {
                if ( i.Selected )
                {
                    coures += i.Text;
                }
            }
            Session["couresSession"] = coures;
            //Response.Write(Session["couresSession"].ToString());
        }
    }
}