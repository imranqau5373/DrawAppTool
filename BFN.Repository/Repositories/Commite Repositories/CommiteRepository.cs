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
    public class CommiteRepository : GenericRepository<CommiteRecord>, ICommiteRepository
    {

        public CommiteRepository(DbContext context)
            : base(context)
        {

        }
    }
}
