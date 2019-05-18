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
    public class InstallmentRepository : GenericRepository<InstallmentRec>, IInstallmentRepository
    {

        public InstallmentRepository(DbContext context)
            : base(context)
        {

        }
    
    }
}
