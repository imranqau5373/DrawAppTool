using BFN.Model;
using BFN.Service.Common;
using BFN.Service.Service;
using BFN.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BFN.Web.Controllers
{

    [RoutePrefix("api/CustomerRec")]
    public class CustomerController : ApiController
    {

        ICustomerService _CustomerService;
        IMemberService _MemberService;

        public CustomerController(ICustomerService CustomerService,IMemberService MemberService)
        {
            _CustomerService = CustomerService;
            _MemberService = MemberService;
        }

        [HttpPost]
        [Route("addCustomer")]
        public IHttpActionResult AddCustomer(CustomerView objCustomerRec)
        {

            try
            {
                CustomerRecord objCustomerData = new CustomerRecord();
                objCustomerRec.CopyProperties(objCustomerData);
                _CustomerService.Create(objCustomerData);
                if (objCustomerRec.FK_CommiteId > 0)
                {
                    CommiteMember member = new CommiteMember();
                    member.FK_CommiteId = objCustomerRec.FK_CommiteId;
                    member.FK_CustomerId = objCustomerData.Id;
                    member.IsActive = true;
                    member.CreatedDate = member.UpdatedDate = System.DateTime.Now;
                    member.UpdatedBy = member.CreatedBy = objCustomerData.CreatedBy;
                    _MemberService.Create(member);

                }

                return Ok(objCustomerRec);

            }
            catch(Exception ex)
            {
                throw ex;
            }
        }


        [HttpPost]
        [Route("updateCustomer")]
        public IHttpActionResult UpdateCustomer(CustomerRecord objCustomerRec)
        {

            try
            {
                _CustomerService.Update(objCustomerRec);
                return Ok(objCustomerRec);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        [Route("getCustomer")]
        public IHttpActionResult GetCustomer(int Id)
        {
            try
            {
                var customer = _CustomerService.GetAll().Where(x => x.Id == Id).FirstOrDefault();
                return Ok(customer);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }


        [HttpGet]
        [Route("getAllCustomers")]
        public IHttpActionResult GetAllCustomers()
        {
            var Customers = _CustomerService.GetAll().ToList();
            return Ok(Customers);
        }
    }
}
