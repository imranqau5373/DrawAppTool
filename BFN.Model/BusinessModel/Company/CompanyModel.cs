using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace BFN.Model.BusinessModel.Company
{
    public class CompanyModel 
    {

        public CompanyModel()
        {
            //this.Shops = new HashSet<Shop>();
        }

        public int Id { get; set; }

        [Required]
        public long CompanyCVR { get; set; }
        [Required]
        public string CompanyName { get; set; }
        [Required]
        public string CompanyAddress { get; set; }

        public string CompanyAddressView { get; set; }

        public string CompanyAddress2 { get; set; }
        public Nullable<int> CompanyPostCode { get; set; }
        public string CompanyCityName { get; set; }
        public string CompanyBankAccountNo { get; set; }
        //[Required]
        public string CompanyEmail { get; set; }

        public string OwnerName { get; set; }

        public Nullable<bool> BankAccountConsent { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<System.DateTime> LastUpdatedDate { get; set; }
        public Nullable<int> Dealer { get; set; }
        [Required]
        public int ParentId { get; set; }
        [Required]
        public bool IsChain { get; set; }
        [Required]
        public bool IsActive { get; set; }

        public bool IsParentActive { get; set; }
        [Required]
        public string LastUpdatedBy { get; set; }

        public bool ParentChain { get; set; }

        public bool isHandover { get; set; }

        public string ChainName { get; set; }

        public int TotalCompanies { get; set; }

        public List<int> CompaniesIds { get; set; }

        public int TotalShops { get; set; }

        //public virtual ICollection<Shop> Shops { get; set; }

        public virtual ICollection<BFN.Model.Company> Companies { get; set; }

        public virtual ICollection<BFN.Model.Shop> Shops { get; set; }

        public virtual ICollection<BFN.Model.AspNetUser> Users { get; set; }




    }
}
