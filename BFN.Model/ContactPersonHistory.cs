//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BFN.Model
{
    using System;
    using System.Collections.Generic;
    
    public partial class ContactPersonHistory
    {
        public int Id { get; set; }
        public int ContactPersonId { get; set; }
        public string ContactPersonName { get; set; }
        public string ContactPersonAddress { get; set; }
        public string ContactPersonEmail { get; set; }
        public string ContactPersonNumber { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<System.DateTime> LastUpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public string LastUpdatedBy { get; set; }
        public Nullable<int> ExpertiseId { get; set; }
        public string ContactPersonAddress2 { get; set; }
        public Nullable<int> ContactPersonPostCode { get; set; }
        public string ContactPersonCityName { get; set; }
    }
}
