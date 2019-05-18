using BFN.Model;
using BFN.Model.BusinessModel;
using BFN.Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BFN.Service.Service
{
    public interface ICustomerService : IEntityService<CustomerRecord>
    {

        IEnumerable<CommiteViewMember> GetPaged(GridModel model, out int totalRecords, int commiteId);

    }
}
