using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Text;
using System.Threading.Tasks;
using BFN.Model.BusinessModel;
using System.Linq.Expressions;

namespace BFN.Repository.Common
{
    public abstract class GenericRepository<T> : IGenericRepository<T>
       where T : class
    {
        protected DbContext _entities;
        protected readonly IDbSet<T> _dbset;

        public GenericRepository(DbContext context)
        {
            _entities = context;
            _dbset = context.Set<T>();
        }

        public virtual IQueryable<T> GetAll()
        {

            return _dbset.AsQueryable<T>();
        }

        public virtual IQueryable<T> GetAllQueriable()
        {

            return _dbset.AsQueryable<T>();
        }

        public virtual IEnumerable<T> GetAllEnumberiable()
        {

            return _dbset.AsEnumerable<T>();
        }

        public IEnumerable<T> FindBy(Expression<Func<T, bool>> predicate)
        {
            IEnumerable<T> query = _dbset.Where(predicate).AsEnumerable();
            return query;
        }

        public virtual T Add(T entity)
        {
            return _dbset.Add(entity);
        }

        public virtual T Delete(T entity)
        {
            _entities.Entry(entity).State = System.Data.Entity.EntityState.Deleted;
            return _dbset.Remove(entity);
        }

        public virtual void Edit(T entity)
        {
            _entities.Entry(entity).State = System.Data.Entity.EntityState.Modified;
        }

        public virtual void Save()
        {
            _entities.SaveChanges();
        }

        public IQueryable<T> GetQueryable(Expression<Func<T, bool>> predicate)
        {
            return _dbset.Where(predicate).AsQueryable();
        }

        public IQueryable<T> GetQueryable()
        {
            return _dbset.AsQueryable();
        }

        public IQueryable<T> GetChainList()
        {
            return _dbset.AsQueryable();
        }
    }
}
