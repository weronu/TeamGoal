using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using MyReactApp.Models;

namespace MyReactApp.Controllers
{
    public class PatientController : Controller
    {
        private readonly PatientRepository myRepository = new PatientRepository();

        [HttpGet]
        [Route("api/Patient/Index")]
        public List<Patient> Index()
        {
            List<Patient> patients = myRepository.GetAll();
            return patients;
        }

        [HttpGet]
        [Route("api/Patient/Details/{id}")]
        public Patient Details(int id)
        {
            return myRepository.GetPatient(id);
        }

        [HttpPost]
        [Route("api/Patient/Create")]
        public void Create(Patient patient)
        {
            myRepository.Add(patient);
        }

        [HttpPut]
        [Route("api/Employee/Edit")]
        public void Edit(Patient patient)
        {
            myRepository.Update(patient);
        }

        [HttpDelete]
        [Route("api/Patient/Delete/{id}")]
        public void Delete(int id)
        {
            myRepository.DeletePatient(id);
        }

        [HttpGet]
        [Route("api/Patient/GetCityList")]
        public IEnumerable<City> Details()
        {
            return myRepository.GetCities();
        }
    }
}
