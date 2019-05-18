using BFN.Model;
using BFN.Repository.Common;
using BFN.Repository.Repositories;
using BFN.Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BFN.Service.Service
{
    public class CommiteService : EntityService<CommiteRecord>, ICommiteService
    {

        IUnitOfWork _unitOfWork;
        ICommiteRepository _commiteRepository;
        public CommiteService(IUnitOfWork unitOfWork, ICommiteRepository commiteRepository)
            : base(unitOfWork, commiteRepository)
        {
            _unitOfWork = unitOfWork;
            _commiteRepository = commiteRepository;
        }
    }
}
