using BFN.Model;
using BFN.Repository.Common;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BFN.Repository.Repositories.Customer_Repositories
{
    public class CustomerRepository : GenericRepository<CustomerRecord>, ICustomerRepository
    {

        public CustomerRepository(DbContext context)
            : base(context)
        {

        }
    }
}
