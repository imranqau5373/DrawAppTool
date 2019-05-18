using BFN.Model;
using BFN.Model.BusinessModel;
using BFN.Model.BusinessModel.Reports;
using BFN.Service.Common;
using BFN.Service.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BFN.Web.Controllers
{

    [RoutePrefix("api/PaymentRec")]

    public class PaymentController : ApiController
    {


        IPaymentService _PaymentService;
        ICustomerService _CustomerService;
        IMemberService _MemberService;
        ICommiteService _CommiteService;
        IInstallmentService _InstallmentService;

        public PaymentController(IPaymentService PaymentService,ICustomerService CustomerService,IMemberService MemberService,ICommiteService CommiteService,IInstallmentService InstallmentService)
        {
            _PaymentService = PaymentService;
            _CustomerService = CustomerService;
            _MemberService = MemberService;
            _CommiteService = CommiteService;
            _InstallmentService = InstallmentService;
        }

        [HttpGet]
        [Route("getCustomersForPayment")]
        public IHttpActionResult GetCustomersForPayment(string CustomerName, int FK_CommiteId, int PageNumber, int ItemsPerPage, bool isName)
        {
            var members = (from commite in _MemberService.GetAll().ToList()
                           join customer in _CustomerService.GetAll().ToList()
                            on commite.FK_CustomerId equals customer.Id
                           where commite.FK_CommiteId == FK_CommiteId
                           select new
                           {
                               Id = customer.Id,
                               CustomerName = customer.CustomerName,
                               FatherName = customer.CustomerFather,
                               CustomerAddress = customer.CustomerAddress,
                               CustomerIdCardNo = customer.CustomerIdCardNo,
                               CustomerPhoneNo = customer.CustomerPhoneNo,
                               CustomerSerialNo = customer.CustomerSerialNo
                           }).ToList();

            var startPageRecordNumber = (PageNumber - 1) * ItemsPerPage;
            var endPageRecordNumber = startPageRecordNumber + members.Count();
            return Ok(new
            {
                Data = members,
                TotalRecords = 0,
                StartPageRecordNumber = startPageRecordNumber,
                EndPageRecordNumber = endPageRecordNumber
            });
        }

        [HttpGet]
        [Route("getMembersForAssign")]
        public IHttpActionResult GetMembersForAssign(string CustomerName, int FK_CommiteId, int PageNumber, int ItemsPerPage, bool isName)
        {
            var registeredMembers = _MemberService.GetAll().Where(x => x.FK_CommiteId == FK_CommiteId).Select(x => x.FK_CustomerId).ToList();
            var customerList = _CustomerService.GetAll().Where(x => !registeredMembers.Contains(x.Id)).ToList();

            var startPageRecordNumber = (PageNumber - 1) * ItemsPerPage;
            var endPageRecordNumber = startPageRecordNumber + customerList.Count();
            return Ok(new
            {
                Data = customerList,
                TotalRecords = 0,
                StartPageRecordNumber = startPageRecordNumber,
                EndPageRecordNumber = endPageRecordNumber
            });
        }




        [HttpPost]
        [Route("addPayment")]
        public IHttpActionResult AddPayment(PaymentView objPaymentRec)
        {
            try
            {
                objPaymentRec.FK_MemberId = getMemberId(objPaymentRec.CommiteId, objPaymentRec.FK_MemberId);
                PaymentRecord objPayment = new PaymentRecord();
                objPaymentRec.CopyProperties(objPayment);
                _PaymentService.Create(objPayment);
                return Ok(objPaymentRec);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        private int getMemberId(int CommiteId,int CustomerId)
        {
            return _MemberService.GetAll().Where(x => x.FK_CommiteId == CommiteId && x.FK_CustomerId == CustomerId).FirstOrDefault().Id;
        }


        [HttpGet]
        [Route("getAllPayments")]
        public IHttpActionResult GetAllPayments()
        {
            try
            {
                var Payments = (from payment in _PaymentService.GetAll().ToList()
                                join member in _MemberService.GetAll().ToList()
                                 on payment.FK_MemberId equals member.Id
                                 join installment in _InstallmentService.GetAll().ToList()
                                 on payment.FK_InstallmentId equals installment.Id
                                join customer in _CustomerService.GetAll().ToList()
                                on member.FK_CustomerId equals customer.Id
                                join commite in _CommiteService.GetAll().ToList()
                                on member.FK_CommiteId equals commite.Id
                                select new
                                {
                                    Id = payment.Id,
                                    CustomerName = customer.CustomerName,
                                    CustomerSerialNo = customer.CustomerSerialNo,
                                    CommiteName = commite.CommiteName,
                                    RecivedAmount = payment.PaidAmount,
                                    CommiteMonth = installment.InstallmentNumber
                                }).ToList();
                
                return Ok(Payments);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        [HttpGet]
        [Route("getCustomerPayments")]
        public IHttpActionResult GetCustomerPayments(int CustomerId)
        {
            try
            {
                var Payments = (from payment in _PaymentService.GetAll().ToList()
                                join member in _MemberService.GetAll().ToList()
                                 on payment.FK_MemberId equals member.Id
                                join installment in _InstallmentService.GetAll().ToList()
                                on payment.FK_InstallmentId equals installment.Id
                                join customer in _CustomerService.GetAll().ToList()
                                on member.FK_CustomerId equals customer.Id
                                join commite in _CommiteService.GetAll().ToList()
                                on member.FK_CommiteId equals commite.Id
                                where customer.Id == CustomerId
                                select new
                                {
                                    Id = payment.Id,
                                    CustomerName = customer.CustomerName,
                                    CustomerSerialNo = customer.CustomerSerialNo,
                                    CommiteName = commite.CommiteName,
                                    RecivedAmount = payment.PaidAmount,
                                    CommiteMonth = installment.InstallmentNumber
                                }).ToList();

                return Ok(Payments);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }




        [HttpPost]
        [Route("getPaymentReport")]
        public IHttpActionResult GetPaymentReport(CommiteReportModel obj)
        {
            try
            {

                if(obj.PaymentType == 2)
                {

                    var Payments = (from payment in _PaymentService.GetAll().ToList()
                                    join member in _MemberService.GetAll().ToList()
                                     on payment.FK_MemberId equals member.Id
                                    join customer in _CustomerService.GetAll().ToList()
                                    on member.FK_CustomerId equals customer.Id
                                    join commite in _CommiteService.GetAll().ToList()
                                    on member.FK_CommiteId equals commite.Id
                                    where obj.CommiteId == member.FK_CommiteId &&
                                    (obj.FK_InstallmentID > 0 ? obj.FK_InstallmentID == payment.FK_InstallmentId : true)
                                    select new
                                    {
                                        Id = payment.Id,
                                        MemberId = member.Id,
                                        CustomerName = customer.CustomerName,
                                        CustomerSerialNo = customer.CustomerSerialNo,
                                        CommiteName = commite.CommiteName,
                                        RecivedAmount = payment.PaidAmount,
                                        CommiteMonth = getMonth(obj.FK_InstallmentID)
                                    }).ToList();

                    var PaidIds = Payments.Select(x => x.MemberId).ToList();


                    var memberList = _MemberService.GetAll().Where(x => x.FK_CommiteId == obj.CommiteId && !PaidIds.Contains(x.Id)).ToList();

                    var returnList = (from member in memberList
                                      join customer in _CustomerService.GetAll().ToList()
                                      on member.FK_CustomerId equals customer.Id
                                      select new
                                      {
                                          Id = member.Id,
                                          CustomerName = customer.CustomerName,
                                          CustomerSerialNo = customer.CustomerSerialNo,
                                          CommiteName = "",
                                          RecivedAmount = 0,
                                          CommiteMonth = getMonth(obj.FK_InstallmentID)
                                      }).ToList();

                    return Ok(new { Data = returnList, TotalUnPaid = returnList.Count, Paid = PaidIds.Count });
                }
                else
                {
                    var Payments = (from payment in _PaymentService.GetAll().ToList()
                                    join member in _MemberService.GetAll().ToList()
                                     on payment.FK_MemberId equals member.Id
                                    join customer in _CustomerService.GetAll().ToList()
                                    on member.FK_CustomerId equals customer.Id
                                    join commite in _CommiteService.GetAll().ToList()
                                    on member.FK_CommiteId equals commite.Id
                                    where obj.CommiteId == member.FK_CommiteId &&
                                    (obj.FK_InstallmentID > 0 ? obj.FK_InstallmentID == payment.FK_InstallmentId : true)
                                    select new
                                    {
                                        Id = payment.Id,
                                        CustomerName = customer.CustomerName,
                                        CustomerSerialNo = customer.CustomerSerialNo,
                                        CommiteName = commite.CommiteName,
                                        RecivedAmount = payment.PaidAmount,
                                        CommiteMonth = getMonth(obj.FK_InstallmentID)
                                    }).ToList();
                    var TotalUnPaid = _MemberService.GetAll().Where(x => x.FK_CommiteId == obj.CommiteId).Count();
                    TotalUnPaid = TotalUnPaid - Payments.Count;
                    return Ok(new { Data = Payments, TotalUnPaid = TotalUnPaid, Paid = Payments.Count });
                }

            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        #region Private Function 

        private int? getMonth(int id)
        {
            return _InstallmentService.GetAll().Where(x => x.Id == id).Select(x => x.InstallmentNumber).FirstOrDefault();
        }

        #endregion
    }
}
