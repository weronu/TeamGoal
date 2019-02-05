using System.Linq;

namespace MyReactApp.Models
{
    public class PatientRepository : BaseRepository<Patient>
    {
        public Patient GetOne(int id)
        {
            return myContext.Set<Patient>().First(x => x.PatientId == id);
        }
    }
}
