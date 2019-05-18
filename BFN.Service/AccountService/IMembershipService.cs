using BFN.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BFN.Service.AccountService
{
    public interface IMembershipService
    {
        MembershipContext ValidateUser(string username, string password);
        //AspNetUser CreateUser(string username, string email, string password, int[] roles);
        //AspNetUser GetUser(int userId);
        //List<AspNetUserRole> GetUserRoles(string username);


    }
}
