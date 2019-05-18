using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BFN.Model.BusinessModel.Company
{
    public class CompanyAdminModel
    {

        public string Id { get; set; }
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Name { get; set; }

        public string UserName { get; set; }
        public string Address { get; set; }
        public string ExpertiseName { get; set; }
        public string RoleName { get; set; }

        public string AssignedId { get; set; }


        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<System.DateTime> LastUpdatedDate { get; set; }
        public string LastUpdatedBy { get; set; }
        public string RoleId { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<int> ExpertiseId { get; set; }

        public string Address2 { get; set; }
        public Nullable<int> PostCode { get; set; }
        public string CityName { get; set; }
    }
}
