using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BFN.Model.BusinessModel
{
    public class PaymentView
    {

        public int Id { get; set; }
        public int FK_MemberId { get; set; }
        public int FK_InstallmentId { get; set; }
        public double PaidAmount { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> LastUpdatedDate { get; set; }
        public string LastUpdatedBy { get; set; }
        public string PaidDetails { get; set; }

        public int CommiteId { get; set; }
    }
}
