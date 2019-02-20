using System;
using System.Collections.Generic;
using System.Linq;

using Microsoft.EntityFrameworkCore;


namespace MyReactApp.Models
{
    public class BaseRepository<T> where T : class 
    {
        internal readonly LocalDatabaseContext myContext = new LocalDatabaseContext();

        public List<T> GetAll()
        {
            try
            {
                return myContext.Set<T>().ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
            
        }

        public void Add(T entity)
        {
            myContext.Set<T>().Add(entity);
            myContext.SaveChanges();
        }

        public void Delete(T entity)
        {
            myContext.Set<T>().Remove(entity);
            myContext.SaveChanges();
        }

        public void Update(T entity)
        {
            myContext.Set<T>().Update(entity);
            myContext.Entry<T>(entity).State = EntityState.Modified;
            myContext.SaveChanges();
        }
    }
}
