using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BFN.Model.BusinessModel.Shop
{
    public class OpeningHoursModel
    {
        public string MonStart { get; set; }
        public string MonEnd { get; set; }
        public string TueStart { get; set; }
        public string TueEnd { get; set; }
        public string WedStart { get; set; }
        public string WedEnd { get; set; }
        public string ThuStart { get; set; }
        public string ThuEnd { get; set; }
        public string FriStart { get; set; }
        public string FriEnd { get; set; }
        public string SatStart { get; set; }
        public string SatEnd { get; set; }
        public string SunStart { get; set; }
        public string SunEnd { get; set; }
        public int ShopId { get; set; }
        public int TemplateId { get; set; }
    }
}
