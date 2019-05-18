using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BFN.Model.BusinessModel.Reports
{
    public class ReportSPView
    {

        public int Id { get; set; }
        public int ShopId { get; set; }
        public string ShopName { get; set; }
        public string ShopAddress { get; set; }
        public string ShopEAN { get; set; }
        public string ShopCARDEX { get; set; }
        public Nullable<int> ShopFrellationsNummerCategoryId { get; set; }
        public string ShopInformation { get; set; }
        public string ShopCodeLockInfo { get; set; }
        public string ShopBFNNumber { get; set; }
        public int CompanyId { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime LastUpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public string LastUpdatedBy { get; set; }
        public int PreviousShopId { get; set; }
        public bool IsLocked { get; set; }
        public Nullable<System.DateTime> InagurationDate { get; set; }
        public Nullable<System.DateTime> TerminatinonDate { get; set; }

        public Nullable<System.DateTime> HandOverDate { get; set; }
        public string Gross { get; set; }
        public string OwnerName { get; set; }
        public string OwnerEmail { get; set; }
        public string ShopAddress2 { get; set; }
        public Nullable<int> ShopPostCode { get; set; }
        public string ShopCityName { get; set; }
        public bool DailyNewsPaper { get; set; }
        public bool Magazines { get; set; }
        public bool Publisher { get; set; }
        public bool ForeignNewspapers { get; set; }
        public bool ForeignWeeklyMagazines { get; set; }
        public bool ForeignPublishers { get; set; }
        public Nullable<int> NewsPaperDeliveryOptionId { get; set; }
        public Nullable<int> ccif { get; set; }
        public Nullable<int> ShopEventId { get; set; }

        public string MondayTimings { get; set; }

        public string TuesdayTimings { get; set; }

        public string WensdayTimings { get; set; }

        public string ThursdayTimings { get; set; }

        public string FridayTimings { get; set; }

        public string SaturdayTimings { get; set; }

        public string SundayTimings { get; set; }


        public Nullable<System.DateTime> TemplateDateFrom { get; set; }

        public Nullable<System.DateTime> TemplateDateTo { get; set; }

        public string ContactPersonName { get; set; }
        public string ContactPersonAddress { get; set; }
        public string ContactPersonEmail { get; set; }
        public string ContactPersonNumber { get; set; }
        public string ContactPersonAddress2 { get; set; }
        public Nullable<int> ContactPersonPostCode { get; set; }
        public string ContactPersonCityName { get; set; }

        public long CompanyCVR { get; set; }
        public string CompanyAddress { get; set; }
        public string CompanyBankAccountNo { get; set; }



    }
}
