using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BFN.Web.Models
{
    public class ContactUsModel
    {

        public string TelePhoneNumber { get; set; }

        public string MobileNumber { get; set; }
        [Required]
        [Display(Name = "Email")]
        [EmailAddress]
        public string Email { get; set; }

        public string Message { get; set; }
    }
}