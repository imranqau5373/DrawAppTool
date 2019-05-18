using BFN.Model.BusinessModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BFN.Service.Common
{
    public interface IEntityService<T> : IService
     where T : class
    {
        void Create(T entity);
        void Delete(T entity);
        // IEnumerable<T> GetAll();

        IQueryable<T> GetAll();

        IEnumerable<T> GetAllEnumberiable();

        IQueryable<T> GetAllQueriable();
        void Update(T entity);
    }
}
