using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BFN.Model.BusinessModel.Shop
{
    public class ShopCompanyHandoverModel
    {

        public int Id { get; set; }
        public string ShopName { get; set; }
        public string ShopAddress { get; set; }
        public int CompanyId { get; set; }

        public int ChainId { get; set; }

        public string ShopBFNNumber { get; set; }

        public long CompanyCVR { get; set; }
        public string CompanyName { get; set; }

        public string CompanyAddress { get; set; }


        public string CurrentChainName { get; set; }

        public string FutureChainName { get; set; }
        public string CurrentCompanyName { get; set; }

        public System.DateTime HandOverDate { get; set; }

        public string HandOverDateFromView
        {
            get { return HandOverDate.Day + "-" + HandOverDate.ToString("MMM") + "-" + HandOverDate.Year; }
        }
        public int CurrentShopId { get; set; }

        public int CurrentCompanyId { get; set; }

        public int NextCompanyId { get; set; }

        public int NextChainId { get; set; }

        public int HandoverId { get; set; }

        public string futureCompanyName { get; set; }

    }
}
