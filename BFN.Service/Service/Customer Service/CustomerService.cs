using BFN.Model;
using BFN.Model.BusinessModel;
using BFN.Model.Extensions;
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
    public class CustomerService : EntityService<CustomerRecord>, ICustomerService
    {

        IUnitOfWork _unitOfWork;
        ICustomerRepository _customerRepository;
        IMemberRepository _memberRepository;
        public CustomerService(IUnitOfWork unitOfWork, ICustomerRepository customerRepository,IMemberRepository memberRepository)
            : base(unitOfWork, customerRepository)
        {
            _unitOfWork = unitOfWork;
            _customerRepository = customerRepository;
            _memberRepository = memberRepository;
        }


        public IEnumerable<CommiteViewMember> GetPaged(GridModel model, out int totalRecords, int commiteId)
        {

            var members = (from commite in _memberRepository.GetAll()
                           join customer in _customerRepository.GetAll()
                            on commite.FK_CustomerId equals customer.Id
                           where commite.FK_CommiteId == commiteId
                             select new
                             {
                                 Id = customer.Id,
                                 CustomerName = customer.CustomerName,
                                 FatherName = customer.CustomerFather,
                                 CustomerAddress = customer.CustomerAddress,
                                 CustomerIdCardNo = customer.CustomerIdCardNo,
                                 CustomerPhoneNo = customer.CustomerPhoneNo,
                                 CustomerSerialNo = customer.CustomerSerialNo
                             });
            if (model.FilterKeyValue.Any())
            {
                foreach (var item in model.FilterKeyValue)
                {
                    if (item.Key == "CustomerName")
                    {
                        members = members.Where(x => x.CustomerName.ToString().Contains(item.Value));
                    }
                    else if (item.Key == "CustomerSerialNo")
                    {
                        members = members.Where(x => x.CustomerSerialNo.ToString().Contains(item.Value));
                    }
                }
                members = members.OrderByField(model.SortBy, model.Reverse);
            }
            else
            {
                members = members.OrderByField(model.SortBy, model.Reverse);
            }

            totalRecords = members.Count();

            return members.Page(model.Page, model.ItemsPerPage).Select(x => new CommiteViewMember
            {
                Id = x.Id,
                CustomerName = x.CustomerName,
                CustomerFather = x.FatherName,
                CustomerAddress = x.CustomerAddress,
                CustomerIdCardNo = x.CustomerIdCardNo,
                CustomerPhoneNo = x.CustomerPhoneNo,
                CustomerSerialNo = x.CustomerSerialNo
            }
            ).ToList();
        }


    }
}
