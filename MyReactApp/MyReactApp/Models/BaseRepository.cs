using System.Collections.Generic;
using System.Linq;


namespace MyReactApp.Models
{
    public class BaseRepository<T> where T : class 
    {
        internal readonly LocalDatabaseContext myContext = new LocalDatabaseContext();

        public IEnumerable<T> GetAll()
        {
            return myContext.Set<T>();
        }

    }
}
