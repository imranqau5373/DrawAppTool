using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BFN.Model.BusinessModel.Shop
{
    public class ShopTimeTemplateModel
    {
        public int Id { get; set; }
        public string TemplateName { get; set; }
        public string TemplateDescription { get; set; }
        public System.DateTime TemplateDateFrom { get; set;  }

        public string TemplateDateFromString { get; set; }
        public string TemplateDateFromView {
            get { return TemplateDateFrom.Day + " "+ TemplateDateFrom.ToString("MMM"); }
        }
        public System.DateTime TemplateDateTo { get; set; }

        public string TemplateDateToString { get; set; }
        public string TemplateDateToView {
            get { return TemplateDateTo.Day +" "+ TemplateDateTo.ToString("MMM"); }
        }
        public int ShopId { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime LastUpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public string LastUpdatedBy { get; set; }

        public bool? IsDefault { get; set; }

        public bool? IsHoliday { get; set; }
    }
}
