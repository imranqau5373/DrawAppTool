using BFN.Model;
using BFN.Model.BusinessModel;
using BFN.Service.Service;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BFN.Web.Controllers
{

    [RoutePrefix("api/CommiteRec")]

    public class CommiteController : ApiController
    {


        ICommiteService _CommiteService;
        IMemberService _MemberService;
        ICustomerService _CustomerService;
        IInstallmentService _InstallmentService;

        public CommiteController(ICommiteService CommiteService,IMemberService MemberService,ICustomerService CustomerService,IInstallmentService InstallmentService)
        {
            _CommiteService = CommiteService;
            _MemberService = MemberService;
            _CustomerService = CustomerService;
            _InstallmentService = InstallmentService;
        }

        [HttpPost]
        [Route("addCommite")]
        public IHttpActionResult AddCommite(CommiteRecord objCommiteRec)
        {

            try
            {
                _CommiteService.Create(objCommiteRec);
                AddInstallmentRecord(objCommiteRec);
                return Ok(objCommiteRec);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        [HttpPost]
        [Route("updateCommite")]
        public IHttpActionResult UpdateCommite(CommiteRecord objCommiteRec)
        {

            try
            {
                _CommiteService.Update(objCommiteRec);
                return Ok(objCommiteRec);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        [HttpGet]
        [Route("getAllCommites")]
        public IHttpActionResult GetAllCommites()
        {
            var Commites = _CommiteService.GetAll().ToList();
            return Ok(Commites);
        }

        [HttpGet]
        [Route("getCommite")]
        public IHttpActionResult GetCommite(int Id)
        {
            var Commite = _CommiteService.GetAll().Where(x => x.Id == Id).FirstOrDefault();
            return Ok(Commite);
        }


        [HttpGet]
        [Route("getSerialNumber")]
        public IHttpActionResult GetSerialNumber()
        {
            var Count = _CustomerService.GetAll().Count() + 1;
            return Ok(Count);
        }

        [HttpGet]
        [Route("getCommiteMembers")]
        public IHttpActionResult GetCommiteMembers(int commiteId,[FromUri]GridModel Model)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                int totalRecords = 0;
                if (!string.IsNullOrEmpty(Model.FilterList))
                {
                    var filters = JsonConvert.DeserializeObject<Dictionary<string, string>>(Model.FilterList);
                    Model.FilterKeyValue.AddRange(filters);
                }

                var memberList = _CustomerService.GetPaged(Model, out totalRecords, commiteId);//.ToList();


                var startPageRecordNumber = (Model.Page - 1) * Model.ItemsPerPage;
                var endPageRecordNumber = startPageRecordNumber + memberList.Count();
                return Ok(new
                {
                    Data = memberList,
                    TotalRecords = totalRecords,
                    StartPageRecordNumber = startPageRecordNumber,
                    EndPageRecordNumber = endPageRecordNumber
                });




            }
                //var members = (from commite in _MemberService.GetAll().ToList() join customer in _CustomerService.GetAll().ToList()
                //              on commite.FK_CustomerId equals customer.Id where commite.FK_CommiteId == commiteId
                //               select new
                //               {
                //                   Id = customer.Id,
                //                   CustomerName = customer.CustomerName,
                //                   FatherName = customer.CustomerFather,
                //                   CustomerAddress = customer.CustomerAddress,
                //                   CustomerIdCardNo = customer.CustomerIdCardNo,
                //                   CustomerPhoneNo = customer.CustomerPhoneNo,
                //                   CustomerSerialNo = customer.CustomerSerialNo
                //               }).ToList();
                //return Ok(members);
                return Ok();
        }


        [HttpPost]
        [Route("addCommiteMembers")]
        public IHttpActionResult AddCommiteMembers(CommiteMember objCommiteMemeber)
        {
            try
            {

                _MemberService.Create(objCommiteMemeber);
                return Ok(objCommiteMemeber);

            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        [Route("getCommiteInstallment")]
        public IHttpActionResult GetCommiteInstallment(int Id)
        {
            var Installments = _InstallmentService.GetAll().Where(x => x.FK_CommiteId == Id).ToList();
            return Ok(Installments);
        }



        private void AddInstallmentRecord(CommiteRecord ObjCommiteRecord)
        {
            try
            {
                for (int i = 0; i < ObjCommiteRecord.CommiteMonths; i++)
                {
                    InstallmentRec objInstallmentRec = new InstallmentRec();
                    objInstallmentRec.FK_CommiteId = ObjCommiteRecord.Id;
                    objInstallmentRec.InstallmentAmount = ObjCommiteRecord.CommiteAmount;
                    objInstallmentRec.InstallmentNumber = i + 1;
                    objInstallmentRec.InstallmentMonth = ObjCommiteRecord.CommiteStartDate.Value.AddMonths(i);
                    _InstallmentService.Create(objInstallmentRec);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }




        }


    }
}
