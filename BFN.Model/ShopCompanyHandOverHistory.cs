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
    
    public partial class ShopCompanyHandOverHistory
    {
        public int Id { get; set; }
        public int HandOverId { get; set; }
        public System.DateTime HandOverDate { get; set; }
        public int CurrentShopId { get; set; }
        public int CurrentCompanyId { get; set; }
        public int NextChainId { get; set; }
        public int NextCompanyId { get; set; }
        public string Status { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime LastUpdatedDate { get; set; }
        public string LastUpdatedBy { get; set; }
    }
}
