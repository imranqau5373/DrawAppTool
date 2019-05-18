using BFN.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace BFN.Service.AccountService
{
    public class MembershipContext
    {
        public IPrincipal Principal { get; set; }
        public AspNetUser User { get; set; }
        public bool IsValid()
        {
            return Principal != null;
        }
    }
}
