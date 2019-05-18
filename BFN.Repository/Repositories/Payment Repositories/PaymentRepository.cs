using BFN.Model;
using BFN.Repository.Common;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BFN.Repository.Repositories
{
    public class PaymentRepository : GenericRepository<PaymentRecord>, IPaymentRepository
    {

        public PaymentRepository(DbContext context)
            : base(context)
        {

        }
    
    }
}
