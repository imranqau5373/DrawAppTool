using BFN.Model;
using BFN.Repository.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace BFN.Service.AccountService
{
    public class MembershipService2 : IMembershipService
    {
        #region Variables
        private readonly IGenericRepository<AspNetUser> _userRepository;
        private readonly IGenericRepository<AspNetRole> _roleRepository;
       // private readonly IGenericRepository<AspNetUserRole> _userRoleRepository;
        private readonly IEncryptionService _encryptionService;
        private readonly IUnitOfWork _unitOfWork;
        #endregion

//        public MembershipService(IGenericRepository<AspNetUser> userRepository, IGenericRepository<AspNetRole> roleRepository,
//IGenericRepository<AspNetUserRole> userRoleRepository, IEncryptionService encryptionService, IUnitOfWork unitOfWork)
//        {
//            _userRepository = userRepository;
//            _roleRepository = roleRepository;
//            _userRoleRepository = userRoleRepository;
//            _encryptionService = encryptionService;
//            _unitOfWork = unitOfWork;
//        }

        #region IMembershipService Implementation

        public MembershipContext ValidateUser(string username, string password)
        {
            var membershipCtx = new MembershipContext();

            var user = _userRepository.GetSingleByUsername(username);
            if (user != null && isUserValid(user, password))
            {
                //var userRoles = GetUserRoles(user.Username);
                //membershipCtx.User = user;

                //var identity = new GenericIdentity(user.Username);
                //membershipCtx.Principal = new GenericPrincipal(
                //    identity,
                //    userRoles.Select(x => x.Name).ToArray());
            }

            return membershipCtx;
        }
        //public User CreateUser(string username, string email, string password, int[] roles)
        //{
        //    var existingUser = _userRepository.GetSingleByUsername(username);

        //    if (existingUser != null)
        //    {
        //        throw new Exception("Username is already in use");
        //    }

        //    var passwordSalt = _encryptionService.CreateSalt();

        //    var user = new User()
        //    {
        //        Username = username,
        //        Salt = passwordSalt,
        //        Email = email,
        //        IsLocked = false,
        //        HashedPassword = _encryptionService.EncryptPassword(password, passwordSalt),
        //        DateCreated = DateTime.Now
        //    };

        //    _userRepository.Add(user);

        //    _unitOfWork.Commit();

        //    if (roles != null || roles.Length > 0)
        //    {
        //        foreach (var role in roles)
        //        {
        //            addUserToRole(user, role);
        //        }
        //    }

        //    _unitOfWork.Commit();

        //    return user;
        //}

        //public User GetUser(int userId)
        //{
        //    return _userRepository.GetSingle(userId);
        //}

        //public List<Role> GetUserRoles(string username)
        //{
        //    List<Role> _result = new List<Role>();

        //    var existingUser = _userRepository.GetSingleByUsername(username);

        //    if (existingUser != null)
        //    {
        //        foreach (var userRole in existingUser.UserRoles)
        //        {
        //            _result.Add(userRole.Role);
        //        }
        //    }

        //    return _result.Distinct().ToList();
        //}
        #endregion

        #region Helper methods
        //private void addUserToRole(AspNetUser user, int roleId)
        //{
        //    var role = _roleRepository.GetSingle(roleId);
        //    if (role == null)
        //        throw new ApplicationException("Role doesn't exist.");

        //    var userRole = new AspNetUserRole()
        //    {
        //        RoleId = role.ID,
        //        UserId = user.Id
        //    };
        //    _userRoleRepository.Add(userRole);
        //}

        private bool isPasswordValid(AspNetUser user, string password)
        {
            return string.Equals(_encryptionService.EncryptPassword(password, user.SecurityStamp), user.PasswordHash);
        }

        private bool isUserValid(AspNetUser user, string password)
        {
            if (isPasswordValid(user, password))
            {
                return true;
            }

            return false;
        }
        #endregion
    }
}
