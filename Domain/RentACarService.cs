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
        public int NumberOfGrades { get; set; }
        public string Address { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public decimal TotalProfit { get; set; }
        public ICollection<AppUser> Managers { get; set; }

        public ICollection<Vehicle> Vehicles { get; set; }
        public ICollection<BranchOffice> BranchOffices { get; set; }
    }
}