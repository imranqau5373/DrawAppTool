using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BFN.Model.BusinessModel.Company
{
    public class ChainAdminModel
    {
        public string Id { get; set; }

        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        public string RoleName { get; set; }

        public string Name { get; set; }
        public string Address { get; set; }

        public string PhoneNumber { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<System.DateTime> LastUpdatedDate { get; set; }
        public string LastUpdatedBy { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public int ExpertiseId { get; set; }

        public string Address2 { get; set; }
        public Nullable<int> PostCode { get; set; }
        public string CityName { get; set; }

        public virtual ICollection<BFN.Model.UserExpertise> UserExpertise { get; set; }
    }
}
