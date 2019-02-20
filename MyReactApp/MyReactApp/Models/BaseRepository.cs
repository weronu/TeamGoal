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

        public int Add(T entity)
        {
            try
            {
                myContext.Set<T>().Add(entity);
                myContext.SaveChanges();
                return 1;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void Delete(T entity)
        {
            myContext.Set<T>().Remove(entity);
            myContext.SaveChanges();
        }

        public int Update(T entity)
        {
            try
            {
                myContext.Set<T>().Update(entity);
                myContext.Entry<T>(entity).State = EntityState.Modified;
                myContext.SaveChanges();
                return 1;
            }
            catch (Exception e)
            {
                throw e;
            }
           
        }
    }
}
