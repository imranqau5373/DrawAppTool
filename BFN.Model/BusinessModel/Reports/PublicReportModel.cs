using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BFN.Model.BusinessModel.Reports
{
    public class PublicReportModel
    {

        public IEnumerable<ReportDataModel> ShopCreatedRecords { get; set; }

        public IEnumerable<ReportDataModel> ShopUpdatedRecords { get; set; }

        public IEnumerable<ReportDataModel> ShopRemovalRecords { get; set; }


        public IEnumerable<ReportDataModel> ShopHolidayRecords { get; set; }


        public IEnumerable<ReportDataModel> ShopReopeningRecords { get; set; }


        public IEnumerable<ReportDataModel> ShopOwnerShipRecords { get; set; }




    }
}
