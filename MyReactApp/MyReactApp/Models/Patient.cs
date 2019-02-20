using System;
using System.Collections.Generic;

namespace MyReactApp.Models
{
    public partial class Patient
    {
        public int PatientId { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Department { get; set; }
        public string Gender { get; set; }
        public string LastName { get; set; }
    }
}
