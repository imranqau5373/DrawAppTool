using BFN.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BFN.Repository.Common;

namespace BFN.Repository.Common.Extensions
{
    public static class AspNetUserExtension
    {
        public static AspNetUser GetSingleByUsername(this IGenericRepository<AspNetUser> userRepository, string username)
        {
            return userRepository.GetAll().FirstOrDefault(x => x.UserName == username);
        }
    }
}
