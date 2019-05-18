using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BFN.Model.BusinessModel.Reports
{
    public class ReportColumnHeading
    {

        public int Id { get; set; }
        public string ShopName { get { return "Shop Name"; } }
        public string ShopAddress { get; set; }
        public string ShopEAN { get; set; }
        public string ShopCARDEX { get; set; }


        public string CompanyName { get; set; }
        public System.DateTime CreatedDate { get; set; }

        public System.DateTime LastUpdatedDate { get; set; }

        public Nullable<System.DateTime> InagurationDate { get; set; }
        public Nullable<System.DateTime> TerminatinonDate { get; set; }

        public string Gross { get; set; }
        public string OwnerName { get; set; }
        public string OwnerEmail { get; set; }
        public string ShopAddress2 { get; set; }
        public Nullable<int> ShopPostCode { get; set; }
        public string ShopCityName { get; set; }


        public string ShopInformation { get; set; }
        public string ShopCodeLockInfo { get; set; }
        public string ShopBFNNumber { get; set; }
    }
}
