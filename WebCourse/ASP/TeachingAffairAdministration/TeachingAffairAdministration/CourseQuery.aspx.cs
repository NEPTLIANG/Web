using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace TeachingAffairAdministration
{
    public partial class CourseQuery : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            SqlConnection con = new SqlConnection(SQLOperation.connectionString);
            SqlDataAdapter ada = new SqlDataAdapter("select * from")
        }
    }
}