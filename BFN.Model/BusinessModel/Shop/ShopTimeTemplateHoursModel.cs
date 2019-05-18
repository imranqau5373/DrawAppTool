using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BFN.Model.BusinessModel.Shop
{
    public class ShopTimeTemplateHoursModel
    {
        public int Id { get; set; }
        public int TemplateId { get; set; }
        public string Day { get; set; }
        public System.TimeSpan OpenTime { get; set; }
        public System.TimeSpan CloseTime { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime LastUpdatedDate { get; set; }

        public virtual ShopTimeTemplate ShopTimeTemplate { get; set; }
    }
}
