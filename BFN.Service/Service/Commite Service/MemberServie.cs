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
    public class MemberServie : EntityService<CommiteMember>, IMemberServie
    {

        IUnitOfWork _unitOfWork;
        IMemberRepository _memberRepository;
        public MemberServie(IUnitOfWork unitOfWork, IMemberRepository memberRepository)
            : base(unitOfWork, memberRepository)
        {
            _unitOfWork = unitOfWork;
            _memberRepository = memberRepository;
        }
    }
}
