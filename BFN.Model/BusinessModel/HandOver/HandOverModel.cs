using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace BFN.Model.BusinessModel.HandOver
{
    public class HandOverModel
    {
        public int Id { get; set; }
        public System.DateTime HandOverDate { get; set; }
        public Nullable<int> CurrentShopId { get; set; }
        public Nullable<int> CurrentCompanyId { get; set; }
        public int NextChainId { get; set; }
        public int NextCompanyId { get; set; }
        public string Status { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime LastUpdatedDate { get; set; }
        public string LastUpdatedBy { get; set; }

    }
}
