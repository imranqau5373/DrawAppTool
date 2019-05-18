using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BFN.Model.BusinessModel
{
    public interface IEntityBase
    {
        bool IsActive { get; set; }
    }
}
