using BFN.Model.BusinessModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BFN.Repository.Common
{
    public interface IGenericRepository<T> where T : class
    {
        IQueryable<T> GetQueryable(Expression<Func<T, bool>> predicate);
        IQueryable<T> GetQueryable();

        IQueryable<T> GetAll();

        IQueryable<T> GetAllQueriable();

        IEnumerable<T> GetAllEnumberiable();
        IEnumerable<T> FindBy(Expression<Func<T, bool>> predicate);
        T Add(T entity);
        T Delete(T entity);
        void Edit(T entity);
        void Save();


    }
}
