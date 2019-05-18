using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BFN.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            //if (String.IsNullOrEmpty(id))
            //{
            //    return View("Bfnsite");
            //}
            return View();
                
        }

        public ActionResult HomeIndex()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View("Bfnsite");
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Bfnsite()
        {
            return View();
        }
    }
}