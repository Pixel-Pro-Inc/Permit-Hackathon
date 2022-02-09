using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class PagedList<T>: List<T>
    {
        //This will be used to help filter with pagination

        //The purpose of this constructor is to generate a pageList that will be returned in the CreaateAsync method. So that what it does return is the computed
        //result and not just plain values
        public PagedList(IEnumerable<T> items, int pagenumber, int count, int pagesize)
        {
            CurrentPage = pagenumber;
            TotalPages = (int) Math.Ceiling(count/(double)pagesize);
            Pagesize = pagesize;
            TotalCount = count;
            AddRange(items);
        }

        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int Pagesize { get; set; }
        public int TotalCount { get; set; }

        //this used to be async but I removed it in attempt to solve this error message: The provider for the source IQueryable doesn't implement IAsyncQueryProvider
        // I'm sure the fact that it's no longer asynchronous will break it but let's see if it works. We will leave the method to be called CreateAsync
        //I am now removing Task as well cause the reason it was async was to accomodate for tasks
        public static PagedList<T> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize)
        {
            var count = source.Count();
            var items = source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

            return new PagedList<T>(items, pageNumber, count, pageSize); 
        }
    }
}
