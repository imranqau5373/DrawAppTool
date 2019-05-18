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
    public class InstallmentService : EntityService<InstallmentRec>, IInstallmentService
    {

        IUnitOfWork _unitOfWork;
        IInstallmentRepository _installmentRepository;
        public InstallmentService(IUnitOfWork unitOfWork, IInstallmentRepository installmentRepository)
            : base(unitOfWork, installmentRepository)
        {
            _unitOfWork = unitOfWork;
            _installmentRepository = installmentRepository;
        }
    }
}
