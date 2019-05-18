using BFN.Model;
using BFN.Repository.Common;
using BFN.Repository.Repositories;
using BFN.Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BFN.Service.Service.Payment_Service
{
    public class PaymentService : EntityService<PaymentRecord>, IPaymentService
    {

        IUnitOfWork _unitOfWork;
        IPaymentRepository _paymentRepository;
        public PaymentService(IUnitOfWork unitOfWork, IPaymentRepository paymentRepository)
            : base(unitOfWork, paymentRepository)
        {
            _unitOfWork = unitOfWork;
            _paymentRepository = paymentRepository;
        }
    }
}
