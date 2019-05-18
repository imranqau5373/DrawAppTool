using BFN.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BFN.Web.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/BFNSite")]
    public class BfnSiteController : ApiController
    {
        [HttpPost]
        [Route("contactUs")]
        public IHttpActionResult ContactUs(ContactUsModel ContactMessage)
        {
            try
            {
                return Ok();
            }
            catch (Exception exp)
            {
                return BadRequest("Chain Data is not Valid.");
            }

        }
    }
}
