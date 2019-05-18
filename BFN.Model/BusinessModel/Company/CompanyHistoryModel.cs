using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BFN.Model.BusinessModel.Company
{
    public class CompanyHistoryModel
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public long CompanyCVR { get; set; }
        public string CompanyAddress { get; set; }
        public string CompanyBankAccountNo { get; set; }
        public string CompanyEmail { get; set; }
        public Nullable<bool> BankAccountConsent { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<System.DateTime> LastUpdatedDate { get; set; }
        public Nullable<int> Dealer { get; set; }
        public int ParentId { get; set; }
        public bool IsChain { get; set; }
        public bool IsActive { get; set; }
        public string LastUpdatedBy { get; set; }
        public string OwnerName { get; set; }
        public string CompanyAddress2 { get; set; }
        public Nullable<int> CompanyPostCode { get; set; }
        public string CompanyCityName { get; set; }

    }
}
