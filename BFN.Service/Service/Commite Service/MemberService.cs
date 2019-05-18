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
    public class MemberService : EntityService<CommiteMember>, IMemberService
    {

        IUnitOfWork _unitOfWork;
        IMemberRepository _memberRepository;
        public MemberService(IUnitOfWork unitOfWork, IMemberRepository memberRepository)
            : base(unitOfWork, memberRepository)
        {
            _unitOfWork = unitOfWork;
            _memberRepository = memberRepository;
        }
    }
}
