using System.Collections.Generic;
using System.Linq;

namespace MyReactApp.Models
{
    public class PatientRepository : BaseRepository<Patient>
    {
        public Patient GetPatient(int id)
        {
            return myContext.Set<Patient>().First(x => x.PatientId == id);
        }

        public void DeletePatient(int id)
        {
            Patient patient = myContext.Patient.First(x => x.PatientId == id);
            myContext.Patient.Remove(patient);
            myContext.SaveChanges();
        }

        //To Get the list of City    
        public List<City> GetCities()
        {
            var lstCity = (from cityList in myContext.City select cityList).ToList();
            return lstCity;
        }
    }
}
