﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BFN.Web.Models
{
    public class CustomerView
    {

        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string CustomerSerialNo { get; set; }
        public string CustomerIdCardNo { get; set; }
        public string CustomerFather { get; set; }
        public string EvidenceName { get; set; }
        public string EvidenceFatherName { get; set; }
        public string EvidenceIdCardNo { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedDate { get; set; }
        public string LastUpdatedBy { get; set; }
        public string LastUpdatedDate { get; set; }
        public string CustomerDetails { get; set; }
        public string EvidenceDetails { get; set; }
        public string CustomerAddress { get; set; }
        public string EvidenceAddress { get; set; }
        public string CustomerPhoneNo { get; set; }
        public string EvidencePhoneNo { get; set; }
        public Nullable<bool> IsActive { get; set; }

        public int FK_CommiteId { get; set; }
    }
}