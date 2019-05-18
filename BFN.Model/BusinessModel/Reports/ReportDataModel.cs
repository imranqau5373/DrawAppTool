using BFN.Model.BusinessModel.Shop;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BFN.Model.BusinessModel.Reports
{
    public class ReportDataModel
    {

        public int Id { get; set; }

        public string ShopBFNNumber { get; set; }

        public string AdminTelePhoneNumber { get; set; }

        public string InagurationDate { get; set; }

        public string ContactPersonName { get; set; }

        public object ShopName { get; set; }
        public string ShopAddress { get; set; }

        public string ShopAddress2 { get; set; }

        public string CityPostCode { get; set; }
        public string OwnerEmail { get; set; }

        public string CategoryName { get; set; }

        public string MondayTimings { get; set; }

        public string TuesdayTimings { get; set; }

        public string WensdayTimings { get; set; }

        public string ThursdayTimings { get; set; }

        public string FridayTimings { get; set; }

        public string SaturdayTimings { get; set; }

        public string SundayTimings { get; set; }


        public string ContactPersonPhone { get; set; }

        public string ContactPersonAddress1 { get; set; }

        public string ContactPersonAddress2 { get; set; }

        public string ContactPersonCityPost { get; set; }

        public string TerminatinonDate { get; set; }

        public string shopHandoverDate { get; set; }

        public string LastUpdatedDate { get; set; }

        public string CompanyBankAccount1 { get; set; }

        public string CompanyBankAccount2 { get; set; }

        public string Gross { get; set; }

        public string ShopCARDEX { get; set; }

        public long CompanyCVR { get; set; }

        public string DailyNewsPaper { get; set; }
        public string Magazines { get; set; }
        public string Publisher { get; set; }
        public string ForeignNewspapers { get; set; }
        public string ForeignWeeklyMagazines { get; set; }
        public string ForeignPublishers { get; set; }
        public string NewsPaperDeliveryOptionId { get; set; }

        public string ExportDate { get; set; }


        public string TemplateDateFrom { get; set; }

        public string TemplateDateTo { get; set; }


        public Nullable<int> ShopEventId { get; set; }

        public int HistoryId { get; set; }




    }
}
