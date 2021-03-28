using System;
using System.Collections.Generic;

namespace Domain
{
    public class RentACarService
    {
        public Guid RentACarServiceId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public float AverageGrade { get; set; }
        public string Address { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string AppUserManagerId { get; set; }
        public AppUser Manager { get; set; }

        public ICollection<Vehicle> Vehicles { get; set; }
        public ICollection<BranchOffice> BranchOffices { get; set; }
    }
}