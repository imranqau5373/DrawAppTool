using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BFN.Model.BusinessModel.Shop
{
    public class ContactPersonModel
    {
        public ContactPersonModel()
        {
        }

        public int Id { get; set; }
        public string ContactPersonName { get; set; }
        public string ContactPersonAddress { get; set; }
        public string ContactPersonEmail { get; set; }
        public string ContactPersonNumber { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<System.DateTime> LastUpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public string LastUpdatedBy { get; set; }

        public Nullable<int> ExpertiseId { get; set; }

        public string ContactPersonAddress2 { get; set; }
        public Nullable<int> ContactPersonPostCode { get; set; }
        public string ContactPersonCityName { get; set; }

        public string ExpertiesName { get; set; }
    }

}
