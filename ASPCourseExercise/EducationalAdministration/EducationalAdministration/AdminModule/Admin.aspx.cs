using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace EducationalAdministration.AdminModule
{
    public partial class Admin : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["identity"] == null || Session["identity"].ToString() != "admin")
            {
                Response.Redirect("../404.aspx");
            }
        }

        protected void Menu1_MenuItemClick(object sender, MenuEventArgs e)
        {

        }
    }
}