using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.Web;

namespace BFN.Service.Common
{
    public class CvrApi
    {
        public class ApiOwners
        {
            public string Name { get; set; }
        }
        public class ApipPoductionunits
        {
            public string Pno { get; set; }
            public string Name { get; set; }
            public string Address { get; set; }
            public string Zipcode { get; set; }
            public string City { get; set; }
            public bool @protected { get; set; }
            public string Phone { get; set; }
            public string Email { get; set; }
            public string Fax { get; set; }
            public string Startdate { get; set; }
            public string Enddate { get; set; }
            public string Employees { get; set; }
            public string Addressco { get; set; }
            public int Industrycode { get; set; }
            public string Industrydesc { get; set; }
            public int Companycode { get; set; }
            public string Companydesc { get; set; }
            public string Creditstartdate { get; set; }
            public int? Creditstatus { get; set; }
            public bool Creditbankrupt { get; set; }
        }
        public class CvrApiResult
        {
            public string VAT { get; set; }
            public string Name { get; set; }
            public string Address { get; set; }
            public string Zipcode { get; set; }
            public string City { get; set; }
            public bool @protected { get; set; }
            public string Phone { get; set; }
            public string Email { get; set; }
            public string Fax { get; set; }
            public string Startdate { get; set; }
            public string Enddate { get; set; }
            public string Employees { get; set; }
            public string Addressco { get; set; }
            public int Industrycode { get; set; }
            public string Industrydesc { get; set; }
            public int Companycode { get; set; }
            public string Companydesc { get; set; }
            public string Creditstartdate { get; set; }
            public int? Creditstatus { get; set; }
            public bool Creditbankrupt { get; set; }
            public ApiOwners[] Owners { get; set; }
            public ApipPoductionunits[] Productionunits { get; set; }
            public int T { get; set; }
            public int Version { get; set; }

        }
        public static CvrApiResult GetCompanyInfo(string name)
        {
            CvrApiResult res;
            using (var webClient = new WebClient())
            {
                webClient.Headers["User-Agent"] = "BFN";

                string resultContent = webClient.DownloadString(string.Format("http://cvrapi.dk/api?search={0}&country=dk", name));

                res = new System.Web.Script.Serialization.JavaScriptSerializer().Deserialize<CvrApiResult>(resultContent);
            }

            return res;
        }
    }
}
