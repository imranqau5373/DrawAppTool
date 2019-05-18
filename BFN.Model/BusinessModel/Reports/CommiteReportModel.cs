using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BFN.Model.BusinessModel.Reports
{
    public class CommiteReportModel
    {

        public int FK_InstallmentID { get; set; }

        public int CommiteId { get; set; }

        public int PaymentType { get; set; }
    }
}
