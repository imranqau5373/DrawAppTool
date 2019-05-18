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
    public class MemberRepository : GenericRepository<CommiteMember>, IMemberRepository
    {

        public MemberRepository(DbContext context)
            : base(context)
        {

        }
    }
}
