using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BFN.Model.Extensions
{
    public static class PagingExtensions
    {
        public static IEnumerable<T> Page<T>(this IEnumerable<T> en, int page, int itemsPerPage)
        {
            return en.Skip((page - 1) * itemsPerPage).Take(itemsPerPage);
        }

        public static IQueryable<T> Page<T>(this IQueryable<T> en, int page, int itemsPerPage)
        {
            return en.Skip((page - 1) * itemsPerPage).Take(itemsPerPage);
        }

        public static IQueryable<T> OrderByField<T>(this IQueryable<T> source, string sortField, bool ascending)
        {
            var root = Expression.Parameter(typeof(T), "x");
            var member = sortField.Split('.').Aggregate((Expression)root, Expression.PropertyOrField);
            var selector = Expression.Lambda(member, root);
            var method = !ascending ? "OrderBy" : "OrderByDescending";
            var types = new[] { typeof(T), member.Type };
            var mce = Expression.Call(typeof(Queryable), method, types,
                source.Expression, Expression.Quote(selector));
            return source.Provider.CreateQuery<T>(mce);
        }
    }
}
