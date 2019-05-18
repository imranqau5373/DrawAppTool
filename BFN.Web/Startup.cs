using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(BFN.Web.Startup))]
namespace BFN.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
